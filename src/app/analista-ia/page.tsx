'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Compass, 
  ArrowRight, 
  Zap, 
  Send, 
  FileText, 
  RefreshCw, 
  Flame, 
  Globe, 
  Clock, 
  MapPin 
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { store } from '@/lib/store';
import { AIService } from '@/lib/aiService';
import { Company, DigitalAnalysis } from '@/types';
import OpportunityBadge from '@/components/OpportunityBadge';

function AnalistaIAContent() {
  const searchParams = useSearchParams();
  const companyIdParam = searchParams.get('companyId');
  const autoAnalyze = searchParams.get('autoAnalyze') === 'true';

  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [analysis, setAnalysis] = useState<DigitalAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const list = store.getCompanies();
    setCompanies(list);

    if (list.length > 0) {
      const targetId = (companyIdParam && list.some(c => c.id === companyIdParam))
        ? companyIdParam
        : list[0].id;
      
      setSelectedCompanyId(targetId);
      const existing = store.getAnalysis(targetId);
      if (existing && !autoAnalyze) {
        setAnalysis(existing);
      } else {
        handleRunAnalysis(targetId);
      }
    }
  }, [companyIdParam]);

  const handleRunAnalysis = async (cId?: string) => {
    const targetId = cId || selectedCompanyId;
    const company = companies.find(c => c.id === targetId) || store.getCompanyById(targetId);
    if (!company) return;

    setLoading(true);
    try {
      const result = await AIService.analyzeCompany(company);
      store.saveAnalysis(result);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentCompany = companies.find(c => c.id === selectedCompanyId);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900/80 p-6 rounded-3xl border border-navy-800">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-accent mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AGENTE: DIGITAL ANALYST AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Auditoria & Relatório Digital Local
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Avaliação minuciosa de presença web, Instagram, gaps competitivos e score de oportunidade de venda.
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
                const existing = store.getAnalysis(newId);
                if (existing) setAnalysis(existing);
                else handleRunAnalysis(newId);
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
            onClick={() => handleRunAnalysis()}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 mt-auto rounded-xl bg-accent text-navy-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Analisando...' : 'Reavaliar com IA'}</span>
          </button>
        </div>
      </div>

      {loading ? (
        /* Loading skeleton state */
        <div className="py-20 text-center space-y-4 bg-navy-900/40 rounded-3xl border border-navy-800">
          <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin mx-auto" />
          <div className="text-base font-bold text-white">DIGITAL ANALYST AI está examinando os dados...</div>
          <div className="text-xs text-gray-400 max-w-md mx-auto">
            Auditando presença no Google, perfil do Instagram, canais de resposta e identificando os pontos cegos de venda para {currentCompany?.name}.
          </div>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Score Card */}
            <div className="p-6 rounded-3xl bg-navy-900 border border-navy-800 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  SCORE DE OPORTUNIDADE DE VENDA
                </div>
                <div className="flex items-baseline space-x-3 mt-3">
                  <span className="text-5xl font-black text-white tracking-tight">
                    {analysis.digital_score}
                  </span>
                  <span className="text-gray-500 font-bold text-lg">/ 100</span>
                </div>
                <div className="mt-3">
                  <OpportunityBadge score={analysis.digital_score} level={analysis.opportunity_level} />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-800 text-xs text-gray-400 leading-relaxed">
                {analysis.digital_score >= 71 ? (
                  <span className="text-cyan-400 font-semibold">
                    🔥 Lead Quente! A empresa possui forte demanda reprimida e a falta de site é um gargalo imediato.
                  </span>
                ) : analysis.digital_score >= 41 ? (
                  <span className="text-amber-300 font-semibold">
                    ⚡ Média oportunidade. Necessita de abordagem consultiva destacando os diferenciais competitivos.
                  </span>
                ) : (
                  <span className="text-gray-400 font-semibold">
                    Baixa oportunidade imediata. Foco em otimizações pontuais de conversão.
                  </span>
                )}
              </div>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Score Breakdown Bars */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-navy-900 border border-navy-800 space-y-4">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Diagnóstico por Pilares de Conversão
              </h3>

              <div className="space-y-3.5">
                {[
                  {
                    name: 'Presença & Existência de Site Oficial',
                    value: analysis.report.score_breakdown.website_presence,
                    desc: currentCompany?.current_site ? 'Site desatualizado' : 'Não possui site institucional',
                    icon: Globe
                  },
                  {
                    name: 'Qualidade do Instagram & Engajamento',
                    value: analysis.report.score_breakdown.instagram_quality,
                    desc: 'Aparência visual e frequência de publicações',
                    icon: InstagramIcon
                  },
                  {
                    name: 'Velocidade & Facilidade de Contato',
                    value: analysis.report.score_breakdown.communication_speed,
                    desc: 'Caminho do cliente até o WhatsApp comercial',
                    icon: Clock
                  },
                  {
                    name: 'SEO Local & Visibilidade no Google Maps',
                    value: analysis.report.score_breakdown.local_seo_maps,
                    desc: `Busca no Google em ${currentCompany?.city || 'João Pinheiro'}`,
                    icon: MapPin
                  }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 text-gray-200 font-semibold">
                        <item.icon className="w-3.5 h-3.5 text-accent" />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-mono font-bold text-accent">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden border border-navy-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.value >= 70 ? 'bg-cyan-400' : item.value >= 40 ? 'bg-amber-400' : 'bg-rose-500'
                        }`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-400">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RELATÓRIO DIGITAL COMPLETO */}
          <div className="bg-navy-900/90 rounded-3xl border border-navy-800 p-6 sm:p-8 space-y-8">
            <div className="border-b border-navy-800 pb-4">
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider">Documento Oficial de Inteligência</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                RELATÓRIO DIGITAL — {analysis.report.company_name}
              </h2>
            </div>

            {/* Resumo & Presença Atual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-navy-950/80 border border-navy-800">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Resumo Executivo
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {analysis.report.executive_summary}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-navy-950/80 border border-navy-800">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Presença Digital Atual
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {analysis.report.current_presence}
                </p>
              </div>
            </div>

            {/* Pontos Positivos & Problemas Encontrados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pontos Positivos */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Pontos Positivos</span>
                </div>
                <ul className="space-y-2">
                  {analysis.report.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Problemas Encontrados */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Problemas Encontrados (Dores do Cliente)</span>
                </div>
                <ul className="space-y-2">
                  {analysis.report.issues_found.map((issue, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Oportunidades & Estratégia Recomendada */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Oportunidades */}
              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-3">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                  <span>Oportunidades de Lucro & Atração</span>
                </div>
                <ul className="space-y-2">
                  {analysis.report.opportunities.map((opp, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Estratégia Recomendada */}
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Estratégia Recomendada para Venda</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                  {analysis.report.recommended_strategy}
                </p>
              </div>

            </div>

            {/* Next Steps CTA Buttons */}
            <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-400">
                Diagnóstico gerado com sucesso. Avance para as próximas etapas da máquina:
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/conceito-site?companyId=${selectedCompanyId}`}
                  className="px-4 py-2.5 rounded-xl bg-accent text-navy-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  <Zap className="w-4 h-4 font-black" />
                  <span>Gerar Conceito de Site</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>

                <Link
                  href={`/mensagens-venda?companyId=${selectedCompanyId}`}
                  className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs flex items-center space-x-1.5 border border-navy-700 transition-all"
                >
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Mensagens de Venda</span>
                </Link>

                <Link
                  href={`/propostas?companyId=${selectedCompanyId}`}
                  className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs flex items-center space-x-1.5 border border-navy-700 transition-all"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Gerar Proposta</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      ) : null}

    </div>
  );
}

export default function AnalistaIAPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-sm text-gray-400">
        Carregando Analista Digital IA...
      </div>
    }>
      <AnalistaIAContent />
    </Suspense>
  );
}
