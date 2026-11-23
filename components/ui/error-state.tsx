import * as React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title,
  description,
  retryLabel,
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-destructive">
        {title}
      </h3>
      {description && (
        <p className="mb-4 mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="mt-2 border-destructive/30 hover:bg-destructive/10"
        >
          <RotateCcw className="me-2 h-4 w-4 rtl:rotate-180" />
          {retryLabel ?? "Retry"}
        </Button>
      )}
    </div>
  );
}
