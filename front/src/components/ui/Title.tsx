import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Title({
  children,
  align = "center",
  size = "lg",
  className = "",
}: TitleProps) {
  const sizeClasses = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
  };

  return (
    <div className={`mb-6 ${className}`}>
      <h1 className={`font-semibold ${sizeClasses[size]} text-${align}`}>
        {children}
      </h1>
    </div>
  );
}
