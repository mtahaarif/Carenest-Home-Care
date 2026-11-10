import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const shine =
  "relative isolate overflow-hidden after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-1/2 after:-translate-x-[150%] after:skew-x-[-20deg] after:bg-white/25 hover:after:animate-shine";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-foreground/15 bg-white/60 backdrop-blur hover:border-primary/40 hover:bg-white hover:text-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-foreground/5",
        link: "text-primary underline-offset-4 hover:underline",
        hero: cn("bg-brand-gradient text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-14px_hsl(175_55%_33%/0.6)]", shine),
        accent: cn("bg-gold-gradient text-accent-foreground shadow-[0_14px_40px_-14px_hsl(38_72%_45%/0.7)] hover:-translate-y-0.5", shine),
        glass: "glass-dark text-ink-foreground hover:bg-white/15",
        heroOutline: "border border-white/30 bg-white/5 text-white backdrop-blur hover:border-white/60 hover:bg-white/10",
        ink: cn("bg-ink text-ink-foreground hover:-translate-y-0.5 hover:bg-ink/90", shine),
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3.5",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
