export default function LuxuryCta() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        href="https://calendly.com/matt-mcevoy-ctoservices?hide_event_type_details=1&hide_gdpr_banner=1"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-black/20 transition hover:bg-white"
      >
        Book a confidential consultation
      </a>

      <a
        href="#contact"
        className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
      >
        Send a confidential enquiry
      </a>

      <span className="text-xs text-white/55 sm:ml-2">
        Private, NDA-ready. Response within 1 business day.
      </span>
    </div>
  );
}

