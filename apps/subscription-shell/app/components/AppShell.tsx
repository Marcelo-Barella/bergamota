"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppShell({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDash = pathname?.startsWith("/dashboard");

  return (
    <div className="min-h-dvh bg-[var(--color-surface-base)]">
      <a
        href="#main-content"
        className="fixed left-[var(--spacing-gutter-md)] top-[var(--spacing-gutter-md)] z-[100] -translate-y-[140%] rounded-[var(--radius-sm)] bg-[var(--color-ink-primary)] px-[var(--spacing-gutter-sm)] py-[var(--spacing-gutter-xs)] text-[length:var(--font-size-body-sm)] font-semibold text-[var(--color-surface-paper)] focus:translate-y-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
      >
        Skip to content
      </a>

      <header className="border-b border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface-paper)_90%,transparent)]">
        <div className="mx-auto flex max-w-5xl flex-col gap-[var(--spacing-gutter-lg)] px-[var(--spacing-gutter-sm)] py-[var(--spacing-gutter-md)] sm:flex-row sm:items-center sm:justify-between sm:gap-[var(--spacing-gutter-md)] sm:px-[var(--spacing-gutter-lg)] lg:px-[var(--spacing-gutter-xl)]">
          <div className="flex flex-col gap-1">
            <span className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h2)] font-semibold tracking-tight text-[var(--color-ink-primary)]">
              {title}
            </span>
            <span className="inline-flex items-center gap-2 text-[length:var(--font-size-body-sm)] text-[var(--color-ink-muted)]">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-[var(--color-accent)]"
              />
              Signed in (demo session)
            </span>
          </div>
          <nav
            aria-label="Primary"
            className="flex flex-wrap gap-[var(--spacing-gutter-xs)] sm:gap-[var(--spacing-gutter-md)]"
          >
            <Link
              href="/"
              aria-current={!isDash ? "page" : undefined}
              className={`rounded-[var(--radius-pill)] px-5 py-3 text-[length:var(--font-size-body-sm)] font-medium transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] ${
                !isDash
                  ? "bg-[var(--color-surface-elevated)] text-[var(--color-ink-primary)]"
                  : "text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-muted)]"
              }`}
            >
              Overview
            </Link>
            <Link
              href="/dashboard"
              aria-current={isDash ? "page" : undefined}
              className={`rounded-[var(--radius-pill)] px-5 py-3 text-[length:var(--font-size-body-sm)] font-medium transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] ${
                isDash
                  ? "border border-[var(--color-border)] bg-[var(--color-surface-paper)] text-[var(--color-ink-primary)] shadow-sm"
                  : "text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-muted)]"
              }`}
            >
              Subscription
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-[var(--spacing-gutter-sm)] py-[var(--spacing-gutter-2xl)] sm:px-[var(--spacing-gutter-lg)] lg:px-[var(--spacing-gutter-xl)]">
        {children}
      </div>
    </div>
  );
}
