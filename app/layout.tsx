import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AmbientAudioPlayer from "@/components/ui/AmbientAudioPlayer";

export const metadata: Metadata = {
  title: "Charcoal Tandoor Fire Grill",
  description: "An immersive fine dining journey combining 1,000°C Kishu Binchotan oak coals with Toyosu omakase artistry and three Michelin star culinary perfection.",
  keywords: ["Fine Dining", "Omakase", "Michelin Star", "Binchotan Charcoal", "Luxury Restaurant", "Japanese Fine Dining"],
  authors: [{ name: "CHARCOAL Culinary Group" }],
  icons: {
    icon: "https://charcoalbkk.com/wp-content/uploads/2026/02/cropped-favicon-Charcoal-32x32.png",
  },
  openGraph: {
    title: "Charcoal Tandoor Fire Grill",
    description: "An symphony of Binchotan charcoal and Omakase. Three Michelin Stars.",
    url: "https://charcoal-dining.com",
    siteName: "Charcoal Tandoor Fire Grill",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "CHARCOAL Michelin Star Dining Room",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#070811] text-white selection:bg-[#BA8060] selection:text-[#0E1020] antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
