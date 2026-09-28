'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  LogOut
} from 'lucide-react';
import { store } from '@/lib/store';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => store.getCurrentUser());

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setStatusMessage({ text: 'Por favor, informe o e-mail e a senha.', type: 'error' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      // 1. Try server-side authentication with Neon PostgreSQL
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() })
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        store.setCurrentUser(data.user);
        setCurrentUser(data.user);
        setStatusMessage({ 
          text: `Autenticado com sucesso! Bem-vindo, ${data.user.name}.`, 
          type: 'success' 
        });
        setTimeout(() => {
          router.push('/');
        }, 700);
        return;
      }

      // 2. Fallback to local authentication if network or offline
      const localResult = store.loginUser(email, password);
      if (localResult.user) {
        store.setCurrentUser(localResult.user);
        setCurrentUser(localResult.user);
        setStatusMessage({ 
          text: `Autenticado com sucesso! Bem-vindo, ${localResult.user.name}.`, 
          type: 'success' 
        });
        setTimeout(() => {
          router.push('/');
        }, 700);
      } else {
        setStatusMessage({ 
          text: data.error || localResult.error || 'Credenciais inválidas. Verifique e tente novamente.', 
          type: 'error' 
        });
      }
    } catch (err: any) {
      // Offline fallback
      const localResult = store.loginUser(email, password);
      if (localResult.user) {
        store.setCurrentUser(localResult.user);
        setCurrentUser(localResult.user);
        setStatusMessage({ text: 'Login realizado com sucesso!', type: 'success' });
        setTimeout(() => router.push('/'), 700);
      } else {
        setStatusMessage({ 
          text: 'Falha na autenticação. Verifique seu e-mail e senha.', 
          type: 'error' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    store.logout();
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setStatusMessage({ text: 'Você saiu da sua conta com sucesso.', type: 'success' });
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-12 pb-20 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-accent/25">
          <Zap className="w-6 h-6 text-navy-950 fill-navy-950 font-black" />
        </div>
        <h1 className="text-2xl font-black text-white">
          JP DIGITAL <span className="text-accent">SELLER AI</span>
        </h1>
        <p className="text-xs text-gray-400">
          Acesse seu painel com seu e-mail e senha cadastrados
        </p>
      </div>

      {/* If already logged in, show session info with direct actions */}
      {currentUser ? (
        <div className="bg-navy-900/90 rounded-3xl border border-navy-800 p-6 sm:p-8 space-y-5 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Você já está conectado!</h2>
            <p className="text-xs text-gray-400 mt-1">
              Logado como <strong className="text-white">{currentUser.name}</strong>
            </p>
            <p className="text-[11px] text-accent font-mono mt-0.5">{currentUser.email}</p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-accent to-blue-600 text-navy-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <span>Acessar o Painel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2.5 px-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-gray-300 font-bold text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair desta Conta</span>
            </button>
          </div>
        </div>
      ) : (
        /* Login Card */
        <div className="bg-navy-900/90 rounded-3xl border border-navy-800 p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div className="border-b border-navy-800 pb-3">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Lock className="w-4 h-4 text-accent" />
              <span>Login de Acesso</span>
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Informe suas credenciais para desbloquear o sistema
            </p>
          </div>

          {/* Feedback Alert */}
          {statusMessage && (
            <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>E-mail:</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent font-mono transition-colors"
                required
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-accent" />
                <span>Senha:</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent font-mono transition-colors"
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-accent to-blue-600 text-navy-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <span className="text-[10px] text-gray-500 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Conexão criptografada via Neon PostgreSQL SSL</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
