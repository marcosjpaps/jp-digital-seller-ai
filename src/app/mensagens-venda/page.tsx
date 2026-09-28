'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Send, 
  Sparkles, 
  MessageSquare, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  ArrowRight, 
  RefreshCw,
  CheckCircle2,
  Users2
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { store } from '@/lib/store';
import { AIService } from '@/lib/aiService';
import { Company, SalesMessages } from '@/types';

function MensagensVendaContent() {
  const searchParams = useSearchParams();
  const companyIdParam = searchParams.get('companyId');

  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [messages, setMessages] = useState<SalesMessages | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'instagram' | 'email'>('whatsapp');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [markedContacted, setMarkedContacted] = useState(false);

  useEffect(() => {
    const list = store.getCompanies();
    setCompanies(list);

    if (list.length > 0) {
      const targetId = (companyIdParam && list.some(c => c.id === companyIdParam))
        ? companyIdParam
        : list[0].id;
      
      setSelectedCompanyId(targetId);
      const existing = store.getSalesMessages(targetId);
      if (existing) {
        setMessages(existing);
      } else {
        handleGenerateMessages(targetId);
      }
    }
  }, [companyIdParam]);

  const handleGenerateMessages = async (cId?: string) => {
    const targetId = cId || selectedCompanyId;
    const company = companies.find(c => c.id === targetId) || store.getCompanyById(targetId);
    if (!company) return;

    setLoading(true);
    try {
      const analysis = store.getAnalysis(targetId) || undefined;
      const result = await AIService.generateSalesMessages(company, analysis);
      store.saveSalesMessages(result);
      setMessages(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const currentCompany = companies.find(c => c.id === selectedCompanyId);

  const handleMarkContacted = () => {
    if (selectedCompanyId) {
      store.updateCRMStage(selectedCompanyId, 'CONTATO_REALIZADO', 'Mensagem enviada com abordagem personalizada.');
      setMarkedContacted(true);
      setTimeout(() => setMarkedContacted(false), 3000);
    }
  };

  const cleanPhone = currentCompany?.whatsapp?.replace(/\D/g, '') || '';
  const waEncoded = messages ? encodeURIComponent(messages.whatsapp) : '';
  const waUrl = cleanPhone 
    ? `https://api.whatsapp.com/send?phone=55${cleanPhone}&text=${waEncoded}`
    : `https://api.whatsapp.com/send?text=${waEncoded}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900/80 p-6 rounded-3xl border border-navy-800">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-accent mb-1">
            <Send className="w-4 h-4 text-emerald-400" />
            <span>AGENTE: SALES AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Gerador de Mensagens de Alta Conversão
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Copies ultra-personalizadas para quebrar o gelo e agendar apresentações de sites locais.
          </p>
        </div>

        {/* Company Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:w-64">
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
              Selecionar Empresa:
            </label>
            <select
              value={selectedCompanyId}
              onChange={(e) => {
                const newId = e.target.value;
                setSelectedCompanyId(newId);
                const existing = store.getSalesMessages(newId);
                if (existing) setMessages(existing);
                else handleGenerateMessages(newId);
              }}
              className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.segment})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleGenerateMessages()}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 mt-auto rounded-xl bg-accent text-navy-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Criando...' : 'Regerar Textos'}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-4 bg-navy-900/40 rounded-3xl border border-navy-800">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mx-auto" />
          <div className="text-base font-bold text-white">SALES AI redigindo as abordagens persuasivas...</div>
          <div className="text-xs text-gray-400 max-w-md mx-auto">
            Combinando o diagnóstico do problema de {currentCompany?.name} com gatilhos de curiosidade para WhatsApp, Instagram e E-mail.
          </div>
        </div>
      ) : messages && currentCompany ? (
        <div className="space-y-6">
          
          {/* Tab Selector */}
          <div className="flex bg-navy-900/90 p-1.5 rounded-2xl border border-navy-800 max-w-md">
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-500 text-navy-950 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveTab('instagram')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'instagram'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram DM</span>
            </button>

            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'email'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>E-mail</span>
            </button>
          </div>

          {/* Active Tab Content Card */}
          <div className="bg-navy-900/90 rounded-3xl border border-navy-800 p-6 sm:p-8 space-y-6 shadow-xl">
            
            {activeTab === 'whatsapp' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-emerald-400" />
                      <span>Mensagem Consultiva para WhatsApp</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Gera curiosidade imediata e oferece a amostra do site em 1 minuto sem parecer vendedor chato.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(messages.whatsapp, 'wa')}
                      className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-xs font-bold text-gray-200 border border-navy-700 flex items-center space-x-1.5 transition-all"
                    >
                      {copiedKey === 'wa' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedKey === 'wa' ? 'Copiado!' : 'Copiar Texto'}</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Abrir no WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="bg-navy-950 p-5 rounded-2xl border border-navy-800 font-mono text-xs sm:text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {messages.whatsapp}
                </div>
              </div>
            )}

            {activeTab === 'instagram' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                      <InstagramIcon className="w-5 h-5 text-pink-400" />
                      <span>Mensagem Direta (DM) para Instagram</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Curta, amigável e descontraída, perfeita para quem cuida do perfil da loja em João Pinheiro.
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(messages.instagram, 'insta')}
                    className="px-3.5 py-2 rounded-xl bg-pink-600/20 text-pink-300 border border-pink-500/30 hover:bg-pink-600/30 text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto"
                  >
                    {copiedKey === 'insta' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedKey === 'insta' ? 'Copiado!' : 'Copiar para Direct'}</span>
                  </button>
                </div>

                <div className="bg-navy-950 p-5 rounded-2xl border border-navy-800 font-mono text-xs sm:text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {messages.instagram}
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <span>Proposta Formal via E-mail</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Ideal para diretores, clínicas, imobiliárias e empresas tradicionais que preferem comunicação corporativa.
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(`Assunto: ${messages.email.subject}\n\n${messages.email.body}`, 'email')}
                    className="px-3.5 py-2 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto"
                  >
                    {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedKey === 'email' ? 'Copiado!' : 'Copiar E-mail Completo'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="bg-navy-950 p-3 rounded-xl border border-navy-800 text-xs">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Assunto:</span>
                    <div className="text-white font-semibold mt-0.5">{messages.email.subject}</div>
                  </div>

                  <div className="bg-navy-950 p-5 rounded-2xl border border-navy-800 font-mono text-xs sm:text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {messages.email.body}
                  </div>
                </div>
              </div>
            )}

            {/* Quick CRM Update action */}
            <div className="pt-4 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-navy-950/60 p-4 rounded-2xl">
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <Users2 className="w-4 h-4 text-accent" />
                <span>Enviou a mensagem para {currentCompany.name}?</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleMarkContacted}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 text-xs font-bold transition-all flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{markedContacted ? '✓ Atualizado no CRM!' : 'Marcar como "Contato Realizado"'}</span>
                </button>

                <Link
                  href={`/propostas?companyId=${selectedCompanyId}`}
                  className="px-4 py-2 rounded-xl bg-accent text-navy-950 font-black text-xs flex items-center space-x-1 shadow hover:brightness-110"
                >
                  <span>Gerar Proposta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      ) : null}

    </div>
  );
}

export default function MensagensVendaPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-sm text-gray-400">
        Carregando Gerador de Mensagens de Venda...
      </div>
    }>
      <MensagensVendaContent />
    </Suspense>
  );
}
