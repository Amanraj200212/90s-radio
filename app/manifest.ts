import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "90s Something — Internet Radio",
    short_name: "90s Something",
    description: "A little radio for long drives and late nights.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
