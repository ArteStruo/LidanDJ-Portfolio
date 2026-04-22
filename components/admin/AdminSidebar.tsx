import { CalendarDays, LogOut, Music2 } from "lucide-react";

type AdminSection = "music" | "events";

type AdminSidebarProps = {
  section: AdminSection;
  onSectionChange: (next: AdminSection) => void;
  onLogout: () => void;
};

export function AdminSidebar({ section, onSectionChange, onLogout }: AdminSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] border-r border-white/10 bg-[#111] p-5 flex flex-col">
      <h1 className="text-xl tracking-wide uppercase" style={{ fontFamily: "var(--font-geist-sans)" }}>
        Admin Panel
      </h1>

      <div className="mt-8 space-y-2">
        <button
          type="button"
          onClick={() => onSectionChange("music")}
          className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
            section === "music"
              ? "border-[rgba(255,0,63,0.45)] bg-[rgba(255,0,63,0.14)] text-[#ff4d79]"
              : "border-transparent text-[#d1d5dc] hover:border-white/10 hover:bg-white/5"
          }`}
        >
          <Music2 className="size-4" />
          <span className="font-medium">Music</span>
        </button>

        <button
          type="button"
          onClick={() => onSectionChange("events")}
          className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
            section === "events"
              ? "border-[rgba(255,0,63,0.45)] bg-[rgba(255,0,63,0.14)] text-[#ff4d79]"
              : "border-transparent text-[#d1d5dc] hover:border-white/10 hover:bg-white/5"
          }`}
        >
          <CalendarDays className="size-4" />
          <span className="font-medium">Events</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="mt-auto w-full flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-[#d1d5dc] hover:bg-white/5"
      >
        <LogOut className="size-4" />
        Logout
      </button>
    </aside>
  );
}
