export default function AvailabilityBand() {
  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Availability</p>
            <p className="mt-1 text-sm text-white/70">
              Taking on <span className="text-white">1–2 retained engagements</span> per quarter.
            </p>
          </div>

          <a
            href="https://calendly.com/matt-mcevoy-ctoservices"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Check fit &amp; book a call
          </a>
        </div>
      </div>
    </section>
  );
}
