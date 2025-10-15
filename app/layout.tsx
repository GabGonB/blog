import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Blog',
  description: 'Um blog desenvolvido com Next.js e App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header style={{ padding: 20, borderBottom: '1px solid #eee' }}>
          <h1>Meu Blog</h1>
        </header>
        <main style={{ padding: 20 }}>{children}</main>
        <footer style={{ padding: 20, borderTop: '1px solid #eee' }}>
          © {new Date().getFullYear()} - Meu Blog
        </footer>
      </body>
    </html>
  );
}
