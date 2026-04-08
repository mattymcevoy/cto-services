import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSortedInsights } from "@/lib/insights";

export const metadata = {
  title: "Insights | CTO Services",
  description:
    "Executive technology insights on strategy, governance, cloud, cyber, and operating discipline.",
};

export default function InsightsPage() {
  const insights = getSortedInsights();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black to-black" />
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/60">
            Insights
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Practical thinking for leaders making technology decisions.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Articles on technology leadership, governance, cyber risk, cloud,
            operating discipline, and executive decision-making.
          </p>
        </div>

        <div className="mt-12 grid gap-6">
          {insights.map((insight) => (
            <article
              key={insight.slug}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
            >
              <div className="text-xs uppercase tracking-[0.24em] text-white/50">
                {new Date(insight.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {insight.title}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
                {insight.excerpt}
              </p>

              <div className="mt-6">
                <Link
                  href={`/insights/${insight.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Read article <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
