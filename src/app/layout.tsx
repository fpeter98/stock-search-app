import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className="bg-[url('../../public/stock-background.jpg')] bg-cover">{children}</body>
      </html>
  );
}
