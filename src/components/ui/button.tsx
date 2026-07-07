import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "light" | "ghostLight";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] active:transition-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-white shadow-sm hover:bg-gold-dark hover:shadow-md hover:-translate-y-0.5",
  outline:
    "border border-ink/15 text-ink hover:border-gold hover:text-gold-dark hover:-translate-y-0.5 hover:shadow-sm bg-white/60",
  ghost: "text-ink hover:bg-ink/5",
  light:
    "bg-white text-ink shadow-sm hover:shadow-md hover:-translate-y-0.5",
  // Secundaire knop op een donkere achtergrond (bv. in de hero)
  ghostLight:
    "bg-white/10 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-[3.25rem] px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  );
}
