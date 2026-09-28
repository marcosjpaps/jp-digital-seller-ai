'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Zap, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Database,
  KeyRound,
  Check,
  UserCheck
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';
import { store, DEFAULT_USER } from '@/lib/store';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register' | 'recovery'>('login');
  const [email, setEmail] = useState('marcos220896antonio@gmail.com');
  const [password, setPassword] = useState('MAR9115COS');
  const [name, setName] = useState('Marcos Antonio');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);

  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    // If user is already logged in, show current session
    const current = store.getCurrentUser();
    if (current && current.email) {
      setEmail(current.email);
      if (current.password) setPassword(current.password);
      if (current.name) setName(current.name);
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    if (supabaseReady) {
      try {
        if (mode === 'login') {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          store.setCurrentUser({
            id: 'sb-' + Date.now(),
            email,
            name: name || 'Marcos Antonio',
            role: 'admin',
            created_at: new Date().toISOString()
          });
          setStatusMessage({ text: 'Login efetuado com sucesso via Supabase!', type: 'success' });
          setTimeout(() => router.push('/'), 800);
        } else if (mode === 'register') {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } }
          });
          if (error) throw error;
          store.setCurrentUser({
            id: 'sb-' + Date.now(),
            email,
            name: name || 'Marcos Antonio',
            role: 'admin',
            created_at: new Date().toISOString()
          });
          setStatusMessage({ text: 'Conta criada com sucesso no Supabase!', type: 'success' });
          setTimeout(() => router.push('/'), 800);
        } else {
          const { error } = await supabase.auth.resetPasswordForEmail(email);
          if (error) throw error;
          setStatusMessage({ text: 'E-mail de recuperação de senha enviado!', type: 'success' });
        }
      } catch (err: any) {
        setStatusMessage({ text: err.message || 'Erro na autenticação.', type: 'error' });
      } finally {
        setLoading(false);
      }
    } else {
      // Local Database Auth
      setTimeout(() => {
        setLoading(false);
        if (mode === 'login') {
          const res = store.loginUser(email, password);
          if (res.error) {
            setStatusMessage({ text: res.error, type: 'error' });
            return;
          }
          setStatusMessage({ text: `Bem-vindo de volta, ${res.user?.name}! Acesso liberado.`, type: 'success' });
          setTimeout(() => router.push('/'), 700);
        } else if (mode === 'register') {
          const res = store.registerUser(email, password, name);
          if (res.error) {
            setStatusMessage({ text: res.error, type: 'error' });
            return;
          }
          setStatusMessage({ text: `Usuário ${res.user?.name} cadastrado com sucesso!`, type: 'success' });
          setTimeout(() => router.push('/'), 700);
        } else {
          setStatusMessage({ text: 'Instruções de recuperação simuladas enviadas para seu e-mail.', type: 'success' });
        }
      }, 400);
    }
  };

  const handleFillMarcos = () => {
    setEmail('marcos220896antonio@gmail.com');
    setPassword('MAR9115COS');
    setName('Marcos Antonio');
    setMode('login');
    setStatusMessage({ text: 'Credenciais de Marcos Antonio preenchidas!', type: 'success' });
  };

  const handleQuickLoginMarcos = () => {
    store.loginUser('marcos220896antonio@gmail.com', 'MAR9115COS');
    setStatusMessage({ text: 'Acesso VIP Concedido para Marcos Antonio! Redirecionando...', type: 'success' });
    setTimeout(() => router.push('/'), 500);
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-10 pb-16 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-accent/25">
          <Zap className="w-6 h-6 text-navy-950 fill-navy-950 font-black" />
        </div>
        <h1 className="text-2xl font-black text-white">
          JP DIGITAL <span className="text-accent">SELLER AI</span>
        </h1>
        <p className="text-xs text-gray-400">
          Acesse seu painel pessoal de vendas de sites locais
        </p>
      </div>

      {/* Conta Padrão Criada para Marcos */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-900 to-navy-950 border border-accent/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black text-white uppercase tracking-wider">Conta Criada & Pronta</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-accent/20 text-accent uppercase">
            Admin VIP
          </span>
        </div>

        <div className="text-xs space-y-1 bg-navy-950/80 p-3 rounded-xl border border-navy-800 font-mono">
          <div className="text-gray-300 truncate">
            <span className="text-gray-500 font-sans">E-mail: </span>
            <strong className="text-accent">marcos220896antonio@gmail.com</strong>
          </div>
          <div className="text-gray-300">
            <span className="text-gray-500 font-sans">Senha: </span>
            <strong className="text-white">MAR9115COS</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleFillMarcos}
            className="py-2 px-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-gray-200 font-bold text-[11px] transition-colors"
          >
            Preencher Campos
          </button>
          <button
            type="button"
            onClick={handleQuickLoginMarcos}
            className="py-2 px-3 rounded-xl bg-accent hover:brightness-110 text-navy-950 font-black text-[11px] uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            Entrar em 1 Clique
          </button>
        </div>
      </div>

      {/* Auth Card */}
      <div className="bg-navy-900/90 rounded-3xl border border-navy-800 p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Mode Toggle */}
        <div className="flex border-b border-navy-800 pb-3 gap-4 text-xs font-bold">
          <button
            onClick={() => setMode('login')}
            className={`pb-1 transition-colors ${
              mode === 'login' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setMode('register')}
            className={`pb-1 transition-colors ${
              mode === 'register' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            Criar Nova Conta
          </button>
          <button
            onClick={() => setMode('recovery')}
            className={`pb-1 transition-colors ${
              mode === 'recovery' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            Recuperar Senha
          </button>
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
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-accent" />
                <span>Seu Nome Completo:</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Marcos Antonio"
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                required={mode === 'register'}
              />
            </div>
          )}

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
              className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent font-mono"
              required
            />
          </div>

          {mode !== 'recovery' && (
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
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent font-mono"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-accent to-blue-600 text-navy-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {mode === 'login' ? 'Entrar com Minha Conta' : mode === 'register' ? 'Criar Cadastro Agora' : 'Enviar E-mail de Recuperação'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
