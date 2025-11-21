import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anjit Deb Majumder — Electronics & Communication Engineer",
  description:
    "Portfolio of Anjit Deb Majumder — projects in embedded systems, frontend development, VLSI, FPGA, DSP, and creative engineering builds.",
  openGraph: {
    title: "Anjit Deb Majumder — Portfolio",
    description:
      "Explore engineering projects: embedded systems, FPGA builds, DSP work, and frontend showcases.",
    url: "https://your-vercel-url.vercel.app",
    images: [
      {
        url: "/images/sudo.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
    siteName: "Anjit Deb Majumder Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjit Deb Majumder — Portfolio",
    description:
      "Projects in embedded systems, FPGA, DSP, VLSI, and frontend development.",
    images: ["/images/sudo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
