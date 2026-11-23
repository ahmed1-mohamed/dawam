import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dawam | دوام",
    short_name: "Dawam",
    description: "Attendance & field rep tracking — نظام الحضور والانصراف وتتبع المناديب",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0c0c",
    theme_color: "#0a0c0c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
