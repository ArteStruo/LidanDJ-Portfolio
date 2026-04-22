"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/admin/me", { cache: "no-store" });

      if (response.ok) {
        router.replace("/admin/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      setError("Invalid credentials");
      return;
    }

    router.replace("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#111] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <p className="text-sm uppercase tracking-[3px] text-[#ff4d79]">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold">Admin Panel</h1>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#d1d5dc]">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="bg-[#0b0b0b] border-white/15 text-white focus-visible:ring-[rgba(255,0,63,0.35)]"
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#d1d5dc]">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="bg-[#0b0b0b] border-white/15 text-white focus-visible:ring-[rgba(255,0,63,0.35)] pr-10"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error ? <p className="text-sm text-[#ff7aa0]">{error}</p> : null}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff003f] hover:bg-[#ff1a56] text-white"
          >
            {isLoading ? "Signing in..." : "Log In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
