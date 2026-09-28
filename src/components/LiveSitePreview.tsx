'use client';

import React, { useState } from 'react';
import { WebsiteConcept, Company, ConceptLayoutType } from '@/types';
import { 
  Smartphone, 
  Monitor, 
  MessageSquare, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Clock, 
  Award, 
  ShoppingBag, 
  Calendar, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface SiteLayoutRendererProps {
  concept: WebsiteConcept;
  company: Company;
  isMobile: boolean;
}

/**
 * Componente que renderiza a estrutura completa do site ativo
 * Exportado para uso tanto no LiveSitePreview quanto na Folha de Apresentação em PDF (ConceptPDFView)
 */
export function SiteLayoutRenderer({ concept, company, isMobile }: SiteLayoutRendererProps) {
  const { color_palette, site_structure, image_suggestions } = concept;
  const layoutType: ConceptLayoutType = concept.layout_type || 'luxury';
  
  // Style and typography awareness
  const styleStr = (concept.style || '').toLowerCase();
  const badgeStr = (concept.custom_badge || '').toLowerCase();

  const isSerif = styleStr.includes('luxo') || styleStr.includes('nobre') || styleStr.includes('artesanal') || styleStr.includes('serif') || badgeStr.includes('alto padrão') || layoutType === 'luxury';
  const isMono = styleStr.includes('futurista') || styleStr.includes('tech') || styleStr.includes('cyber') || styleStr.includes('geek');
  const isMinimal = styleStr.includes('minimalista') || styleStr.includes('clean') || styleStr.includes('essencial') || layoutType === 'minimal';
  const isBold = styleStr.includes('vibrante') || styleStr.includes('comercial') || styleStr.includes('alta energia') || styleStr.includes('bold');

  const fontClass = isSerif ? 'font-serif' : isMono ? 'font-mono' : 'font-sans';
  const cardRadius = isMinimal ? 'rounded-md' : isBold ? 'rounded-2xl' : 'rounded-3xl';
  const btnRadius = isMinimal ? 'rounded-md' : isBold ? 'rounded-xl' : 'rounded-full';

  const heroImage = image_suggestions[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop';
  const serviceImage = image_suggestions[1] || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop';
  const thirdImage = image_suggestions[2] || 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop';

  const cleanPhone = company.whatsapp?.replace(/\D/g, '') || '';
  const waUrl = cleanPhone 
    ? `https://api.whatsapp.com/send?phone=55${cleanPhone}` 
    : 'https://api.whatsapp.com/send';

  /* =========================================================================
     LAYOUT 1: LUXURY & EDITORIAL SHOWCASE
     ========================================================================= */
  const renderLuxuryLayout = () => (
    <div 
      className={`${fontClass} transition-colors duration-300 w-full`}
      style={{ 
        backgroundColor: color_palette.background || '#FAF8F5', 
        color: color_palette.text || '#1C1917',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact'
      }}
    >
      {/* Header */}
      <div 
        className="px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20 border-b transition-colors duration-300"
        style={{ 
          backgroundColor: color_palette.primary, 
          color: '#ffffff',
          borderColor: `${color_palette.accent}33`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="font-extrabold tracking-widest text-sm uppercase">
          {company.name}
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className={`px-3.5 py-1.5 ${btnRadius} text-xs font-sans font-bold flex items-center space-x-1.5 shadow-md active:scale-95 transition-all`}
          style={{ 
            backgroundColor: color_palette.accent, 
            color: '#071321',
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact'
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atendimento VIP</span>
        </a>
      </div>

      {/* Hero */}
      <div 
        className={`${isMobile ? 'p-6' : 'p-12 grid grid-cols-2 gap-8 items-center'} text-white relative transition-colors duration-300`}
        style={{ 
          background: `linear-gradient(135deg, ${color_palette.secondary} 0%, ${color_palette.primary} 100%)`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div>
          <span 
            className={`inline-block px-3 py-1 ${btnRadius} text-[10px] font-sans font-extrabold uppercase tracking-widest mb-3 shadow`}
            style={{ 
              backgroundColor: color_palette.accent, 
              color: '#071321',
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            {concept.custom_badge || 'Coleção & Exclusividade'} • {company.city}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3 italic">
            "{site_structure.hero.headline}"
          </h1>
          <p className="font-sans text-xs sm:text-sm leading-relaxed mb-6 font-light opacity-90">
            {site_structure.hero.subheadline}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center space-x-2 px-6 py-3.5 ${btnRadius} font-sans font-bold text-xs uppercase tracking-wider shadow-xl active:scale-95 transition-all`}
            style={{ 
              backgroundColor: color_palette.accent, 
              color: '#071321',
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>{site_structure.hero.cta_text}</span>
          </a>
        </div>

        <div className={`${isMobile ? 'mt-6' : ''} ${cardRadius} overflow-hidden shadow-2xl border-2 h-56 sm:h-72`}
          style={{ borderColor: `${color_palette.accent}50` }}
        >
          <img src={heroImage} alt={company.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Social Proof */}
      <div 
        className="px-6 py-4 border-b transition-colors duration-300"
        style={{ 
          backgroundColor: `${color_palette.primary}0D`,
          borderColor: `${color_palette.primary}15`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="flex flex-wrap items-center justify-around gap-2 font-sans text-xs">
          {site_structure.social_proof.map((proof, i) => (
            <div key={i} className="flex items-center space-x-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5" style={{ color: color_palette.accent }} />
              <span>{proof}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services / Lookbook */}
      <div className="p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-md mx-auto">
          <span 
            className="text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded"
            style={{ 
              backgroundColor: `${color_palette.accent}20`, 
              color: color_palette.primary,
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            {concept.custom_badge || 'Catálogo Selecionado'}
          </span>
          <h2 className="text-xl font-bold mt-2 italic" style={{ color: color_palette.primary }}>
            Nossas Coleções & Criações
          </h2>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
          {site_structure.services.map((srv, idx) => (
            <div 
              key={idx} 
              className={`p-5 ${cardRadius} bg-white border shadow-sm space-y-2.5 transition-all`}
              style={{ borderColor: `${color_palette.accent}30` }}
            >
              <div className="h-32 rounded-xl overflow-hidden mb-2">
                <img src={idx === 0 ? heroImage : idx === 1 ? serviceImage : thirdImage} alt={srv.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-sm italic" style={{ color: color_palette.primary }}>{srv.title}</h3>
              <p className="font-sans text-xs leading-relaxed opacity-75">{srv.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div 
        className="p-6 sm:p-10 border-t space-y-4"
        style={{ 
          backgroundColor: `${color_palette.primary}08`,
          borderColor: `${color_palette.primary}15`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <h3 className="text-center text-sm font-bold uppercase tracking-widest font-sans" style={{ color: color_palette.primary }}>
          Reconhecimento & Clientes
        </h3>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3 max-w-2xl mx-auto`}>
          {site_structure.testimonials.map((test, idx) => (
            <div key={idx} className={`p-4 ${cardRadius} bg-white border shadow-sm space-y-2`} style={{ borderColor: `${color_palette.primary}15` }}>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: color_palette.accent }} />
                ))}
              </div>
              <p className="text-xs italic leading-relaxed opacity-85">"{test.comment}"</p>
              <div className="font-sans font-bold text-[10px] uppercase tracking-wider" style={{ color: color_palette.primary }}>{test.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Location */}
      <div 
        className="p-6 text-center text-white space-y-2 transition-colors duration-300"
        style={{ 
          backgroundColor: color_palette.primary,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <MapPin className="w-5 h-5 mx-auto" style={{ color: color_palette.accent }} />
        <div className="font-bold text-xs uppercase tracking-wider">{company.city}</div>
        <p className="font-sans text-xs opacity-80">{site_structure.location_cta.address_highlight}</p>
        <div className="font-sans text-[10px] pt-2 opacity-60">© {company.name}. Padrão de Excelência.</div>
      </div>
    </div>
  );

  /* =========================================================================
     LAYOUT 2: DARK HIGH-TECH & CONVERSÃO MÁXIMA
     ========================================================================= */
  const renderDarkTechLayout = () => (
    <div 
      className={`${fontClass} transition-colors duration-300 w-full`}
      style={{ 
        backgroundColor: color_palette.background && !color_palette.background.startsWith('#F') && color_palette.background !== '#FFFFFF' 
          ? color_palette.background 
          : '#050B14', 
        color: '#F8FAFC',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact'
      }}
    >
      {/* Header */}
      <div 
        className="px-6 py-4 flex items-center justify-between border-b backdrop-blur sticky top-0 z-20 transition-colors duration-300"
        style={{ 
          backgroundColor: color_palette.primary,
          borderColor: `${color_palette.accent}35`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="flex items-center space-x-2">
          <div 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: color_palette.accent }}
          />
          <span className="font-black text-sm tracking-wider uppercase text-white">{company.name}</span>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className={`px-3.5 py-1.5 ${btnRadius} font-black text-xs shadow-lg flex items-center space-x-1.5 active:scale-95 transition-all`}
          style={{ 
            backgroundColor: color_palette.accent, 
            color: '#050B14',
            boxShadow: `0 0 16px ${color_palette.accent}55`,
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact'
          }}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Falar no WhatsApp</span>
        </a>
      </div>

      {/* Hero */}
      <div 
        className={`${isMobile ? 'p-6' : 'p-12 grid grid-cols-2 gap-8 items-center'} relative overflow-hidden transition-colors duration-300`}
        style={{ 
          background: `linear-gradient(180deg, ${color_palette.primary} 0%, ${color_palette.secondary} 100%)`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div>
          <div 
            className={`inline-flex items-center space-x-1.5 px-3 py-1 ${btnRadius} border text-[11px] font-bold mb-3 shadow`}
            style={{ 
              backgroundColor: `${color_palette.accent}20`, 
              color: color_palette.accent,
              borderColor: `${color_palette.accent}40`,
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            <Zap className="w-3.5 h-3.5" style={{ color: color_palette.accent }} />
            <span>{concept.custom_badge || 'Máxima Performance'} • {company.city}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
            {site_structure.hero.headline}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
            {site_structure.hero.subheadline}
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 ${btnRadius} font-black text-xs uppercase tracking-wider shadow-xl active:scale-95 transition-all`}
            style={{ 
              backgroundColor: color_palette.accent, 
              color: '#050B14',
              boxShadow: `0 0 20px ${color_palette.accent}65`,
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>{site_structure.hero.cta_text}</span>
          </a>
        </div>

        <div 
          className={`${isMobile ? 'mt-6' : ''} ${cardRadius} overflow-hidden border shadow-2xl relative group h-56 sm:h-72`}
          style={{ borderColor: `${color_palette.accent}45` }}
        >
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
            <div className="flex items-center space-x-2 text-xs font-bold" style={{ color: color_palette.accent }}>
              <ShieldCheck className="w-4 h-4" />
              <span>Atendimento 100% Verificado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Counters / Live Metrics */}
      <div 
        className="border-y px-6 py-4 transition-colors duration-300"
        style={{ 
          backgroundColor: color_palette.secondary, 
          borderColor: `${color_palette.accent}25`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="font-black text-base sm:text-lg" style={{ color: color_palette.accent }}>99.8%</div>
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Aprovação</div>
          </div>
          <div className="border-x" style={{ borderColor: `${color_palette.accent}25` }}>
            <div className="font-black text-base sm:text-lg" style={{ color: color_palette.accent }}>&lt; 3 min</div>
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Resposta</div>
          </div>
          <div>
            <div className="font-black text-base sm:text-lg" style={{ color: color_palette.accent }}>Nota 5.0</div>
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Em {company.city.split('-')[0].trim()}</div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-6 sm:p-10 space-y-4">
        <h2 className="text-center font-black text-base uppercase tracking-wider" style={{ color: color_palette.accent }}>
          Nossas Soluções Estratégicas
        </h2>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
          {site_structure.services.map((srv, idx) => (
            <div 
              key={idx} 
              className={`p-5 ${cardRadius} border space-y-2 backdrop-blur-sm transition-all`}
              style={{ 
                backgroundColor: `${color_palette.secondary}`, 
                borderColor: `${color_palette.accent}30`,
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact'
              }}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{ 
                  backgroundColor: `${color_palette.accent}20`, 
                  color: color_palette.accent 
                }}
              >
                0{idx + 1}
              </div>
              <h3 className="font-bold text-white text-sm">{srv.title}</h3>
              <p className="text-slate-300 text-xs leading-relaxed">{srv.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div 
        className="p-6 text-center border-t text-xs text-slate-300"
        style={{ 
          backgroundColor: color_palette.primary, 
          borderColor: `${color_palette.accent}25`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="font-bold text-white mb-1">{company.name} • {company.city}</div>
        <p className="text-[11px] opacity-70">{site_structure.location_cta.address_highlight}</p>
      </div>
    </div>
  );

  /* =========================================================================
     LAYOUT 3: MINIMALISTA CLEAN & MAGAZINE CONTEMPORÂNEO
     ========================================================================= */
  const renderMinimalLayout = () => (
    <div 
      className={`${fontClass} transition-colors duration-300 w-full`}
      style={{ 
        backgroundColor: color_palette.background || '#FFFFFF', 
        color: color_palette.text || '#171717',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact'
      }}
    >
      {/* Header */}
      <div 
        className="px-6 py-4 flex items-center justify-between border-b sticky top-0 z-20 bg-white/95 backdrop-blur transition-colors duration-300"
        style={{ borderColor: `${color_palette.primary}20` }}
      >
        <div className="font-black text-base tracking-tighter uppercase" style={{ color: color_palette.primary }}>
          {company.name}
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className={`px-4 py-1.5 ${btnRadius} text-white text-xs font-bold shadow hover:opacity-90 transition-all`}
          style={{ 
            backgroundColor: color_palette.primary,
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact'
          }}
        >
          Contato
        </a>
      </div>

      {/* Hero */}
      <div className={`${isMobile ? 'p-6' : 'p-14 max-w-4xl mx-auto'} space-y-6`}>
        <div className="space-y-3">
          <div 
            className="text-[11px] font-mono uppercase tracking-widest font-bold"
            style={{ color: color_palette.accent }}
          >
            {concept.custom_badge || company.segment} — {company.city}
          </div>
          <h1 
            className="text-3xl sm:text-4xl font-black tracking-tight leading-tight"
            style={{ color: color_palette.primary }}
          >
            {site_structure.hero.headline}
          </h1>
          <p className="text-sm leading-relaxed max-w-2xl opacity-75">
            {site_structure.hero.subheadline}
          </p>
        </div>

        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center space-x-2 px-6 py-3.5 ${btnRadius} text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all`}
            style={{ 
              backgroundColor: color_palette.primary,
              boxShadow: `0 4px 18px ${color_palette.primary}35`,
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            <span>{site_structure.hero.cta_text}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div 
          className={`${cardRadius} overflow-hidden border h-64 sm:h-96 shadow-md`}
          style={{ borderColor: `${color_palette.primary}20` }}
        >
          <img src={heroImage} alt={company.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Clean Services */}
      <div 
        className="border-t p-6 sm:p-14 max-w-4xl mx-auto space-y-6"
        style={{ borderColor: `${color_palette.primary}15` }}
      >
        <h2 
          className="text-xs font-mono uppercase tracking-widest font-bold"
          style={{ color: color_palette.accent }}
        >
          O que entregamos com excelência
        </h2>
        <div className="divide-y" style={{ borderColor: `${color_palette.primary}15` }}>
          {site_structure.services.map((srv, idx) => (
            <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="font-black text-base sm:w-1/3" style={{ color: color_palette.primary }}>
                {srv.title}
              </span>
              <p className="text-xs sm:w-2/3 leading-relaxed opacity-75">{srv.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div 
        className="border-t p-8 text-center text-xs space-y-1"
        style={{ borderColor: `${color_palette.primary}15` }}
      >
        <div className="font-bold" style={{ color: color_palette.primary }}>{company.name}</div>
        <div className="opacity-70">{site_structure.location_cta.address_highlight}</div>
        <div className="text-[10px] opacity-40 pt-2">Design Minimalista Desenvolvido por JP Digital Seller AI</div>
      </div>
    </div>
  );

  /* =========================================================================
     LAYOUT 4: CATÁLOGO COMERCIAL & DELIVERY INTERATIVO
     ========================================================================= */
  const renderCatalogLayout = () => (
    <div 
      className={`${fontClass} transition-colors duration-300 w-full`}
      style={{ 
        backgroundColor: color_palette.background || '#F8FAFC', 
        color: color_palette.text || '#0F172A',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact'
      }}
    >
      {/* Header com busca */}
      <div 
        className="px-6 py-4 shadow-sm sticky top-0 z-20 text-white flex items-center justify-between transition-colors duration-300"
        style={{ 
          backgroundColor: color_palette.primary,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="font-black text-sm tracking-tight">{company.name}</div>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className={`px-3 py-1.5 ${btnRadius} font-black text-xs flex items-center space-x-1.5 shadow active:scale-95 transition-all`}
          style={{ 
            backgroundColor: color_palette.accent, 
            color: '#071321',
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact'
          }}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Fazer Pedido</span>
        </a>
      </div>

      {/* Delivery / Announcement Bar */}
      <div 
        className="px-4 py-2 text-center text-xs font-bold flex items-center justify-center space-x-2 shadow-inner"
        style={{ 
          backgroundColor: color_palette.accent, 
          color: '#071321',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <Clock className="w-3.5 h-3.5" />
        <span>{concept.custom_badge || 'Atendimento rápido'} para toda {company.city} no WhatsApp!</span>
      </div>

      {/* Hero Banner */}
      <div 
        className="p-6 relative text-white overflow-hidden transition-colors duration-300"
        style={{ 
          backgroundColor: color_palette.secondary,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="max-w-xl relative z-10 space-y-2">
          <span 
            className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase shadow"
            style={{ 
              backgroundColor: color_palette.accent, 
              color: '#071321',
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            Catálogo Interativo
          </span>
          <h1 className="text-xl sm:text-2xl font-black leading-tight">
            {site_structure.hero.headline}
          </h1>
          <p className="text-xs opacity-85 line-clamp-2">
            {site_structure.hero.subheadline}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center space-x-1.5 px-4 py-2 ${btnRadius} font-bold text-xs shadow-md mt-2 active:scale-95 transition-all`}
            style={{ 
              backgroundColor: color_palette.accent, 
              color: '#071321',
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{site_structure.hero.cta_text}</span>
          </a>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30">
          <img src={heroImage} alt="Banner" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="p-4 bg-white border-b border-slate-200 flex space-x-2 overflow-x-auto text-xs font-bold">
        {['🔥 Mais Pedidos', '⭐ Destaques', '🏷️ Novidades', '📦 Promoções'].map((cat, i) => (
          <span 
            key={i} 
            className={`px-3 py-1.5 ${btnRadius} flex-shrink-0 cursor-pointer shadow-sm transition-all`}
            style={
              i === 0 
                ? { backgroundColor: color_palette.accent, color: '#071321', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' } 
                : { backgroundColor: '#F1F5F9', color: '#475569' }
            }
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Catalog Grid */}
      <div className="p-6 space-y-4">
        <div className={`grid ${isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-3'} gap-4`}>
          {site_structure.services.map((srv, idx) => (
            <div 
              key={idx} 
              className={`bg-white ${cardRadius} border overflow-hidden shadow-sm flex flex-col justify-between`}
              style={{ borderColor: `${color_palette.primary}20` }}
            >
              <div className="h-36 overflow-hidden relative">
                <img src={idx === 0 ? heroImage : idx === 1 ? serviceImage : thirdImage} alt={srv.title} className="w-full h-full object-cover" />
                <span 
                  className="absolute top-2 right-2 px-2 py-0.5 rounded font-black text-[9px] uppercase shadow"
                  style={{ 
                    backgroundColor: color_palette.accent, 
                    color: '#071321',
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Disponível
                </span>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm" style={{ color: color_palette.primary }}>{srv.title}</h3>
                  <p className="text-xs mt-1 leading-relaxed opacity-70">{srv.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: color_palette.primary }}>Peça no WhatsApp</span>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl transition-all shadow-sm active:scale-95"
                    style={{ 
                      backgroundColor: `${color_palette.accent}25`, 
                      color: color_palette.primary,
                      WebkitPrintColorAdjust: 'exact',
                      printColorAdjust: 'exact'
                    }}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div 
        className="p-6 text-white text-center text-xs space-y-1 transition-colors duration-300"
        style={{ 
          backgroundColor: color_palette.primary,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="font-bold">{company.name}</div>
        <div className="opacity-70 text-[11px]">{site_structure.location_cta.address_highlight}</div>
      </div>
    </div>
  );

  /* =========================================================================
     LAYOUT 5: CORPORATIVO, AUTORIDADE & AGENDAMENTO
     ========================================================================= */
  const renderAuthorityLayout = () => (
    <div 
      className={`${fontClass} transition-colors duration-300 w-full`}
      style={{ 
        backgroundColor: color_palette.background || '#F8FAFC', 
        color: color_palette.text || '#0F172A',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact'
      }}
    >
      {/* Top Credentials Bar */}
      <div 
        className="px-6 py-2 text-[11px] flex items-center justify-between border-b text-white transition-colors duration-300"
        style={{ 
          backgroundColor: color_palette.primary, 
          borderColor: `${color_palette.secondary}`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="flex items-center space-x-2">
          <Award className="w-3.5 h-3.5" style={{ color: color_palette.accent }} />
          <span>Atendimento Certificado em {company.city}</span>
        </div>
        <div className="font-mono font-bold" style={{ color: color_palette.accent }}>
          {company.whatsapp || 'WhatsApp Oficial'}
        </div>
      </div>

      {/* Header */}
      <div 
        className="px-6 py-4 bg-white shadow-sm flex items-center justify-between sticky top-0 z-20 border-b"
        style={{ borderColor: `${color_palette.primary}20` }}
      >
        <div className="font-black text-base tracking-tight" style={{ color: color_palette.primary }}>
          {company.name}
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className={`px-4 py-2 ${btnRadius} text-white font-bold text-xs shadow hover:opacity-90 active:scale-95 transition-all`}
          style={{ 
            backgroundColor: color_palette.primary,
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact'
          }}
        >
          Agendar Consulta
        </a>
      </div>

      {/* Hero with Appointment Card */}
      <div 
        className={`${isMobile ? 'p-6 space-y-6' : 'p-12 grid grid-cols-2 gap-8 items-center'} text-white transition-colors duration-300`}
        style={{ 
          background: `linear-gradient(135deg, ${color_palette.primary} 0%, ${color_palette.secondary} 100%)`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="space-y-4">
          <span 
            className={`px-3 py-1 ${btnRadius} border text-xs font-bold uppercase inline-block shadow`}
            style={{ 
              backgroundColor: `${color_palette.accent}20`, 
              color: color_palette.accent,
              borderColor: `${color_palette.accent}40`,
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            {concept.custom_badge || 'Autoridade Comprovada'} em {company.segment}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight">
            {site_structure.hero.headline}
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed opacity-85 font-light">
            {site_structure.hero.subheadline}
          </p>

          <div className="space-y-2 pt-2">
            {site_structure.social_proof.map((p, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: color_palette.accent }} />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Card Frame */}
        <div 
          className={`bg-white ${cardRadius} p-6 text-slate-800 shadow-2xl border space-y-3`}
          style={{ borderColor: `${color_palette.primary}20` }}
        >
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-black text-sm" style={{ color: color_palette.primary }}>Agende Seu Atendimento</h3>
            <p className="text-slate-500 text-[11px]">Equipe pronta para responder em poucos minutos.</p>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Seu Nome</label>
              <input type="text" placeholder="Nome completo" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" readOnly />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">WhatsApp</label>
              <input type="text" placeholder="(38) 99999-9999" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" readOnly />
            </div>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className={`w-full py-3.5 ${btnRadius} font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-all`}
            style={{ 
              backgroundColor: color_palette.accent, 
              color: '#071321',
              boxShadow: `0 4px 18px ${color_palette.accent}50`,
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            <Calendar className="w-4 h-4" />
            <span>{site_structure.hero.cta_text}</span>
          </a>
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-6 sm:p-12 space-y-6 max-w-5xl mx-auto">
        <div className="text-center max-w-md mx-auto">
          <span className="text-xs font-bold uppercase" style={{ color: color_palette.accent }}>
            Corpo Especializado & Serviços
          </span>
          <h2 className="text-xl font-black mt-1" style={{ color: color_palette.primary }}>
            Procedimentos & Atendimento
          </h2>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
          {site_structure.services.map((srv, idx) => (
            <div 
              key={idx} 
              className={`p-6 ${cardRadius} bg-white border shadow-sm space-y-2`}
              style={{ borderColor: `${color_palette.primary}20` }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                style={{ backgroundColor: `${color_palette.accent}20`, color: color_palette.primary }}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm" style={{ color: color_palette.primary }}>{srv.title}</h3>
              <p className="text-xs leading-relaxed opacity-75">{srv.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Google Reviews Box */}
      <div 
        className="p-6 sm:p-10 border-t space-y-4"
        style={{ 
          backgroundColor: `${color_palette.primary}06`,
          borderColor: `${color_palette.primary}15`,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="flex items-center justify-center space-x-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-4" />
          <span className="text-xs font-bold text-slate-700">Avaliações 5 Estrelas no Google</span>
        </div>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3 max-w-2xl mx-auto`}>
          {site_structure.testimonials.map((test, idx) => (
            <div key={idx} className={`p-4 ${cardRadius} bg-white border shadow-sm space-y-1`} style={{ borderColor: `${color_palette.primary}15` }}>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: color_palette.accent }} />
                ))}
              </div>
              <p className="text-xs italic opacity-85">"{test.comment}"</p>
              <div className="font-bold text-[10px]" style={{ color: color_palette.primary }}>{test.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div 
        className="p-6 text-white text-center text-xs space-y-1 transition-colors duration-300"
        style={{ 
          backgroundColor: color_palette.primary,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="font-bold">{company.name}</div>
        <div className="opacity-70 text-[11px]">{site_structure.location_cta.address_highlight}</div>
      </div>
    </div>
  );

  switch (layoutType) {
    case 'luxury':
      return renderLuxuryLayout();
    case 'dark_tech':
      return renderDarkTechLayout();
    case 'minimal':
      return renderMinimalLayout();
    case 'catalog':
      return renderCatalogLayout();
    case 'authority':
      return renderAuthorityLayout();
    default:
      return renderLuxuryLayout();
  }
}

interface LiveSitePreviewProps {
  concept: WebsiteConcept;
  company: Company;
}

export default function LiveSitePreview({ concept, company }: LiveSitePreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('mobile');
  const { color_palette } = concept;
  const layoutType: ConceptLayoutType = concept.layout_type || 'luxury';

  return (
    <div className="flex flex-col space-y-4">
      {/* Device & Applied Tokens Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-900/90 p-3 rounded-xl border border-navy-800">
        
        {/* Device Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-gray-300">Modo de Visualização:</span>
          <div className="flex bg-navy-950 p-1 rounded-lg border border-navy-800">
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                device === 'mobile'
                  ? 'bg-accent text-navy-950 font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Celular (Recomendado)</span>
            </button>
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                device === 'desktop'
                  ? 'bg-accent text-navy-950 font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Computador</span>
            </button>
          </div>
        </div>

        {/* Live Active Indicators */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Layout Indicator */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-navy-950 border border-navy-800">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Layout:</span>
            <span className="text-accent font-black uppercase tracking-wider">{layoutType}</span>
          </div>

          {/* Style Indicator */}
          {concept.custom_badge && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-navy-950 border border-navy-800">
              <span className="text-[10px] text-gray-400 uppercase font-bold">Estilo:</span>
              <span className="text-white font-bold">{concept.custom_badge}</span>
            </div>
          )}

          {/* Palette Swatches */}
          <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-navy-950 border border-navy-800" title="Cores Ativas">
            <span className="text-[10px] text-gray-400 uppercase font-bold mr-1">Cores:</span>
            <div className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: color_palette.primary }} title={`Primária: ${color_palette.primary}`} />
            <div className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: color_palette.secondary }} title={`Secundária: ${color_palette.secondary}`} />
            <div className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: color_palette.accent }} title={`Destaque: ${color_palette.accent}`} />
            <div className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: color_palette.background }} title={`Fundo: ${color_palette.background}`} />
          </div>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex justify-center items-center py-4 bg-navy-950/80 rounded-2xl border border-navy-800 min-h-[620px] overflow-hidden">
        {device === 'mobile' ? (
          /* Smart Phone Mockup */
          <div className="w-[360px] sm:w-[380px] h-[720px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700 mr-2" />
              <div className="w-10 h-1 bg-slate-800 rounded-full" />
            </div>

            {/* Mobile Screen Content */}
            <div className="w-full h-full bg-white rounded-[38px] overflow-y-auto pt-6 text-xs relative">
              <SiteLayoutRenderer concept={concept} company={company} isMobile={true} />
            </div>
          </div>
        ) : (
          /* Desktop Mockup */
          <div className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
            {/* Browser top bar */}
            <div className="bg-slate-800 px-4 py-2.5 flex items-center space-x-2 border-b border-slate-700">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1 max-w-md mx-auto bg-slate-900/90 text-slate-300 text-xs px-3 py-1 rounded-md text-center border border-slate-700 font-mono truncate">
                https://www.{company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br
              </div>
            </div>

            {/* Desktop Site Content */}
            <div className="max-h-[640px] overflow-y-auto">
              <SiteLayoutRenderer concept={concept} company={company} isMobile={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
