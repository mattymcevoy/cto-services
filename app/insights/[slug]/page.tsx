import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllInsightSlugs, getInsightBySlug } from "@/lib/insights";
import LuxuryCta from "@/components/LuxuryCta";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllInsightSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  return {
    title: `${insight.title} | CTO Services`,
    description: insight.excerpt,
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black to-black" />
      </div>

      <article className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-24">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to insights
        </Link>

        <div className="mt-8">
          <div className="text-xs uppercase tracking-[0.24em] text-white/50">
            {new Date(insight.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {insight.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            {insight.excerpt}
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div
            className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-white/80 prose-li:text-white/75"
            dangerouslySetInnerHTML={{ __html: insight.contentHtml }}
          />
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="text-xs uppercase tracking-[0.28em] text-white/55">
            Next step
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            If this reflects the challenge you are dealing with, let’s talk.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Book a confidential consultation or send a direct enquiry.
          </p>

          <LuxuryCta enquiryHref="/#contact" />
        </div>
      </article>
    </main>
  );
}
