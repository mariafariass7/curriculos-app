import type { ReactNode } from 'react';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const metadata = {
  title: 'Currículos App',
  description: 'Sistema de gestão de currículos',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}