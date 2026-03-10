import "@/styles/reset.css";
import "@/styles/globals.css";
import { Manrope, Space_Grotesk } from "next/font/google";
import Providers from "./providers";
import site from "@/settings/site";
import BackToTop from "@/components/BackToTop/BackToTop";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata = {
  title: site.name,
  description: site.description,
};

export default async function RootLayout({ children }) {
  return (
    <html className={`${manrope.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
