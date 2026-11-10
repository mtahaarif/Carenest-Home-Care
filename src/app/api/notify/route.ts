import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Notification hook called (fire-and-forget) by the contact form after a submission is stored
 * in Supabase. When RESEND_API_KEY is configured, the submission is emailed to NOTIFY_EMAIL_TO;
 * otherwise it is logged on the server.
 */

const payloadSchema = z.object({
  type: z.string().max(100),
  firstName: z.string().max(200),
  lastName: z.string().max(200),
  email: z.string().max(320),
  phone: z.string().max(50).optional().default(""),
  userType: z.string().max(300).optional().default(""),
  message: z.string().max(10000).optional().default(""),
});

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[notify] New submission (email delivery not configured):", data.type, data.email);
    return NextResponse.json({ success: true, delivered: false });
  }

  const rows: [string, string][] = [
    ["Type", data.type],
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Phone", data.phone || "-"],
    ["Describes them", data.userType || "-"],
    ["Message", data.message || "-"],
  ];

  const html = `<h2>New website submission: ${escapeHtml(data.type)}</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v).replace(/\n/g, "<br/>")}</td></tr>`)
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.NOTIFY_EMAIL_FROM || "Carenest Website <onboarding@resend.dev>",
      to: (process.env.NOTIFY_EMAIL_TO || "info@carenesthc.com").split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `${data.type}: ${data.firstName} ${data.lastName}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[notify] Email delivery failed:", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "Failed to send notification" }, { status: 502 });
  }

  return NextResponse.json({ success: true, delivered: true });
}
