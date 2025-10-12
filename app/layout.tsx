import React from 'react';
import './globals.css';

export const metadata = {
    title: 'Meu Blog',
    description: 'Um blog demo com Next.js App Router e SEO dinâmico'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body>
                <header style={{ padding: 20, borderBottom: '1px solid #eee' }}>
                    <h1>Meu Blog</h1>
                </header>
                <main style={{ padding: 20 }}>{children}</main>
                <footer style={{ padding: 20, borderTop: '1px solid #eee' }}>© {new Date().getFullYear()}</footer>
            </body>
        </html>
    );
}