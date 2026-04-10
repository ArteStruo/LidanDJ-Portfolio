export type GalleryPhotoItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type GalleryVideoItem = {
  thumbnail: string;
  title: string;
  subtitle: string;
  duration: string;
  embedUrl: string;
  large?: boolean;
};

export type GalleryMediaConfig = {
  heroVideo: GalleryVideoItem;
  rowTwoPhotos: GalleryPhotoItem[];
  rowThree: {
    tallPhoto: GalleryPhotoItem;
    secondaryVideo: GalleryVideoItem;
  };
  rowFourPhotos: GalleryPhotoItem[];
  rowFive: {
    widePhoto: GalleryPhotoItem;
    topRightPhoto: GalleryPhotoItem;
    bottomRightPhoto: GalleryPhotoItem;
  };
};

export const galleryMedia: GalleryMediaConfig = {
  heroVideo: {
    thumbnail: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=1080&auto=format&fit=crop&q=80",
    title: "DJ Lidan — Live at Kulture Warehouse, Colombo",
    subtitle: "Progressive House · Sri Lanka · Feb 2026",
    duration: "1:42:30",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    large: true,
  },
  rowTwoPhotos: [
    {
      src: "https://images.unsplash.com/photo-1768885512764-3ebafdf20402?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMHBlcmZvcm1hbmNlJTIwbmlnaHRjbHViJTIwZGFyayUyMHN0YWdlfGVufDF8fHx8MTc3NTgxMzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "DJ Lidan performing live — nightclub Colombo Sri Lanka",
      caption: "Stage · Colombo",
    },
    {
      src: "https://images.unsplash.com/photo-1624929303661-22c5bce0169b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBmZXN0aXZhbCUyMGNyb3dkJTIwbGlnaHRzfGVufDF8fHx8MTc3NTgxMzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Electronic music festival crowd in Sri Lanka",
      caption: "Festival Crowd",
    },
    {
      src: "https://images.unsplash.com/photo-1578251955495-a8060f2b9cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMHR1cm50YWJsZSUyMG1peGVyJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzU4MTM0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "DJ Lidan's turntable mixer setup",
      caption: "The Decks",
    },
  ],
  rowThree: {
    tallPhoto: {
      src: "https://images.unsplash.com/photo-1761431246385-abb584084ce1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXZlJTIwdW5kZXJncm91bmQlMjBwYXJ0eSUyMGRhcmslMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc3NTgxMzQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Underground rave party dark atmosphere — Sri Lanka electronic music",
      caption: "Underground · Colombo",
    },
    secondaryVideo: {
      thumbnail: "https://images.unsplash.com/photo-1540039155732-684734e5d590?w=1080&auto=format&fit=crop&q=80",
      title: "Marathon Set — 12 Hours Underground",
      subtitle: "Electronic Music · Colombo · Mar 2026",
      duration: "12:00:00",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  rowFourPhotos: [
    {
      src: "https://images.unsplash.com/photo-1773274157508-ddbf6074aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsYXNlciUyMGxpZ2h0cyUyMG5pZ2h0fGVufDF8fHx8MTc3NTgxMzQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Concert stage laser lights at DJ Lidan set Sri Lanka",
      caption: "Lasers · Galle",
    },
    {
      src: "https://images.unsplash.com/photo-1656231267321-282e40e05d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwaGVhZHBob25lcyUyMHN0dWRpbyUyMGRhcmt8ZW58MXx8fHwxNzc1ODEzNDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Music producer DJ Lidan headphones studio Colombo",
      caption: "Studio Sessions",
    },
    {
      src: "https://images.unsplash.com/photo-1768885514740-d64d25ac9a64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGNsdWIlMjBkYW5jZSUyMGZsb29yJTIwZGFyayUyMG5lb258ZW58MXx8fHwxNzc1ODEzNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Nightclub dance floor neon lights electronic music",
      caption: "Dance Floor",
    },
    {
      src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1080&auto=format&fit=crop&q=80",
      alt: "DJ Lidan equipment setup — electronic music DJ Colombo",
      caption: "The Setup",
    },
  ],
  rowFive: {
    widePhoto: {
      src: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=1080&auto=format&fit=crop&q=80",
      alt: "DJ Lidan — progressive electronic music DJ Sri Lanka official photo",
      caption: "DJ Lidan · Official",
    },
    topRightPhoto: {
      src: "https://images.unsplash.com/photo-1540039155732-684734e5d590?w=1080&auto=format&fit=crop&q=80",
      alt: "Crowd at DJ Lidan event — electronic music Sri Lanka",
      caption: "Crowd Energy",
    },
    bottomRightPhoto: {
      src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1080&auto=format&fit=crop&q=80",
      alt: "DJ mixer gear — DJ Lidan Colombo Sri Lanka",
      caption: "Gear · Studio",
    },
  },
};
