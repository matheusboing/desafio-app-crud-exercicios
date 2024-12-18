import "./globals.css";

export const metadata = {
  title: "Simple Exercise App",
  description: "simple Exercise app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <body>{children}</body>
    </html>
  );
}
