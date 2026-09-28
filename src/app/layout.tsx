import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'JP Digital Seller AI — Vendedor Digital Inteligente para Negócios Locais',
  description: 'Encontre empresas locais em João Pinheiro e região, analise oportunidades com IA e venda sites profissionais com propostas irresistíveis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-navy-950 text-slate-100 antialiased min-h-screen flex flex-col selection:bg-accent selection:text-navy-950">
        <Navbar />
        <main className="flex-1 pb-16">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="no-print border-t border-navy-800 bg-navy-950/90 py-8 text-xs text-gray-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-white">JP DIGITAL SELLER AI</span>
              <span className="text-accent">•</span>
              <span>Primeira versão do ecossistema SITEPRO AI</span>
            </div>
            <div>
              Mercado Inicial: <strong className="text-gray-300">João Pinheiro - MG</strong> • Expandindo para todo o Brasil
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
