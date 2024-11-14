import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thavyra"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased box-border bg-dark-850 text-light">

        <div className="w-full md:container xl:max-w-7xl mx-auto">
          {children}
        </div>

      </body>
    </html>
  );
}
