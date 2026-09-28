'use client';

import React from 'react';
import { WebsiteConcept, Company } from '@/types';
import { 
  Printer, 
  Sparkles, 
  Palette, 
  Type, 
  Layers, 
  ArrowLeft,
  Monitor,
  Smartphone,
  Check,
  AlertCircle,
  ShieldCheck,
  Info
} from 'lucide-react';
import { SiteLayoutRenderer } from '@/components/LiveSitePreview';

interface ConceptPDFViewProps {
  concept: WebsiteConcept;
  company: Company;
  onBack?: () => void;
}

export default function ConceptPDFView({ concept, company, onBack }: ConceptPDFViewProps) {
  const handlePrint = () => {
    window.print();
  };

  const { color_palette, site_structure, visual_name, style } = concept;

  return (
    <div className="space-y-6">
      
      {/* Barra de Ações Superior (Não sai na impressão) */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-navy-900 border border-navy-800 shadow-xl">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-gray-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Editor</span>
            </button>
          )}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Dossiê Executivo do Site • Pronto para PDF & Impressão</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Apresentação oficial contendo os mockups em Computador e Celular, Paleta Cromática e Copywriting.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-accent text-navy-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-accent/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4 font-black" />
            <span>IMPRIMIR / SALVAR EM PDF</span>
          </button>
        </div>
      </div>

      {/* Alerta de Cores no Navegador (Não sai na impressão) */}
      <div className="no-print p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs flex items-start space-x-3">
        <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">Importante para o PDF sair 100% colorido:</span>
          <p className="leading-relaxed">
            Na tela de impressão que abrir, clique em <strong>"Mais definições"</strong> e marque a caixinha <strong>"Gráficos de segundo plano"</strong> (ou <em>Background graphics</em>). Isso garante que todos os fundos, gradientes e botões saiam em cores vivas no seu arquivo PDF!
          </p>
        </div>
      </div>

      {/* Folha Oficial de Impressão (Estilos específicos para @media print) */}
      <div 
        className="proposal-document bg-white text-slate-900 rounded-3xl p-6 sm:p-12 shadow-2xl border border-slate-200 max-w-5xl mx-auto space-y-10"
        style={{
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
          colorAdjust: 'exact'
        }}
      >
        
        {/* Cabeçalho da Apresentação */}
        <div className="border-b-2 border-slate-200 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs text-white"
                style={{ backgroundColor: color_palette.primary }}
              >
                JP
              </div>
              <span className="font-extrabold tracking-tight text-sm text-slate-900">
                JP DIGITAL SELLER AI
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">• João Pinheiro - MG</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
              Proposta & Conceito de Site Profissional
            </h1>
            <p className="text-slate-600 text-sm mt-1 font-medium">
              Apresentação Técnica, Layouts Responsivos (Desktop + Mobile) & Identidade Visual
            </p>
          </div>

          <div className="sm:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Empresa Prospectada</div>
            <div className="text-lg font-black text-slate-950">{company.name}</div>
            <div className="text-xs font-bold mt-0.5" style={{ color: color_palette.primary }}>{company.segment}</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Data: {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>

        {/* Badges de Identidade & Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: color_palette.primary }} />
              <span>Arquitetura de Layout Selecionada</span>
            </div>
            <div className="text-base font-black text-slate-950">
              {concept.variant_title || 'Layout Pro'}
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <span 
                className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase text-white"
                style={{ backgroundColor: color_palette.primary }}
              >
                Layout: {concept.layout_type || 'luxury'}
              </span>
              {concept.custom_badge && (
                <span 
                  className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase"
                  style={{ backgroundColor: `${color_palette.accent}30`, color: color_palette.primary }}
                >
                  {concept.custom_badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {concept.style}
            </p>
          </div>

          {/* Paleta de Cores em Amostras Grandes */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
              <Palette className="w-3.5 h-3.5" style={{ color: color_palette.primary }} />
              <span>Paleta Cromática do Projeto</span>
            </div>
            <div className="grid grid-cols-5 gap-2 pt-1">
              {Object.entries(color_palette).map(([key, hex]) => (
                <div key={key} className="text-center">
                  <div
                    className="w-full h-10 rounded-xl shadow-sm border border-slate-300 mb-1"
                    style={{ 
                      backgroundColor: hex,
                      WebkitPrintColorAdjust: 'exact',
                      printColorAdjust: 'exact'
                    }}
                  />
                  <div className="text-[9px] font-bold text-slate-700 uppercase">{key}</div>
                  <div className="text-[9px] font-mono text-slate-500">{hex}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEÇÃO 1: MOCKUP DO COMPUTADOR (DESKTOP) */}
        <div className="space-y-3 page-break-inside-avoid">
          <div className="flex items-center justify-between">
            <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center space-x-2">
              <Monitor className="w-4 h-4" style={{ color: color_palette.primary }} />
              <span>1. Visualização no Computador (Desktop)</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Resolução Proporcional Panorâmica</span>
          </div>

          <div 
            className="rounded-2xl border-2 border-slate-300 overflow-hidden shadow-xl"
            style={{
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            {/* Barra do Navegador */}
            <div className="bg-slate-800 px-4 py-2.5 flex items-center space-x-2 text-white border-b border-slate-700">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1 max-w-md mx-auto bg-slate-900 text-slate-300 text-xs px-3 py-1 rounded-md text-center font-mono truncate">
                https://www.{company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br
              </div>
            </div>

            {/* Renderização Real do Site em Desktop */}
            <div className="w-full overflow-hidden">
              <SiteLayoutRenderer concept={concept} company={company} isMobile={false} />
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: MOCKUP DO CELULAR (MOBILE SMARTPHONE) */}
        <div className="space-y-3 page-break-inside-avoid page-break-before">
          <div className="flex items-center justify-between">
            <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center space-x-2">
              <Smartphone className="w-4 h-4" style={{ color: color_palette.primary }} />
              <span>2. Visualização no Celular (Mobile Responsivo)</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold">Otimizado para Conversão no WhatsApp (90% do tráfego local)</span>
          </div>

          <div className="flex justify-center p-6 bg-slate-100 rounded-3xl border border-slate-200">
            {/* Frame do Smartphone */}
            <div 
              className="w-[360px] sm:w-[380px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 relative overflow-hidden"
              style={{
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact'
              }}
            >
              {/* Notch do Aparelho */}
              <div className="mx-auto w-28 h-4 bg-slate-900 rounded-full mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
                <div className="w-8 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Conteúdo Renderizado do Site Mobile */}
              <div className="w-full bg-white rounded-[32px] overflow-hidden text-xs">
                <SiteLayoutRenderer concept={concept} company={company} isMobile={true} />
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO 3: COPYWRITING & TEXTOS DE VENDAS */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 page-break-inside-avoid">
          <div className="flex items-center space-x-2 text-xs font-black text-slate-900 uppercase tracking-wider">
            <Type className="w-4 h-4" style={{ color: color_palette.primary }} />
            <span>3. Textos Persuasivos & Copywriting de Conversão</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Headline Principal (Hero):</span>
              <p className="text-xs font-bold text-slate-950 italic">
                "{site_structure.hero.headline}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Subtítulo Explicativo:</span>
              <p className="text-xs text-slate-700">
                "{site_structure.hero.subheadline}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Botão de Ação Direta (CTA):</span>
              <p className="text-xs font-black text-emerald-700">
                "{site_structure.hero.cta_text}"
              </p>
            </div>
          </div>
        </div>

        {/* SEÇÃO 4: MÓDULOS E SERVIÇOS INCLUSOS */}
        <div className="space-y-3 page-break-inside-avoid">
          <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4" style={{ color: color_palette.primary }} />
            <span>4. Estrutura de Módulos & Seções Inclusas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {site_structure.services.map((srv, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-950 text-xs">{srv.title}</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">{srv.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé da Apresentação */}
        <div className="border-t-2 border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            Proposta gerada pelo <strong>JP DIGITAL SELLER AI</strong> para <strong>{company.name}</strong>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Documento de Validação Conceitual • Padrão de Engenharia
          </div>
        </div>

      </div>
    </div>
  );
}
