import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Events",
  description: "Simple events catalog"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="brand">Event Studio</div>
          <nav>
            <Link href="/">All Events</Link>
            <Link href="/events/new">Create</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
