"use client";

import LuxuryCta from "@/components/LuxuryCta";
import AvailabilityBand from "@/components/AvailabilityBand";
import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  LineChart,
  Cpu,
  Users,
  Building2,
  Briefcase,
  Sparkles,
  Check,
  Mail,
  Phone,
  Calendar,
  Quote,
  ChevronDown,
} from "lucide-react";

// Luxury single-page site for CTO Services
// Tailwind for styling + Framer Motion for subtle motion

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80 backdrop-blur">
    <Sparkles className="h-3.5 w-3.5" />
    {children}
  </span>
);

const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) => (
  <div className="max-w-3xl">
    <div className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/60">
      {eyebrow}
    </div>
    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
      {title}
    </h2>
    {subtitle ? (
      <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
        {subtitle}
      </p>
    ) : null}
  </div>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur ${className}`}
  >
    {children}
  </div>
);

const GradientBorder = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative rounded-2xl p-[1px] ${className}`}>
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10" />
    <div className="relative rounded-2xl bg-black/60">{children}</div>
  </div>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm text-white/70 transition hover:text-white">
    {children}
  </a>
);

function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState(ids?.[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const handler = () => {
      const y = window.scrollY + offset;
      let current = ids[0];
      for (const el of elements) {
        if (el.offsetTop <= y) current = el.id;
      }
      setActive(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids, offset]);

  return active;
}

const formatMoney = (n: number) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

type Tier = {
  name: string;
  fit: string;
  days: string;
  from: number;
  includes: string[];
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Advisory Retainer",
    fit: "Board support, rapid assurance, decision confidence",
    days: "2–4 hrs / week",
    from: 850,
    includes: [
      "Board-level technology risk briefing",
      "Vendor / contract review support",
      "Pragmatic architecture & platform guidance",
      "Monthly exec summary and actions",
    ],
  },
  {
    name: "Fractional IT Director",
    fit: "Stabilise operations, raise service quality, reduce risk",
    days: "1–2 days / week",
    from: 1850,
    includes: [
      "Operational leadership (ITSM, suppliers, run health)",
      "Cyber & resilience uplift plan",
      "Budget clarity, cost control & quick wins",
      "Stakeholder comms and board reporting",
    ],
    featured: true,
  },
  {
    name: "Fractional CTO",
    fit: "Strategy, roadmap, platforms, engineering governance",
    days: "1–3 days / week",
    from: 2500,
    includes: [
      "Technology strategy & roadmap",
      "Architecture standards and decision cadence",
      "AI / cloud adoption with governance",
      "Delivery oversight and measurable outcomes",
    ],
  },
  {
    name: "Interim Leadership",
    fit: "Turnaround, transformation, or leadership gap",
    days: "3–5 days / week",
    from: 3500,
    includes: [
      "Immediate ownership of outcomes",
      "Programme recovery and stabilisation",
      "Exec-level governance and reporting",
      "Structured exit plan & handover",
    ],
  },
];

const FAQS = [
  {
    q: "Are you a consultancy or an embedded exec?",
    a: "Embedded. We operate as part of your leadership team — accountable, visible, and focused on outcomes rather than deliverables for their own sake.",
  },
  {
    q: "How quickly can you start?",
    a: "Typically within 1–2 weeks depending on scope. For urgent stabilisation we can begin with an accelerated diagnostic in the first 72 hours.",
  },
  {
    q: "What types of organisations do you work with?",
    a: "Growing SMEs, multi-site operators, regulated organisations, and investors needing due diligence, stabilisation, or value-creation roadmaps.",
  },
  {
    q: "Do you work with existing MSPs and vendors?",
    a: "Yes. We improve governance, performance, and commercial outcomes, while maintaining a constructive relationship with delivery partners.",
  },
  {
    q: "How do you measure success?",
    a: "We agree a short set of metrics up front — service stability, risk reduction, time-to-decision, cost predictability, and delivery throughput — and report progress monthly.",
  },
];

const OUTCOMES = [
  {
    icon: Shield,
    title: "Reduced board risk",
    text: "Sharper control of cyber, resilience, and compliance — with evidence, not reassurance.",
  },
  {
    icon: LineChart,
    title: "Predictable IT cost & ROI",
    text: "Clear financial governance, vendor rationalisation, and practical optimisation.",
  },
  {
    icon: Cpu,
    title: "Faster, safer transformation",
    text: "Roadmaps that balance pace with operability, security, and sustainable delivery.",
  },
  {
    icon: Users,
    title: "Stronger teams & ownership",
    text: "A high-performance culture with clarity, accountability, and pragmatic standards.",
  },
];

const WHO_WE_HELP = [
  {
    icon: Building2,
    title: "Growing businesses",
    points: ["Outgrowing informal IT", "Scaling securely and efficiently", "Preparing for audit or investment"],
  },
  {
    icon: Briefcase,
    title: "Investors & PE",
    points: ["Technology due diligence", "Post-acquisition stabilisation", "Value creation plans"],
  },
  {
    icon: Shield,
    title: "Regulated environments",
    points: ["Governance and assurance", "Security-by-design", "Operational resilience"],
  },
  {
    icon: Users,
    title: "Organisations in transition",
    points: ["Leadership gap cover", "Programme recovery", "Vendor and platform reset"],
  },
];

const SERVICES = [
  {
    icon: Cpu,
    title: "Fractional CTO",
    desc: "Technology strategy, architecture decisions, AI & cloud adoption, and engineering governance.",
    bullets: [
      "Strategy & roadmap aligned to business goals",
      "Platform and architecture decision cadence",
      "AI adoption with governance and safeguards",
      "Delivery oversight with measurable outcomes",
    ],
  },
  {
    icon: Users,
    title: "Fractional IT Director",
    desc: "Operational stability, cyber resilience, supplier performance, and service governance.",
    bullets: [
      "ITSM maturity (incidents, changes, problem management)",
      "Cyber & resilience uplift plan",
      "Supplier & contract governance",
      "Board-ready reporting and KPIs",
    ],
  },
  {
    icon: Briefcase,
    title: "Interim & transformation leadership",
    desc: "Turnarounds, programme recovery, ERP/cloud initiatives, and leadership transitions.",
    bullets: [
      "Rapid diagnostic and stabilisation",
      "Programme governance and recovery",
      "Commercial and vendor alignment",
      "Exit plan and structured handover",
    ],
  },
  {
    icon: Shield,
    title: "Board & executive advisory",
    desc: "Confidential, outcome-driven support for CEOs, CFOs, founders, and boards.",
    bullets: [
      "Technology risk and assurance briefings",
      "Decision support on major investments",
      "Vendor and contract challenge",
      "Operating model and leadership coaching",
    ],
  },
];

const steps = [
  { n: "01", title: "Discovery & context", text: "We learn your goals, constraints, and risks — then define what ‘good’ looks like." },
  { n: "02", title: "Right-sized engagement", text: "A precise scope: fixed term, retained, or fractional days — with predictable cost." },
  { n: "03", title: "Embedded leadership", text: "We join your leadership rhythm: steering decisions, owning outcomes, unblocking delivery." },
  { n: "04", title: "Measurable outcomes", text: "Monthly reporting against agreed KPIs, plus an exit plan that leaves you stronger." },
];

const TESTIMONIALS = [
  { quote: "We finally had a clear technology roadmap and a decision-making cadence the whole leadership team trusted.", by: "CEO, Multi-site Operator" },
  { quote: "Service stability improved in weeks. Vendor performance and costs became transparent — and controllable.", by: "CFO, Regulated SME" },
  { quote: "Their due diligence was blunt, evidence-based, and immediately actionable. Exactly what an investor needs.", by: "Operating Partner, PE" },
];

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

export default function CTOServicesLuxurySite() {
  const prefersReduced = useReducedMotion();
  const sections = useMemo(
    () => ["home", "services", "who", "how", "outcomes", "pricing", "faq", "contact"],
    []
  );
  const active = useScrollSpy(sections, 140);

  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [tier, setTier] = useState(
    TIERS.find((t) => t.featured)?.name ?? TIERS[0].name
  );

  const selectedTier = useMemo(
    () => TIERS.find((t) => t.name === tier) ?? TIERS[0],
    [tier]
  );

  const estimatedMonthly = useMemo(() => {
    const from = selectedTier.from;
    if (selectedTier.name === "Advisory Retainer") return from * 4;
    if (selectedTier.days.includes("1–2")) return from * 6; // avg 1.5 days/week
    if (selectedTier.days.includes("1–3")) return from * 8; // avg 2 days/week
    if (selectedTier.days.includes("3–5")) return from * 16; // avg 4 days/week
    return from * 6;
  }, [selectedTier]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`CTO Services enquiry — ${form.company || "(company)"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}\n\nInterest: ${tier}\nIndicative estimate: ${formatMoney(estimatedMonthly)} / month (approx)`
    );
    window.location.href = `mailto:hello@ctoservices.co.uk?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black to-black" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="group inline-flex items-center gap-3">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
              <span className="relative font-semibold tracking-tight">CTO</span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">CTO Services</div>
              <div className="text-xs tracking-wide text-white/55">Executive leadership, on demand</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {[
              ["Services", "#services"],
              ["Who we help", "#who"],
              ["How it works", "#how"],
              ["Outcomes", "#outcomes"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <NavLink key={href} href={href}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10 sm:inline-flex"
            >
              Book a confidential discussion
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
            >
              Contact <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Container>

        <div className="h-[2px] w-full bg-white/5">
          <div
            className="h-[2px] bg-white/40"
            style={{
              width: `${((sections.indexOf(active) + 1) / sections.length) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <motion.div
              className="lg:col-span-7"
              initial={prefersReduced ? false : "hidden"}
              animate={prefersReduced ? undefined : "show"}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.12 } },
              }}
            >
              <motion.div variants={fadeUp}>
                <Pill>Fractional CTO • Fractional IT Director • Interim Leadership</Pill>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Board-level technology leadership.
                <span className="block text-white/70">Without the full-time overhead.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
              >
                CTO Services provides executive-grade CTO and IT Director capability for
                organisations that need clarity, control, and momentum — with measurable
                outcomes, discreet leadership, and a luxury-calibre client experience.
              </motion.p>

              <motion.div variants={fadeUp} <motion.div variants={fadeUp}>
              <LuxuryCta />
              </motion.div>


              <motion.div variants={fadeUp} className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Typical engagement", value: "1–3 days / week" },
                  { label: "Focus", value: "Outcomes & assurance" },
                  { label: "Style", value: "Embedded executive" },
                ].map((k) => (
                  <Card key={k.label} className="p-5">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/55">{k.label}</div>
                    <div className="mt-2 text-lg font-semibold tracking-tight">{k.value}</div>
                  </Card>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <GradientBorder>
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-white/55">What you get</div>
                      <div className="mt-2 text-xl font-semibold tracking-tight">Executive assurance pack</div>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5">
                      <Shield className="h-5 w-5 text-white/80" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      "A clear technology roadmap and decision cadence",
                      "Board-ready reporting and risk visibility",
                      "Vendor, cost, and service governance",
                      "An exit plan that leaves your organisation stronger",
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-3">
                        <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full bg-white text-black">
                          <Check className="h-4 w-4" />
                        </span>
                        <div className="text-sm leading-relaxed text-white/75">{t}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <a
                      href="#pricing"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                    >
                      View engagement models <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#services"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                    >
                      Explore services <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </GradientBorder>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <div className="text-xs uppercase tracking-[0.24em] text-white/55">Confidentiality</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/75">
                    Discreet support for founders and boards — designed for sensitive decisions.
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="text-xs uppercase tracking-[0.24em] text-white/55">Luxury experience</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/75">
                    Calm, responsive, high-trust delivery with polished executive communications.
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>

          <div className="mt-14 flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-white/45">
            <div className="h-px flex-1 bg-white/10" />
            Trusted for stability, governance, and transformation
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </Container>
      </section>
      <AvailabilityBand />

      {/* SERVICES */}
      <section id="services" className="border-t border-white/10">
        <Container className="py-16 sm:py-20">
          <SectionTitle
            eyebrow="Services"
            title="Leadership, productised. Outcomes, measured."
            subtitle="Choose the level of executive capacity you need — from advisory assurance through to embedded interim leadership."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {SERVICES.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
              >
                <Card>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5">
                          <s.icon className="h-5 w-5 text-white/80" />
                        </span>
                        <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">{s.desc}</p>
                    </div>
                    <div className="hidden shrink-0 text-right sm:block">
                      <div className="text-xs uppercase tracking-[0.26em] text-white/50">Typical</div>
                      <div className="mt-2 text-sm font-semibold text-white/85">1–3 days / week</div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {s.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-3">
                        <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full border border-white/15 bg-white/5">
                          <Check className="h-3.5 w-3.5 text-white/80" />
                        </span>
                        <div className="text-sm leading-relaxed text-white/75">{b}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                    >
                      Discuss this service <ArrowRight className="h-4 w-4" />
                    </a>
                    <div className="text-xs uppercase tracking-[0.26em] text-white/50">
                      Designed for executive stakeholders
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHO */}
      <section id="who" className="border-t border-white/10">
        <Container className="py-16 sm:py-20">
          <SectionTitle
            eyebrow="Who we help"
            title="For organisations where technology is critical — and leadership is missing."
            subtitle="We’re a fit when decisions are expensive, risk is real, and momentum matters."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHO_WE_HELP.map((w, idx) => (
              <motion.div
                key={w.title}
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
              >
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5">
                      <w.icon className="h-5 w-5 text-white/80" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">{w.title}</h3>
                  </div>
                  <div className="mt-5 space-y-3">
                    {w.points.map((p) => (
                      <div key={p} className="flex items-start gap-3">
                        <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full border border-white/15 bg-white/5">
                          <Check className="h-3.5 w-3.5 text-white/80" />
                        </span>
                        <div className="text-sm text-white/75">{p}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                  Luxury-grade delivery
                </div>
                <div className="mt-3 text-xl font-semibold tracking-tight">
                  Calm, decisive leadership — with board-ready communication.
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  You’ll receive structured updates, clear options, and recommendations that stand up to scrutiny.
                  We minimise noise and maximise confidence.
                </p>
              </div>
              <div className="lg:col-span-4">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Book a call <Calendar className="h-4 w-4" />
                </a>
                <div className="mt-3 text-center text-xs uppercase tracking-[0.26em] text-white/45">
                  Confidential • Professional • Outcome-led
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HOW */}
      <section id="how" className="border-t border-white/10">
        <Container className="py-16 sm:py-20">
          <SectionTitle
            eyebrow="How it works"
            title="A simple engagement model that reduces risk and speeds decisions."
            subtitle="Four steps — designed to remove ambiguity, increase accountability, and deliver measurable results."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, idx) => (
              <motion.div
                key={st.n}
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
              >
                <Card className="h-full">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                      Step {st.n}
                    </div>
                    <div className="h-8 w-8 rounded-xl border border-white/15 bg-white/5" />
                  </div>
                  <div className="mt-4 text-lg font-semibold tracking-tight">{st.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{st.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                      What happens first
                    </div>
                    <div className="mt-3 text-xl font-semibold tracking-tight">Executive diagnostic (optional)</div>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      A focused assessment to map risks, constraints, and decision points.
                      Output: a short board-ready brief and a 30/60/90 day action plan.
                    </p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5">
                    <Sparkles className="h-5 w-5 text-white/80" />
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    "Technology & supplier landscape summary",
                    "Top risks ranked by impact and likelihood",
                    "Immediate stabilisation actions",
                    "Decision options with trade-offs",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-3">
                      <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full border border-white/15 bg-white/5">
                        <Check className="h-3.5 w-3.5 text-white/80" />
                      </span>
                      <div className="text-sm text-white/75">{x}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card className="h-full">
                <div className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">Working rhythm</div>
                <div className="mt-3 text-xl font-semibold tracking-tight">Designed for executive calendars</div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Weekly decision touchpoints, short written updates, and crisp escalations.
                  No theatre — just momentum.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Weekly decision meeting (30–45 mins)",
                    "Monthly board-ready summary",
                    "Supplier governance and performance review",
                    "KPIs for stability, risk, cost, and delivery",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-3">
                      <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full bg-white text-black">
                        <Check className="h-4 w-4" />
                      </span>
                      <div className="text-sm text-white/75">{x}</div>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Talk through your situation <ArrowRight className="h-4 w-4" />
                </a>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* OUTCOMES */}
      <section id="outcomes" className="border-t border-white/10">
        <Container className="py-16 sm:py-20">
          <SectionTitle
            eyebrow="Outcomes"
            title="The results clients pay for."
            subtitle="Technology leadership is only valuable when it changes reality. We focus on the outcomes that matter to CEOs and CFOs."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o, idx) => (
              <motion.div
                key={o.title}
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
              >
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5">
                      <o.icon className="h-5 w-5 text-white/80" />
                    </span>
                    <div className="text-lg font-semibold tracking-tight">{o.title}</div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{o.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} className="relative">
                <div className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5">
                  <Quote className="h-5 w-5 text-white/80" />
                </div>
                <div className="text-sm leading-relaxed text-white/80">“{t.quote}”</div>
                <div className="mt-6 text-xs font-medium uppercase tracking-[0.28em] text-white/50">
                  {t.by}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-white/10">
        <Container className="py-16 sm:py-20">
          <SectionTitle
            eyebrow="Engagement models"
            title="Transparent structures. Predictable cost."
            subtitle="We don’t commoditise leadership — but we do make it easy to buy. Choose a model, then we tailor the scope."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {TIERS.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setTier(t.name)}
                    className={`text-left transition ${tier === t.name ? "" : "opacity-80 hover:opacity-100"}`}
                  >
                    <Card className={`h-full ${tier === t.name ? "border-white/25 bg-white/[0.05]" : ""}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold tracking-tight">{t.name}</div>
                          <div className="mt-2 text-sm text-white/70">{t.fit}</div>
                        </div>
                        {t.featured ? (
                          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                            Most popular
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-5 flex items-end justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.28em] text-white/55">Time</div>
                          <div className="mt-1 text-sm font-semibold text-white/85">{t.days}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs uppercase tracking-[0.28em] text-white/55">From</div>
                          <div className="mt-1 text-sm font-semibold text-white/85">
                            {formatMoney(t.from)}
                            <span className="text-white/55">
                              {t.name === "Advisory Retainer" ? "/wk" : "/day"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <GradientBorder>
                <div className="p-6 sm:p-7">
                  <div className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">Selected model</div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight">{selectedTier.name}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{selectedTier.fit}</p>

                  <div className="mt-6 grid gap-3">
                    {selectedTier.includes.map((x) => (
                      <div key={x} className="flex items-start gap-3">
                        <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full border border-white/15 bg-white/5">
                          <Check className="h-3.5 w-3.5 text-white/80" />
                        </span>
                        <div className="text-sm text-white/75">{x}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase tracking-[0.28em] text-white/55">Indicative estimate</div>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                        Approx.
                      </span>
                    </div>
                    <div className="mt-3 text-2xl font-semibold tracking-tight">
                      {formatMoney(estimatedMonthly)}
                      <span className="text-base font-medium text-white/55"> / month</span>
                    </div>
                    <div className="mt-2 text-xs leading-relaxed text-white/55">
                      This is an indicative range based on a typical cadence. Final scope and cost
                      are agreed after discovery.
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    Request a tailored proposal <ArrowRight className="h-4 w-4" />
                  </a>

                  <div className="mt-3 text-center text-xs uppercase tracking-[0.28em] text-white/45">
                    No obligation • Confidential • Fast response
                  </div>
                </div>
              </GradientBorder>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10">
        <Container className="py-16 sm:py-20">
          <SectionTitle
            eyebrow="FAQ"
            title="Direct answers — no theatre."
            subtitle="If you have a sensitive or complex situation, we’re happy to discuss it confidentially."
          />

          <div className="mt-10 grid gap-4">
            {FAQS.map((f, idx) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5"
                open={idx === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <div className="text-base font-semibold tracking-tight text-white">{f.q}</div>
                  <ChevronDown className="h-5 w-5 text-white/70 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-white/10">
        <Container className="py-16 sm:py-20">
          <SectionTitle
            eyebrow="Contact"
            title="A confidential discussion is the fastest way to see if we’re a fit."
            subtitle="Tell us what’s happening — we’ll respond with clear next steps."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card>
                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                        Name
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/25"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/25"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                      Company
                    </label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/25"
                      placeholder="Organisation"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                      What do you need help with?
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-2 min-h-[140px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/25"
                      placeholder="Briefly describe the situation, desired outcomes, and any deadlines."
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                        Interest
                      </label>
                      <select
                        value={tier}
                        onChange={(e) => setTier(e.target.value)}
                        className="mt-2 w-full appearance-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-white/25"
                      >
                        {TIERS.map((t) => (
                          <option key={t.name} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs uppercase tracking-[0.28em] text-white/55">
                        Indicative estimate
                      </div>
                      <div className="mt-2 text-lg font-semibold tracking-tight">
                        {formatMoney(estimatedMonthly)}
                        <span className="text-sm font-medium text-white/55"> / month</span>
                      </div>
                      <div className="mt-1 text-xs text-white/55">Refined after discovery.</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    Send confidential enquiry <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="text-xs leading-relaxed text-white/45">
                    This opens an email draft to <span className="text-white/70">hello@ctoservices.co.uk</span>.
                    Replace with your preferred address or wire to your backend API.
                  </div>
                </form>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card className="h-full">
                <div className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                  Direct contact
                </div>
                <div className="mt-3 text-xl font-semibold tracking-tight">Discreet. Fast. Professional.</div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Prefer a direct call or email? Use the details below — or book a slot.
                </p>

                <div className="mt-6 grid gap-3">
                  <a
                    href="mailto:hello@ctoservices.co.uk"
                    className="inline-flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4" /> hello@ctoservices.co.uk
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Replace this with your Calendly / booking link.");
                    }}
                    className="inline-flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Book a time
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <a
                    href="tel:+440000000000"
                    className="inline-flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" /> +44 07967656987
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">Promise</div>
                  <div className="mt-3 text-sm leading-relaxed text-white/70">
                    We will tell you quickly if we’re the wrong fit — and we’ll suggest a better route.
                    No pressure, no fluff.
                  </div>
                </div>

                <div className="mt-6 text-xs uppercase tracking-[0.28em] text-white/45">
                  © {new Date().getFullYear()} CTO Services. All rights reserved.
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <Container className="py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/70">
              <span className="font-semibold text-white">CTO Services</span> — executive technology leadership, on demand.
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {[
                ["Services", "#services"],
                ["How it works", "#how"],
                ["Pricing", "#pricing"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="text-white/65 transition hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </footer>

      {/* Mobile floating CTA */}
      <div className="fixed bottom-4 left-0 right-0 z-50 sm:hidden">
        <Container>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg"
          >
            Book a confidential discussion <ArrowRight className="h-4 w-4" />
          </a>
        </Container>
      </div>
    </div>
  );
}
