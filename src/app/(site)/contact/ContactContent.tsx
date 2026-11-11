"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Briefcase, Check, HandHeart, HeartHandshake, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "@/components/icons";
import { GlowCard } from "@/components/fx/GlowCard";
import { EASE_OUT, Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { CONTACT_FAQS, USER_TYPES } from "@/content/site";
import { StepsTimeline } from "@/components/home/StepsTimeline";
import { FaqSection } from "@/components/sections/FaqSection";
import { useToast } from "@/hooks/use-toast";
import { IMAGES, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const TYPE_ICONS = [HandHeart, Briefcase, HeartHandshake, MessageCircle];
const emptyForm = { firstName: "", lastName: "", phone: "", email: "", userType: "", message: "" };

const CONTACT_CARDS = [
  { icon: Phone, label: "Call us", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "Email us", value: SITE.email, href: SITE.emailHref },
  { icon: MapPin, label: "Our office", value: SITE.address, href: `https://maps.google.com/?q=${encodeURIComponent(SITE.address)}` },
];

export function ContactContent() {
  const { toast } = useToast();
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const userTypeLabel = USER_TYPES.find((t) => t.value === formData.userType)?.label;

    try {
      // Loaded on demand so the Supabase client never weighs down the initial page bundle.
      const { getSupabase } = await import("@/lib/supabase");
      const supabase = getSupabase();
      if (formData.userType === "caregiver-no-client") {
        const { error } = await supabase.from("career_applications").insert({
          full_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: "1990-01-01",
          address: formData.message || "Contact form submission",
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("patient_inquiries").insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          care_needs: `${userTypeLabel || "General inquiry"}: ${formData.message}`,
        });
        if (error) throw error;
      }

      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formData.userType === "caregiver-no-client" ? "Career application" : "Client inquiry",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          userType: userTypeLabel || formData.userType,
          message: formData.message,
        }),
      }).catch(() => {});

      toast({ title: "Message Received!", description: "Thank you for reaching out. We will be in touch soon." });
      setFormData(emptyForm);
      setSent(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ title: "Submission Failed", description: "There was an error submitting your message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={[
          "Let's talk about",
          <>
            <span className="accent-serif text-gradient pr-2">your care</span>
          </>,
        ]}
        description="Ready to learn more about our home care services? We're here to help."
        image={IMAGES.teaConversation}
        actions={
          <>
            <Button asChild variant="hero" size="xl">
              <a href={SITE.phoneHref}>
                <Phone /> Call or Text Today
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="#contact-form">
                Send a message <ArrowUpRight />
              </a>
            </Button>
          </>
        }
      />

      <section id="contact-form" className="scroll-mt-28 pb-24 pt-8 md:pb-32">
        <div className="container grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Sticky info column */}
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Get in <span className="accent-serif text-primary">touch</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                At Carenest, we understand that navigating your care options can sometimes feel overwhelming. That is why we are here to help. If you have any questions
                about our services or need guidance in making the best decisions for your unique situation, please <strong className="font-semibold text-foreground">fill out the form</strong> and one of our caring team members
                will be in touch.
              </p>
            </Reveal>
            <RevealGroup className="mt-10 space-y-4" stagger={0.08}>
              {CONTACT_CARDS.map((c) => (
                <RevealItem key={c.label}>
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                    <GlowCard className="group flex items-center gap-5 rounded-[1.5rem] border border-foreground/5 bg-card p-5 shadow-card transition-transform duration-500 hover:-translate-y-0.5">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
                        <c.icon className="h-6 w-6" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{c.label}</span>
                        <span className="mt-1 block font-semibold text-foreground">{c.value}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-primary opacity-0 transition-all duration-500 group-hover:opacity-100" />
                    </GlowCard>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-card p-6 shadow-elevated sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <AnimatePresence mode="wait">
                {sent ? (
                  <m.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="flex min-h-[32rem] flex-col items-center justify-center text-center"
                  >
                    <m.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                      className="grid h-20 w-20 place-items-center rounded-full bg-brand-gradient text-white shadow-glow"
                    >
                      <Check className="h-10 w-10" />
                    </m.span>
                    <h3 className="mt-8 text-3xl font-bold text-foreground">Message received!</h3>
                    <p className="mt-3 max-w-sm text-muted-foreground">Thank you for reaching out. We will be in touch soon.</p>
                    <Button variant="outline" className="mt-8" onClick={() => setSent(false)}>
                      Send another message
                    </Button>
                  </m.div>
                ) : (
                  <m.form key="form" method="post" exit={{ opacity: 0, y: -10 }} onSubmit={handleSubmit} className="relative flex flex-col gap-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" autoComplete="given-name" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" autoComplete="family-name" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="Phone Number" autoComplete="tel" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email" autoComplete="email" />
                      </div>
                    </div>

                    <fieldset className="flex flex-col gap-3">
                      <legend className="mb-3 text-sm font-medium">What describes you best? *</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {USER_TYPES.map((t, i) => {
                          const Icon = TYPE_ICONS[i];
                          const checked = formData.userType === t.value;
                          return (
                            <label
                              key={t.value}
                              className={cn(
                                "relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm transition-all duration-300 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/15",
                                checked ? "border-primary bg-primary/5 shadow-soft" : "border-input bg-white/60 hover:border-primary/40",
                              )}
                            >
                              <input
                                type="radio"
                                name="userType"
                                value={t.value}
                                checked={checked}
                                onChange={() => setFormData((p) => ({ ...p, userType: t.value }))}
                                required
                                className="sr-only"
                              />
                              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors", checked ? "bg-primary text-primary-foreground" : "bg-secondary text-primary")}>
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="pr-5 font-medium leading-snug text-foreground">{t.label}</span>
                              <AnimatePresence>
                                {checked && (
                                  <m.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground"
                                  >
                                    <Check className="h-3 w-3" />
                                  </m.span>
                                )}
                              </AnimatePresence>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your situation..." rows={5} />
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      By pressing Submit, you agree to Carenest&apos;s Terms of Use and Privacy Policy. You consent to receive phone calls and SMS messages from Carenest to
                      provide updates and information regarding your services.
                    </p>

                    <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          Submit <Send className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      <StepsTimeline />

      <FaqSection
        eyebrow="Before you reach out"
        title={
          <>
            Common <span className="accent-serif text-primary">questions</span>
          </>
        }
        description="Answers to the questions families ask most when they first contact us."
        items={CONTACT_FAQS}
      />

      <ServiceArea />
      <Toaster />
    </>
  );
}
