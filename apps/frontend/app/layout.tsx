import type { Metadata } from "next";
import { Dosis, Nunito } from "next/font/google";
import "./globals.css";
import EmotionRegistry from "./emotion-registry";
import ThemeProvider from "./theme-provider";
import QueryProvider from "./query-provider";

const dosis = Dosis({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dosis',
});

const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: "Monorepo - Next.js & NestJS",
  description: "Monorepo with Next.js frontend and NestJS backend",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${dosis.variable} ${nunito.variable} antialiased`}>
        <EmotionRegistry>
          <QueryProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </QueryProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
