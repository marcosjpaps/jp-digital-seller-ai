'use client';

import React from 'react';
import { Proposal, Company } from '@/types';
import { 
  Printer, 
  Download, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  ArrowRight,
  Zap,
  Building2,
  PhoneCall,
  CreditCard
} from 'lucide-react';
import { store } from '@/lib/store';

interface ProposalViewProps {
  proposal: Proposal;
  company?: Company;
}

export default function ProposalView({ proposal, company }: ProposalViewProps) {
  const handlePrint = () => {
    window.print();
  };

  const settings = store.getSettings();

  return (
    <div className="space-y-6">
      {/* Action Bar (hidden in print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-navy-900 border border-navy-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Proposta Comercial Pronta para Envio</span>
          </h3>
          <p className="text-xs text-gray-400">
            Exportável em PDF de alta qualidade para enviar pelo WhatsApp ou E-mail.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent text-navy-950 font-black text-xs shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>EXPORTAR PDF / IMPRIMIR</span>
          </button>
        </div>
      </div>

      {/* Printable Document Sheet */}
      <div 
        className="proposal-document bg-white text-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 max-w-4xl mx-auto space-y-10"
        style={{
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        
        {/* Header / Capa */}
        <div className="border-b-2 border-slate-100 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-navy-950 flex items-center justify-center text-accent font-black text-xs">
                JP
              </div>
              <span className="font-extrabold text-navy-950 tracking-tight text-sm uppercase">
                {settings.agency?.name || 'JP DIGITAL SELLER AI'}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">• {settings.agency?.city || 'João Pinheiro - MG'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {proposal.cover_title}
            </h1>
            <p className="text-slate-600 text-sm mt-1 font-medium">
              {proposal.cover_subtitle}
            </p>
          </div>

          <div className="sm:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cliente</div>
            <div className="text-base font-extrabold text-slate-900">{proposal.company_name}</div>
            <div className="text-xs text-slate-500 mt-1">
              Data: {new Date(proposal.created_at).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>

        {/* 1 — Análise Atual & Diagnóstico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 text-navy-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span>1. Análise Atual</span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {proposal.current_analysis}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-100">
            <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-rose-600" />
              <span>2. O Problema Identificado</span>
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              {proposal.problem_diagnosed}
            </p>
          </div>
        </div>

        {/* 3 — A Solução Recomendada */}
        <div className="p-6 rounded-2xl bg-cyan-50/60 border border-cyan-100">
          <div className="flex items-center space-x-2 text-cyan-950 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            <span>3. Solução Proposta</span>
          </div>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
            {proposal.recommended_solution}
          </p>
        </div>

        {/* 4 — O Que Será Entregue */}
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-accent" />
            <span>4. Escopo: O Que Será Entregue</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {proposal.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-700 font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 — Prazo de Execução */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center space-x-3">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <div className="text-xs font-bold text-amber-900 uppercase">5. Prazo de Entrega Estimado</div>
            <div className="text-xs text-amber-800 font-medium">{proposal.timeline}</div>
          </div>
        </div>

        {/* 6 — Investimento & Planos */}
        <div>
          <div className="text-center max-w-md mx-auto mb-6">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">
              6. Opções de Investimento
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Escolha o formato que melhor atende à ambição e momento de {proposal.company_name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {proposal.tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl flex flex-col justify-between relative transition-all ${
                  tier.popular
                    ? 'bg-navy-950 text-white shadow-xl ring-2 ring-accent'
                    : 'bg-slate-50 text-slate-800 border border-slate-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-accent text-navy-950 text-[10px] font-black uppercase tracking-wider rounded-full shadow">
                    Mais Recomendado
                  </div>
                )}

                <div>
                  <h4 className={`font-black text-sm mb-1 ${tier.popular ? 'text-white' : 'text-slate-900'}`}>
                    {tier.name}
                  </h4>
                  <div className={`text-2xl font-black mb-4 ${tier.popular ? 'text-accent' : 'text-slate-900'}`}>
                    {tier.price}
                  </div>

                  <ul className="space-y-2 mb-6 text-xs">
                    {tier.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start space-x-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                            tier.popular ? 'text-accent' : 'text-emerald-600'
                          }`}
                        />
                        <span className={tier.popular ? 'text-slate-200' : 'text-slate-600'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`py-2 text-center text-xs font-bold rounded-xl ${
                    tier.popular
                      ? 'bg-accent text-navy-950 shadow'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  Plano Selecionável
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Condições de Pagamento & Suporte */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-xs uppercase mb-1">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Condições de Pagamento</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {settings.proposal?.payment_terms || '50% de entrada + 50% na aprovação final (ou em até 12x no cartão)'}
            </p>
            {settings.agency?.pix_key && (
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                Chave Pix: {settings.agency.pix_key}
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-xs uppercase mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Garantia & Manutenção</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {settings.proposal?.maintenance_price || 'R$ 97,00/mês para hospedagem ultra-rápida, certificado SSL e suporte contínuo.'}
            </p>
            <div className="text-[11px] text-emerald-700 font-bold mt-1">
              Garantia incondicional de {settings.proposal?.guarantee_days || 30} dias de assistência técnica.
            </div>
          </div>
        </div>

        {/* 7 — Próximos Passos */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <ArrowRight className="w-4 h-4 text-accent" />
            <span>7. Próximos Passos para Início</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
            {proposal.next_steps.map((step, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Assinatura / Rodapé */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <div className="font-bold text-slate-800">{settings.agency?.name || 'JP DIGITAL SELLER AI'} • Vendas Digitais</div>
            <div>Consultor: {settings.agency?.seller_name || 'Especialista em Vendas'} • {settings.agency?.whatsapp}</div>
          </div>
          <div className="text-center sm:text-right">
            <div className="font-semibold text-slate-700">Validade desta proposta: 15 dias</div>
            <div className="text-accent font-bold">{settings.agency?.city || 'João Pinheiro - MG'}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
