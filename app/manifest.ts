import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "so smol, so cute",
    short_name: "so smol, so cute",
    description:
      "For all kitten lovers, it's your daily dose of cuteness and joy. 🐾✨",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      { src: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
