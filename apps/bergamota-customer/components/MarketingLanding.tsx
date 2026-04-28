import Link from "next/link";

const trustItems = ["Ships in recyclable packing", "Roasted to order weekly", "Skip or pause anytime"];

export function MarketingLanding() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
      <header className="mb-8 flex items-center justify-between sm:mb-12">
        <span className="font-display text-lg tracking-tight text-charcoal-800">
          Subscription coffee
        </span>
        <Link
          href="/dashboard"
          className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-700 ring-1 ring-border-subtle hover:bg-cream-100"
        >
          Dashboard
        </Link>
      </header>

      <section className="mb-12 sm:mb-16">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-charcoal-600">
          Tailored deliveries
        </p>
        <h1 className="font-display text-[2.125rem] leading-[1.12] tracking-tight text-charcoal-900 sm:text-5xl">
          Coffee that arrives when you need it, without the guesswork.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-700">
          A calm subscription surface: one roast story, transparent timing, and a single place to
          manage what ships next.
        </p>
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 items-center justify-center rounded-card bg-terra-accent px-8 py-3 text-base font-semibold text-cream-0 shadow-soft transition-colors hover:bg-terra-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra-accent"
          >
            Manage your subscription
          </Link>
        </div>
      </section>

      <section
        aria-label="Trust"
        className="mb-12 border-y border-border-subtle py-6 sm:mb-16"
      >
        <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
          {trustItems.map((label) => (
            <li
              key={label}
              className="text-sm font-medium leading-relaxed text-charcoal-700"
            >
              {label}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="font-display text-2xl tracking-tight text-charcoal-900 sm:text-3xl">
          This week&apos;s roast story
        </h2>
        <p className="mt-4 text-base leading-relaxed text-charcoal-700">
          We source a seasonal lot, roast for clarity over punch, and cup until the sweetness sits
          cleanly in the finish. Your next bag is matched to that profile so every delivery feels
          familiar, not flat.
        </p>
        <div className="mt-6 rounded-card border border-border-subtle bg-cream-50 p-6 shadow-soft">
          <p className="font-display text-lg text-charcoal-900">Medium · Balanced</p>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
            Notes lean toward milk chocolate and citrus peel. Best as pour-over or a gentle espresso
            with a longer ratio.
          </p>
        </div>
      </section>

      <footer className="mt-auto border-t border-border-subtle pt-8 text-center text-sm text-charcoal-600">
        <p>Demo marketing page. No purchase on this surface.</p>
      </footer>
    </div>
  );
}
