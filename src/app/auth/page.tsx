"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ArrowLeft, Info, Lock, Mail, Shield } from "@/components/icons";
import { Aurora } from "@/components/fx/Aurora";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const authSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { signIn, signUp, user, isLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) router.push("/admin");
  }, [user, isLoading, router]);

  const validateForm = () => {
    const result = authSchema.safeParse({ email, password });
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: { email?: string; password?: string } = {};
    result.error.issues.forEach((issue) => {
      if (issue.path[0] === "email") next.email = issue.message;
      if (issue.path[0] === "password") next.password = issue.message;
    });
    setErrors(next);
    return false;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({ title: "Login Failed", description: "Invalid email or password. Please try again.", variant: "destructive" });
          } else {
            toast({ title: "Login Failed", description: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: "Welcome back!", description: "You have been logged in successfully." });
          router.push("/admin");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({ title: "Account Exists", description: "An account with this email already exists. Please sign in instead.", variant: "destructive" });
          } else {
            toast({ title: "Sign Up Failed", description: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: "Account Created!", description: "Your account has been created successfully." });
          router.push("/admin");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-12">
      <Aurora />
      <div className="relative mx-auto max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-6 rounded-3xl glass p-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-2">Admin Portal Setup</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  • <strong>First account</strong> created automatically becomes admin
                </li>
                <li>• Additional staff can be added from the dashboard</li>
                <li>• Use this portal to manage patient inquiries &amp; job applications</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-foreground/5 bg-card p-8 shadow-elevated">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground mt-2">{isLogin ? "Sign in to access the dashboard" : "Create your admin account"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@carenesthc.com"
                  className="pl-10"
                  required
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-primary hover:underline">
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
