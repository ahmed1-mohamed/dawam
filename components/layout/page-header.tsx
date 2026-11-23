import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between",
        className
      )}
      {...props}
    >
      <div className="space-y-1.5">
        {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 sm:self-center">
          {actions}
        </div>
      )}
    </div>
  );
}
