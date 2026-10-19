import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { BRAND } from "@/shared/lib/brand";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} – Đặt vé máy bay giá tốt, nhanh chóng`,
    template: `%s | ${BRAND.name}`,
  },
  description: `${BRAND.name} – So sánh giá vé máy bay từ hơn 500 hãng hàng không trong nước và quốc tế. Đặt vé nhanh chóng, thanh toán an toàn, hỗ trợ 24/7.`,
  applicationName: BRAND.name,
  keywords: [
    'vé máy bay',
    'đặt vé máy bay',
    'vé máy bay giá rẻ',
    'flight booking',
    BRAND.name,
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", notoSans.variable, playfairDisplayHeading.variable)}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
