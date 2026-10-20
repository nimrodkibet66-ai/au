import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MathsAI Academy | Learn Maths with Confidence",
  description: "A friendly Grade 9 mathematics learning space with topic guides, practice questions, progress tracking, and an AI tutor-ready foundation.",
  applicationName: "MathsAI Academy"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
