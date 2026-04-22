export default function IdentityDivider() {
  return (
    <div className="hidden items-center justify-center px-6 lg:flex">
      <div className="relative h-[400px] w-px bg-gradient-to-b from-transparent via-[#ff0055] to-transparent">
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff0055] shadow-[0_0_30px_#ff0055]" />
      </div>
    </div>
  );
}
