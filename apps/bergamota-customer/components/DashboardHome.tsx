"use client";

import Link from "next/link";
import { mockBrewTips, mockNextShipment, mockOrderTimeline } from "@/lib/mock-data";

export function DashboardHome() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mb-8 rounded-lg border border-border-subtle bg-cream-50 px-4 py-3 text-sm text-charcoal-700">
        <span className="font-medium text-charcoal-800">Demo session.</span> Data is local mock
        only.{" "}
        <Link href="/" className="font-medium text-charcoal-800 underline-offset-2 hover:underline">
          Back to marketing
        </Link>
      </div>

      <header className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.1em] text-charcoal-600">
          Your subscription
        </p>
        <h1 className="font-display mt-2 text-3xl tracking-tight text-charcoal-900 sm:text-4xl">
          Dashboard
        </h1>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-charcoal-700">
          Order progress, next shipment, and short brew notes using the shared display and body
          pairing from the kit.
        </p>
      </header>

      <section aria-labelledby="timeline-heading" className="mb-10">
        <h2 id="timeline-heading" className="font-display text-xl text-charcoal-900">
          Order timeline
        </h2>
        <ol className="mt-6 border-l border-border-subtle pl-6">
          {mockOrderTimeline.map((step, index) => (
            <li
              key={step.id}
              className={`relative ${index < mockOrderTimeline.length - 1 ? "pb-8" : ""}`}
            >
              <span
                className="absolute -left-[calc(1.5rem-5px)] top-2 h-[10px] w-[10px] rounded-full border-2 border-cream-0 bg-cream-0"
                aria-hidden
              >
                <span
                  className={`absolute left-1/2 top-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    step.state === "done"
                      ? "bg-charcoal-700"
                      : step.state === "current"
                        ? "bg-terra-accent ring-4 ring-terra-muted/40"
                        : "bg-cream-200"
                  }`}
                />
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-medium text-charcoal-900">{step.label}</span>
                <span className="text-sm text-charcoal-600">{step.date}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section
          aria-labelledby="shipment-heading"
          className="rounded-card border border-border-subtle bg-surface-elevated p-6 shadow-soft"
        >
          <h2 id="shipment-heading" className="font-display text-xl text-charcoal-900">
            Next shipment
          </h2>
          <p className="mt-1 text-sm text-charcoal-600">{mockNextShipment.window}</p>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-charcoal-600">Ship date</dt>
              <dd className="mt-1 font-medium text-charcoal-900">{mockNextShipment.shipDate}</dd>
            </div>
            <div>
              <dt className="text-charcoal-600">Carrier</dt>
              <dd className="mt-1 font-medium text-charcoal-900">{mockNextShipment.carrier}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="mt-8 w-full min-h-12 rounded-card bg-terra-accent py-3 text-center text-sm font-semibold text-cream-0 transition-colors hover:bg-terra-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra-accent"
          >
            View shipping details
          </button>
        </section>

        <section aria-labelledby="brew-heading">
          <h2 id="brew-heading" className="font-display text-xl text-charcoal-900">
            Brew tips
          </h2>
          <ul className="mt-4 space-y-4">
            {mockBrewTips.map((tip) => (
              <li
                key={tip.id}
                className="rounded-card border border-border-subtle bg-cream-50 p-4"
              >
                <p className="font-medium text-charcoal-900">{tip.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{tip.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
