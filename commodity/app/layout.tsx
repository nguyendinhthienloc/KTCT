import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/navigation/SiteNav";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["vietnamese", "latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "COMMODITY. — Mọi sản phẩm đều có một câu chuyện",
  description:
    "Hành trình của một chiếc áo thun cotton qua lăng kính Kinh tế chính trị Mác – Lênin: hàng hóa, sản xuất, giá trị, tư bản và thị trường.",
};

export const viewport: Viewport = {
  themeColor: "#101010",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${inter.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-dvh bg-ink text-ivory">
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
        >
          Bỏ qua điều hướng
        </a>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
