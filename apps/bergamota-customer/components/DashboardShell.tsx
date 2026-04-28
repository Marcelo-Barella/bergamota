import Link from "next/link";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-0">
      <div className="border-b border-border-subtle bg-cream-50/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-display text-lg text-charcoal-800">
            Subscription coffee
          </Link>
          <nav className="flex items-center gap-2">
            <span className="hidden rounded-md px-3 py-1.5 text-sm text-charcoal-600 sm:inline">
              Signed in (demo)
            </span>
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-700 ring-1 ring-border-subtle hover:bg-cream-100"
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
