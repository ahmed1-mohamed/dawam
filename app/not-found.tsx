import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-100">
          404 - Page Not Found
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          The requested resource could not be found.
        </p>
        <Link
          href="/en"
          className="mt-6 rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Return to Home
        </Link>
      </body>
    </html>
  );
}
