import localFont from "next/font/local";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

const iranSans = localFont({
  src: "../assets/fonts/dana-fanum-medium.ttf",
  variable: "--font-iran-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
  // Fix for Turbopack: explicitly specify the font file
  fallback: ["Arial", "sans-serif"],
});

export const metadata = {
  title: "میکروالس | خرید مطمئن از آمازون",
  description:
    "میکروالس پلتفرم مطمئن خرید از آمازون آمریکا و امارات با ارسال سریع به ایران، پشتیبانی واقعی و تضمین اصالت کالا.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" suppressHydrationWarning className={iranSans.variable}>
      <body dir="rtl" className="font-sans">
        <main className="overflow-hidden max-md:pb-20 dark:bg-dark-bg">{children}</main>
        <Toaster dir="rtl" position="top-right" />
      </body>
    </html>
  );
}
