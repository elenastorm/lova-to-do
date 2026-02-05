import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CelebrationProvider } from "@/contexts/CelebrationContext";
import { PhotoUploadProvider } from "@/contexts/PhotoUploadContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Ту ду лист пары",
  description: "Список дел для пары — выполняйте и радуйте котика",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <CelebrationProvider>
          <PhotoUploadProvider>{children}</PhotoUploadProvider>
        </CelebrationProvider>
      </body>
    </html>
  );
}
