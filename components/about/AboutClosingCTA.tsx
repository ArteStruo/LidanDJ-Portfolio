import Link from "next/link";

export default function AboutClosingCTA() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-[#ff0055]">
          Ready To Experience The Journey?
        </p>

        <h3 className="mt-5 text-4xl font-light md:text-6xl">
          Book LIDAN For Your Next Event
        </h3>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-[#ff0055] px-8 py-4 font-medium uppercase tracking-[0.2em] transition duration-300 hover:scale-[1.02] hover:bg-[#ff1a66]"
          >
            Book Now
          </Link>

          <Link
            href="/music"
            className="rounded-full border border-white/20 px-8 py-4 font-medium uppercase tracking-[0.2em] transition duration-300 hover:border-[#ff0055]/50 hover:text-[#ff0055]"
          >
            Listen Sets
          </Link>
        </div>
      </div>
    </section>
  );
}