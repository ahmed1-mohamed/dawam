"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-3xl font-bold text-red-600">Critical Error</h1>
        <p className="mt-3 text-neutral-600 max-w-md">
          A critical system error occurred. Our engineering team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
