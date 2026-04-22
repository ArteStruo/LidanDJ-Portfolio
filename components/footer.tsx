import Link from "next/link";
import {
  Phone,
  Mail,
  Disc3,
} from "lucide-react";

import { SiFacebook, SiInstagram } from '@icons-pack/react-simple-icons';


export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,85,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Disc3 className="h-4 w-4 text-[#ff0055]" />
              <p className="text-sm uppercase tracking-[0.35em] text-[#ff0055]">
                LIDAN
              </p>
            </div>

            <h3 className="mt-4 text-3xl font-light tracking-wide">
              Progressive Journeys.
              <br />
              Underground Emotion.
            </h3>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
              Crafting hypnotic underground journeys from the heart of Colombo.
              Deep, emotional, and cinematic electronic storytelling.
            </p>
          </div>

          {/* Socials */}
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              Socials
            </p>

            <div className="mt-5 space-y-4">
              <Link
                href="https://www.instagram.com/lidan.music?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                className="flex items-center gap-3 text-zinc-300 transition hover:text-[#ff0055]"
              >
                <SiInstagram className="h-4 w-4" />
                <span>Instagram</span>
              </Link>

              <Link
                href="https://www.facebook.com/share/16jzBQt4y9/?mibextid=wwXIfr"
                target="_blank"
                className="flex items-center gap-3 text-zinc-300 transition hover:text-[#ff0055]"
              >
                <SiFacebook className="h-4 w-4" />
                <span>Facebook</span>
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              Contact
            </p>

            <div className="mt-5 space-y-4">
              <a
                href="tel:+94759914018"
                className="flex items-center gap-3 text-zinc-300 transition hover:text-[#ff0055]"
              >
                <Phone className="h-4 w-4" />
                <span>+94 75 991 4018</span>
              </a>

              <a
                href="mailto:lidanmusic.02@gmail.com"
                className="flex items-center gap-3 text-zinc-300 transition hover:text-[#ff0055]"
              >
                <Mail className="h-4 w-4" />
                <span>lidanmusic.02@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 LIDAN. All rights reserved.</p>
          <p>Designed for underground experiences.</p>
        </div>
      </div>
    </footer>
  );
}