import * as React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "default" | "full" | "narrow";
}

export function PageContainer({
  children,
  className,
  maxWidth = "default",
  ...props
}: PageContainerProps) {
  const maxWidthClasses = {
    default: "max-w-7xl",
    full: "max-w-full",
    narrow: "max-w-4xl",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 py-6 sm:px-6 lg:px-8",
        maxWidthClasses[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
