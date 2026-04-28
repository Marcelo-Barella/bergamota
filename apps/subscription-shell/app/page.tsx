import Link from "next/link";

const trustItems = [
  { label: "Direct trade" },
  { label: "Organic" },
  { label: "Carbon neutral shipping" },
  { label: "Small batch" }
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-[var(--color-surface-base)] text-[var(--color-ink-secondary)]">
      <header className="border-b border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface-paper)_88%,transparent)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-[var(--spacing-gutter-sm)] py-[var(--spacing-gutter-md)] sm:px-[var(--spacing-gutter-lg)] lg:px-[var(--spacing-gutter-xl)]">
          <span className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h3)] font-semibold tracking-tight text-[var(--color-ink-primary)]">
            Your Coffee Subscription
          </span>
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 min-w-[10.5rem] touch-manipulation items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--color-accent-foreground)] shadow-sm transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
          >
            View account
          </Link>
        </div>
      </header>

      <main id="main-content">
        <section className="mx-auto max-w-3xl px-[var(--spacing-gutter-sm)] pb-[var(--spacing-section)] pt-[var(--spacing-gutter-2xl)] sm:px-[var(--spacing-gutter-lg)] lg:max-w-4xl lg:px-[var(--spacing-gutter-xl)]">
          <p className="mb-[var(--spacing-gutter-md)] text-[length:var(--font-size-body-sm)] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            Specialty coffee, one calm delivery at a time
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[length:var(--font-size-display)] font-semibold leading-[var(--line-height-tight)] tracking-[-0.02em] text-[var(--color-ink-primary)]">
            Coffee sourced with care. Roasted for clarity. Shipped on your rhythm.
          </h1>
          <p className="mt-[var(--spacing-gutter-lg)] max-w-2xl text-[length:var(--font-size-body)] leading-[var(--line-height-snug)] text-[var(--color-ink-muted)]">
            Curated lots from small farms, resting before roast for sweetness and balance.
            You choose the cadence; we handle freshness and traceability.
          </p>
          <div className="mt-[var(--spacing-gutter-xl)]">
            <Link
              href="/dashboard"
              className="inline-flex min-h-14 min-w-[min(100%,16rem)] touch-manipulation items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-accent)] px-[var(--spacing-gutter-lg)] text-[length:var(--font-size-body)] font-semibold text-[var(--color-accent-foreground)] shadow-[0_1px_2px_oklch(0.25_0.02_45_/_0.12)] transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ring)]"
            >
              Open your dashboard
            </Link>
          </div>
        </section>

        <section
          aria-label="Trust and quality"
          className="border-y border-[var(--color-border)] bg-[var(--color-surface-muted)] py-[var(--spacing-gutter-xl)]"
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-[var(--spacing-gutter-lg)] px-[var(--spacing-gutter-sm)] sm:gap-[var(--spacing-gutter-xl)] sm:px-[var(--spacing-gutter-lg)] lg:justify-between lg:gap-[var(--spacing-gutter-2xl)] lg:px-[var(--spacing-gutter-xl)]">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex min-h-12 items-center rounded-[var(--radius-md)] border border-[color-mix(in_oklch,var(--color-border)_90%,transparent)] bg-[var(--color-surface-paper)] px-[var(--spacing-gutter-lg)] py-[var(--spacing-gutter-sm)]"
              >
                <span className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--color-ink-secondary)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-[var(--spacing-gutter-sm)] py-[var(--spacing-section)] sm:px-[var(--spacing-gutter-lg)] lg:px-[var(--spacing-gutter-xl)]">
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h2)] font-semibold leading-[var(--line-height-snug)] text-[var(--color-ink-primary)]">
            Roast story
          </h2>
          <div className="mt-[var(--spacing-gutter-2xl)] flex flex-col gap-[var(--spacing-gutter-xl)] lg:gap-[var(--spacing-section)]">
            <article className="grid gap-[var(--spacing-gutter-md)] border-l-4 border-[var(--color-accent)] pl-[var(--spacing-gutter-lg)]">
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h3)] font-semibold text-[var(--color-ink-primary)]">
                Source
              </h3>
              <p className="max-w-prose text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-[var(--color-ink-muted)]">
                We buy in small lots, preferring producers who invest in soil health and community.
                Every box lists origin notes you can actually taste.
              </p>
            </article>
            <article className="grid gap-[var(--spacing-gutter-md)] border-l-4 border-[var(--color-border)] pl-[var(--spacing-gutter-lg)]">
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h3)] font-semibold text-[var(--color-ink-primary)]">
                Roast
              </h3>
              <p className="max-w-prose text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-[var(--color-ink-muted)]">
                Light-to-medium profiles with consistent development. Cooling is paced to keep
                aromatics vivid without roast bite.
              </p>
            </article>
            <article className="grid gap-[var(--spacing-gutter-md)] border-l-4 border-[var(--color-border)] pl-[var(--spacing-gutter-lg)]">
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h3)] font-semibold text-[var(--color-ink-primary)]">
                Deliver
              </h3>
              <p className="max-w-prose text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-[var(--color-ink-muted)]">
                Packed within days of roast, insulated for transit windows. Pause or reschedule
                anytime from your dashboard.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] py-[var(--spacing-gutter-xl)]">
        <div className="mx-auto flex max-w-5xl flex-col gap-[var(--spacing-gutter-md)] px-[var(--spacing-gutter-sm)] sm:flex-row sm:items-center sm:justify-between sm:px-[var(--spacing-gutter-lg)] lg:px-[var(--spacing-gutter-xl)]">
          <p className="text-[length:var(--font-size-body-sm)] text-[var(--color-ink-subtle)]">
            Demo experience. No checkout or backend.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 touch-manipulation items-center justify-center self-start rounded-[var(--radius-pill)] border border-transparent bg-[var(--color-accent)] px-6 font-semibold text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] sm:self-auto"
          >
            Go to dashboard
          </Link>
        </div>
      </footer>
    </div>
  );
}
