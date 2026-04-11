const stages = [
  "The Listener",
  "The Collector",
  "The Producer",
  "The Storyteller",
  "The Performer",
];

export default function TransformationBridge() {
  return (
    <section className="border-y border-white/10 bg-black px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="tracking-[0.35em] text-[#ff0055] text-sm uppercase">
          Transformation
        </p>

        <h3 className="mt-4 text-4xl font-light md:text-6xl">
          NADIL → SOUND → LIDAN
        </h3>

        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {stages.map((stage) => (
            <div
              key={stage}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-zinc-300"
            >
              {stage}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
