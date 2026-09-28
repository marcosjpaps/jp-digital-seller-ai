'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Building2, 
  BarChart3, 
  Sparkles, 
  Send, 
  FileText, 
  Users2, 
  LayoutTemplate, 
  PlusCircle, 
  Zap,
  Menu,
  X,
  LogOut,
  MapPin,
  ShieldCheck,
  FolderKanban,
  Settings,
  Lock,
  LogIn,
  Compass
} from 'lucide-react';
import { store } from '@/lib/store';
import { AuthUser } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('João Pinheiro - MG');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const s = store.getSettings();
      if (s?.agency?.city) {
        setCurrentCity(s.agency.city);
      }
      const u = store.getCurrentUser();
      setCurrentUser(u || null);
    } catch {}
  }, [pathname]);

  const handleLogout = () => {
    store.logout();
    setCurrentUser(null);
    router.push('/auth');
  };

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: BarChart3 },
    { href: '/radar-maps', label: 'Radar Maps', icon: Compass, badge: 'MAPS' },
    { href: '/empresas', label: 'Empresas', icon: Building2 },
    { href: '/analista-ia', label: 'Analista IA', icon: Sparkles, badge: 'IA' },
    { href: '/conceito-site', label: 'Conceito', icon: Zap },
    { href: '/sites-salvos', label: 'Sites Salvos', icon: FolderKanban },
    { href: '/mensagens-venda', label: 'Mensagens', icon: Send },
    { href: '/propostas', label: 'Propostas', icon: FileText },
    { href: '/crm', label: 'CRM', icon: Users2 },
    { href: '/modelos', label: 'Modelos', icon: LayoutTemplate },
    { href: '/configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy-950/85 backdrop-blur-md border-b border-navy-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & City Badge */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-blue-600 flex items-center justify-center shadow-lg shadow-accent/25 group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-5 h-5 text-navy-950 fill-navy-950 font-black" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-white text-lg tracking-tight">JP DIGITAL</span>
                  <span className="text-accent font-extrabold text-lg">SELLER AI</span>
                </div>
                <div className="flex items-center text-[11px] text-gray-400 font-medium space-x-1">
                  <MapPin className="w-3 h-3 text-accent" />
                  <span>{currentCity}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 relative ${
                    isActive
                      ? 'bg-accent/15 text-accent border border-accent/30 shadow-sm shadow-accent/10'
                      : 'text-gray-300 hover:text-white hover:bg-navy-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-1.5 ${isActive ? 'text-accent' : 'text-gray-400'}`} />
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-gradient-to-r from-accent to-blue-500 text-navy-950 text-[10px] font-black rounded-full animate-pulse-subtle">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Action & User */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/empresas/novo"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-accent to-blue-600 text-navy-950 font-bold text-xs shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-navy-950 font-black" />
              <span>Nova Empresa</span>
            </Link>

            <Link
              href="/configuracoes"
              className={`p-2 rounded-lg border transition-colors ${
                pathname === '/configuracoes'
                  ? 'bg-accent/20 border-accent text-accent'
                  : 'border-navy-700 bg-navy-900 text-gray-300 hover:text-white hover:border-accent/40'
              }`}
              title="Configurações do Sistema"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div
                  className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border border-navy-700 bg-navy-900 text-gray-200 text-xs font-medium"
                  title={`Conectado como ${currentUser.name}`}
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-[10px] font-black text-accent uppercase">
                    {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'US'}
                  </div>
                  <div className="hidden lg:flex flex-col text-left leading-none">
                    <span className="text-xs font-bold text-white truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[9px] text-accent font-semibold pt-0.5">Admin</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 rounded-lg border border-navy-700 bg-navy-900 text-gray-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                  title="Sair da Conta (Logout)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-gray-200 hover:text-white text-xs font-bold border border-navy-700 hover:border-accent/50 transition-colors shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-accent" />
                <span>Entrar</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/empresas/novo"
              className="p-2 rounded-lg bg-accent text-navy-950 font-bold"
              title="Nova Empresa"
            >
              <PlusCircle className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-navy-800 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950/95 border-b border-navy-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-accent/20 text-accent font-bold'
                    : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-accent" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-accent text-navy-950 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-navy-800 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-gray-300 font-medium truncate">
                  {currentUser.name}
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center space-x-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-xs text-accent hover:underline font-bold"
              >
                <Lock className="w-4 h-4" />
                <span>Fazer Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
