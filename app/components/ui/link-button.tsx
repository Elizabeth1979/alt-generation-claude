import Link from "next/link";
import { ButtonProps } from "./button";

interface LinkButtonProps extends Omit<ButtonProps, "onClick"> {
  href: string;
}

export function LinkButton({
  href,
  children,
  className = "",
  variant = "default",
  size = "default",
}: LinkButtonProps) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium 
        ring-offset-background transition-colors focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50 
        ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
