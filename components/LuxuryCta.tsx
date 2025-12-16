export default function LuxuryCta() {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      <a
        href="https://calendly.com/matt-mcevoy-ctoservices"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-black/20 transition hover:bg-white"
      >
        Book a confidential consultation
      </a>

      <a
        href="#contact"
        className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
      >
        Request a call-back
      </a>

      <p className="sm:ml-2 self-center text-xs text-white/55">
        Private, NDA-ready. Response within 1 business day.
      </p>
    </div>
  );
}
