export default function AboutClosingCTA() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
        <p className="tracking-[0.35em] text-[#ff0055] text-sm uppercase">
          Ready To Experience The Journey?
        </p>

        <h3 className="mt-5 text-4xl font-light md:text-6xl">
          Book LIDAN For Your Next Event
        </h3>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-full bg-[#ff0055] px-8 py-4 font-medium uppercase tracking-[0.2em]">
            Book Now
          </button>
          <button className="rounded-full border border-white/20 px-8 py-4 font-medium uppercase tracking-[0.2em]">
            Listen Sets
          </button>
        </div>
      </div>
    </section>
  );
}
