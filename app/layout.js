import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ConditionalFooter from "@/components/ConditionalFooter";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://yashraj.dev"),
  title: {
    default: "Yashraj Singh Pahwa",
    template: "%s · Yashraj Singh Pahwa",
  },
  description: "Building systems. Thinking deeply.",
  openGraph: {
    title: "Yashraj Singh Pahwa",
    description: "Building systems. Thinking deeply.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:text-xs focus-visible:text-bg"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Nav />
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
