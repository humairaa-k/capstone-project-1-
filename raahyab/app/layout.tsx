import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import { SavedProvider } from "@/context/SavedContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.vercel.app"), 

  title: {
    default: "RaahYab — Find Jobs, Internships & Scholarships in Afghanistan",
    template: "%s | RaahYab",
  },

  description:
    "RaahYab helps Afghan youth discover jobs, internships, scholarships, remote work, and training opportunities — all in one clean, searchable platform.",

  keywords: [
    "Afghanistan jobs",
    "internships Afghanistan",
    "scholarships Afghanistan",
    "remote work Afghanistan",
    "Afghan youth opportunities",
    "RaahYab",
    "Kabul jobs",
    "Job Opportunites Afghanistan",
    "Afghanistan career platform",
  ],

  authors: [{ name: "Humaira Hotaki" }],
  creator: "RaahYab",
  publisher: "RaahYab",

  openGraph: {
    title: "RaahYab — Find Jobs, Internships & Scholarships in Afghanistan",
    description:
      "Discover real opportunities for Afghan youth — jobs, internships, scholarships, and remote work, all in one place.",
    url: "https://raahyab.ex.app",
    siteName: "RaahYab",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "RaahYab — Find Jobs, Internships & Scholarships.",
      },
    ],
    locale: "en_US",
    alternateLocale: ["fa_AF", "ps_AF"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RaahYab — Find Jobs, Internships & Scholarships in Afghanistan",
    description:
      "Discover real opportunities for Afghan youth — jobs, internships, scholarships, and remote work, all in one place.",
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <body className="min-h-full flex flex-col">

       <ThemeProvider>
        <SavedProvider>
        <Navbar/>
        <main className="min-h-screen">
          {children}
          <Toaster position="top-right" richColors offset={80}/>
          </main>
        </SavedProvider>
        </ThemeProvider>
        <Footer/>

      </body>
    </html>
  );
}
