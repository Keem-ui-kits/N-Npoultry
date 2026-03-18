import type { Metadata } from "next";
import "../styles/tailwind.css";
import "../styles/index.css";

import MouseSpotlight from "./components/MouseSpotlight";

export const metadata: Metadata = {
  title: "NnPoultry Palace",
  description: "Farm-fresh nutritious eggs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased overflow-x-hidden">
        <MouseSpotlight />
        {children}
      </body>
    </html>
  );
}
