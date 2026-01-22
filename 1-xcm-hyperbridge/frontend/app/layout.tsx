import "./globals.css";

export const metadata = {
  title: "Polkadot Bridge",
  description: "Giao diện kết nối ví Metamask",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
