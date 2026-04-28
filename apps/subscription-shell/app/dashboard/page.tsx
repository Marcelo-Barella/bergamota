import { AppShell } from "../components/AppShell";

const milestones = [
  {
    id: "1",
    label: "Order confirmed",
    date: "Apr 2",
    done: true
  },
  {
    id: "2",
    label: "Roast scheduled",
    date: "Apr 4",
    done: true
  },
  {
    id: "3",
    label: "Shipped",
    date: "Apr 6",
    done: true
  },
  {
    id: "4",
    label: "Out for delivery",
    date: "Apr 8",
    done: false
  }
];

const tips = [
  {
    title: "Bloom with patience",
    body: "Pour twice the weight of coffee in hot water, wait 40 seconds, then continue in slow circles."
  },
  {
    title: "Water just off boil",
    body: "For light roasts, 92 to 96 degrees Celsius keeps sweetness without harshness."
  },
  {
    title: "Grind last",
    body: "Grind right before brewing to keep volatile aromatics in the cup."
  }
];

export default function DashboardPage() {
  return (
    <AppShell title="Your Coffee Subscription">
      <main id="main-content" className="flex flex-col gap-[var(--spacing-section)]">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h1)] font-semibold leading-[var(--line-height-tight)] text-[var(--color-ink-primary)]">
            Subscription
          </h1>
          <p className="mt-[var(--spacing-gutter-md)] max-w-2xl text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-[var(--color-ink-muted)]">
            Your next bag is on the way. Full backend and payments are not connected; this is a
            visual preview of the member experience.
          </p>
        </div>

        <section
          aria-labelledby="shipment-heading"
          className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-paper)] p-[var(--spacing-gutter-lg)] shadow-[0_2px_16px_oklch(0.35_0.02_50_/_0.06)] sm:p-[var(--spacing-gutter-xl)]"
        >
          <h2
            id="shipment-heading"
            className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h2)] font-semibold text-[var(--color-ink-primary)]"
          >
            Next shipment
          </h2>
          <div className="mt-[var(--spacing-gutter-xl)] grid gap-[var(--spacing-gutter-lg)] sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-[length:var(--font-size-body-sm)] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-subtle)]">
                Arriving
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-[length:clamp(2rem,4vw,2.5rem)] font-semibold text-[var(--color-ink-primary)]">
                Wednesday, April 9
              </p>
              <p className="mt-[var(--spacing-gutter-sm)] text-[length:var(--font-size-body)] text-[var(--color-ink-muted)]">
                Single-origin Honduras, washed. 340 g whole bean.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center self-stretch rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] sm:w-auto sm:min-w-[12rem]"
            >
              Reschedule (demo)
            </button>
          </div>
        </section>

        <section aria-labelledby="timeline-heading">
          <h2
            id="timeline-heading"
            className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h2)] font-semibold text-[var(--color-ink-primary)]"
          >
            Order timeline
          </h2>
          <ol className="mt-[var(--spacing-gutter-xl)] grid gap-0 border-l border-[var(--color-border)] pl-[var(--spacing-gutter-lg)]">
            {milestones.map((step, index) => (
              <li
                key={step.id}
                className={`relative pb-[var(--spacing-gutter-xl)] pl-[var(--spacing-gutter-xs)] ${index === milestones.length - 1 ? "pb-0" : ""}`}
              >
                <span
                  aria-hidden
                  className={`absolute -left-[calc(0.5rem+9px)] top-2 flex h-[10px] w-[10px] rounded-full ring-4 ring-[var(--color-surface-base)] ${
                    step.done ? "bg-[var(--color-accent)]" : "border-2 border-[var(--color-border)] bg-[var(--color-surface-paper)]"
                  }`}
                />
                <p className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h3)] font-semibold text-[var(--color-ink-primary)]">
                  {step.label}
                </p>
                <p className="mt-1 text-[length:var(--font-size-body-sm)] text-[var(--color-ink-muted)]">{step.date}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="tips-heading">
          <h2
            id="tips-heading"
            className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h2)] font-semibold text-[var(--color-ink-primary)]"
          >
            Brew tips
          </h2>
          <ul className="mt-[var(--spacing-gutter-xl)] grid gap-[var(--spacing-gutter-lg)] md:grid-cols-3">
            {tips.map((tip) => (
              <li
                key={tip.title}
                className="flex flex-col gap-[var(--spacing-gutter-md)] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-[var(--spacing-gutter-lg)]"
              >
                <span className="font-[family-name:var(--font-display)] text-[length:var(--font-size-h3)] font-semibold text-[var(--color-ink-primary)]">
                  {tip.title}
                </span>
                <p className="text-[length:var(--font-size-body-sm)] leading-[var(--line-height-body)] text-[var(--color-ink-muted)]">
                  {tip.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </AppShell>
  );
}
