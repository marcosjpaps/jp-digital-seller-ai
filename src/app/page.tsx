'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Sparkles, 
  Send, 
  FileText, 
  Users2, 
  PlusCircle, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  ExternalLink, 
  PhoneCall, 
  Zap,
  ShieldCheck,
  ChevronRight,
  Flame,
  LayoutTemplate
} from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import OpportunityBadge from '@/components/OpportunityBadge';
import { store } from '@/lib/store';
import { Company, DigitalAnalysis } from '@/types';

export default function DashboardPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState({
    companiesAnalyzed: 0,
    contactsMade: 0,
    proposalsCreated: 0,
    closedClients: 0,
    closedRevenue: 0,
    pipelineRevenue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    setCompanies(store.getCompanies());
    setStats(store.getDashboardStats());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 p-6 sm:p-8 rounded-3xl border border-navy-800 shadow-2xl relative overflow-hidden">
        <div className="z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold border border-accent/25 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Máquina de Venda de Sites Locais • João Pinheiro/MG</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            JP DIGITAL <span className="text-accent">SELLER AI</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
            Seu vendedor digital assistido por Inteligência Artificial. Encontre empresas locais, gere diagnósticos instantâneos, crie conceitos visuais e feche sites profissionais.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="z-10 flex flex-wrap gap-2.5 sm:self-center">
          <Link
            href="/empresas/novo"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent text-navy-950 font-black text-xs shadow-lg shadow-accent/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4 font-black" />
            <span>[ Nova Empresa ]</span>
          </Link>
          <Link
            href="/analista-ia"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs border border-navy-700 transition-all"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>[ Analisar Empresa ]</span>
          </Link>
          <Link
            href="/propostas"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs border border-navy-700 transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>[ Criar Proposta ]</span>
          </Link>
          <Link
            href="/crm"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs border border-navy-700 transition-all"
          >
            <Users2 className="w-4 h-4 text-blue-400" />
            <span>[ Clientes ]</span>
          </Link>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Empresas Analisadas"
          value={stats.companiesAnalyzed}
          subtitle="Empresas mapeadas em JP"
          icon={Building2}
          trend="+3 novas esta semana"
        />
        <MetricCard
          title="Contatos Realizados"
          value={stats.contactsMade}
          subtitle="Abordagens no WhatsApp / Insta"
          icon={Send}
        />
        <MetricCard
          title="Propostas Criadas"
          value={stats.proposalsCreated}
          subtitle={`R$ ${stats.pipelineRevenue.toLocaleString('pt-BR')} em negociação`}
          icon={FileText}
          trend="Alta intenção"
        />
        <MetricCard
          title="Clientes Fechados"
          value={stats.closedClients}
          subtitle={`R$ ${stats.closedRevenue.toLocaleString('pt-BR')} faturados`}
          icon={CheckCircle}
          glow={true}
          trend={`${stats.conversionRate}% conversão`}
        />
      </div>

      {/* Visual Pipeline Funnel Flow: The Sales Machine */}
      <div className="bg-navy-900/60 p-6 rounded-3xl border border-navy-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>O Fluxo da Máquina de Vendas</span>
            </h2>
            <p className="text-xs text-gray-400">
              Processo automatizado de ponta a ponta para fechar contratos com empresas locais
            </p>
          </div>
          <Link
            href="/modelos"
            className="inline-flex items-center space-x-1.5 text-xs text-accent hover:underline font-semibold"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Ver Biblioteca de 9 Modelos Prontos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {[
            { step: '1', title: 'Encontrar Empresa', desc: 'Maps / Instagram', href: '/empresas' },
            { step: '2', title: 'Cadastrar Info', desc: 'Dados e fotos', href: '/empresas/novo' },
            { step: '3', title: 'Analisar Presença', desc: 'Digital Analyst IA', href: '/analista-ia' },
            { step: '4', title: 'Oportunidades', desc: 'Score 0 a 100', href: '/analista-ia' },
            { step: '5', title: 'Conceito de Site', desc: 'Website Concept IA', href: '/conceito-site' },
            { step: '6', title: 'Mensagem Venda', desc: 'Sales AI (WhatsApp)', href: '/mensagens-venda' },
            { step: '7', title: 'Gerar Proposta', desc: 'PDF Comercial', href: '/propostas' },
            { step: '8', title: 'Controlar CRM', desc: 'Fechar & Entregar', href: '/crm' }
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group p-3 rounded-2xl bg-navy-950/80 border border-navy-800 hover:border-accent/50 hover:bg-navy-900 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-5 h-5 rounded-full bg-navy-800 group-hover:bg-accent group-hover:text-navy-950 text-accent font-black text-[10px] flex items-center justify-center transition-colors">
                  {item.step}
                </span>
                <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-accent transition-colors leading-tight">
                  {item.title}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Companies List with AI Actions */}
      <div className="bg-navy-900/60 rounded-3xl border border-navy-800 overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-accent" />
              <span>Empresas em Foco — João Pinheiro/MG</span>
            </h2>
            <p className="text-xs text-gray-400">
              Acesse a análise, conceito de site, mensagens de abordagem e proposta para cada negócio.
            </p>
          </div>

          <Link
            href="/empresas/novo"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-accent text-navy-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4 font-black" />
            <span>Cadastrar Nova Empresa</span>
          </Link>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {companies.map((company) => {
            const analysis = store.getAnalysis(company.id);
            const score = analysis?.digital_score || 85;

            return (
              <div
                key={company.id}
                className="p-5 rounded-2xl bg-navy-950/90 border border-navy-800 hover:border-accent/40 transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-extrabold text-white text-base leading-snug">
                          {company.name}
                        </h3>
                      </div>
                      <div className="text-xs text-accent font-semibold mt-0.5">
                        {company.segment} • <span className="text-gray-400">{company.city}</span>
                      </div>
                    </div>
                    <OpportunityBadge score={score} level={analysis?.opportunity_level} />
                  </div>

                  <p className="mt-3 text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {company.description || 'Sem descrição cadastrada.'}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-gray-400">
                    {company.instagram && (
                      <span className="px-2 py-0.5 rounded bg-navy-900 border border-navy-800 text-pink-400 font-mono">
                        {company.instagram}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded font-medium ${
                      company.current_site ? 'bg-amber-500/15 text-amber-300' : 'bg-rose-500/15 text-rose-300'
                    }`}>
                      {company.current_site ? 'Site antigo detectado' : 'Não possui site'}
                    </span>
                    {company.whatsapp && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono">
                        {company.whatsapp}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick AI Shortcuts */}
                <div className="pt-3 border-t border-navy-900 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <Link
                      href={`/analista-ia?companyId=${company.id}`}
                      className="px-2.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-xs font-semibold text-accent border border-accent/20 flex items-center space-x-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Diagnóstico IA</span>
                    </Link>

                    <Link
                      href={`/conceito-site?companyId=${company.id}`}
                      className="px-2.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-xs font-semibold text-gray-200 border border-navy-700 flex items-center space-x-1"
                    >
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>Conceito Visual</span>
                    </Link>

                    <Link
                      href={`/mensagens-venda?companyId=${company.id}`}
                      className="px-2.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-xs font-semibold text-gray-200 border border-navy-700 flex items-center space-x-1"
                    >
                      <Send className="w-3 h-3 text-emerald-400" />
                      <span>Mensagens</span>
                    </Link>
                  </div>

                  <Link
                    href={`/propostas?companyId=${company.id}`}
                    className="px-3 py-1.5 rounded-lg bg-accent/15 hover:bg-accent text-accent hover:text-navy-950 font-bold text-xs flex items-center space-x-1 transition-all"
                  >
                    <span>Ver Proposta</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
