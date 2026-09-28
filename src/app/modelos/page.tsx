'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutTemplate, 
  Sparkles, 
  Palette, 
  Type, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Search,
  Zap,
  Building2
} from 'lucide-react';
import { DEMO_TEMPLATES } from '@/data/templates';
import { DemoTemplate } from '@/types';

export default function ModelosPage() {
  const [search, setSearch] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<DemoTemplate>(DEMO_TEMPLATES[0]);

  const filtered = DEMO_TEMPLATES.filter(t => 
    t.segment.toLowerCase().includes(search.toLowerCase()) ||
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.style.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900/80 p-6 rounded-3xl border border-navy-800">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-accent mb-1">
            <LayoutTemplate className="w-4 h-4" />
            <span>MÓDULO: BIBLIOTECA DE MODELOS DE ALTA CONVERSÃO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            9 Modelos de Sites Validados para Negócios Locais
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Estruturas, copys, paletas e fotos prontas para acelerar a demonstração e venda em João Pinheiro e região.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por segmento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Main Grid: Segment Selector and Details View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Segment Cards List */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
            Selecione o Nicho ({filtered.length}):
          </div>

          <div className="space-y-2">
            {filtered.map((tmpl) => {
              const isSelected = selectedTemplate.id === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-navy-900 border-accent shadow-md shadow-accent/10'
                      : 'bg-navy-950/80 border-navy-800 hover:border-navy-700'
                  }`}
                >
                  <div>
                    <div className="font-extrabold text-sm text-white group-hover:text-accent transition-colors">
                      {tmpl.segment}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{tmpl.style}</div>
                  </div>

                  <div className="flex -space-x-1">
                    {tmpl.colors.slice(0, 3).map((c, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-navy-900 shadow-sm"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Detail View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-navy-900/90 rounded-3xl border border-navy-800 p-6 sm:p-8 space-y-6 shadow-xl">
            
            {/* Template Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-navy-800 pb-6">
              <div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-accent/15 text-accent border border-accent/25 uppercase">
                  {selectedTemplate.segment}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {selectedTemplate.title}
                </h2>
                <p className="text-xs text-gray-300 mt-1">
                  Estilo: <strong className="text-accent">{selectedTemplate.style}</strong>
                </p>
              </div>

              <Link
                href={`/empresas/novo?segment=${encodeURIComponent(selectedTemplate.segment)}`}
                className="px-4 py-2.5 rounded-xl bg-accent text-navy-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-accent/25 hover:brightness-110 active:scale-95 transition-all self-start"
              >
                <Building2 className="w-4 h-4 font-black" />
                <span>Prospectar Neste Nicho</span>
              </Link>
            </div>

            {/* Colors Palette & Images Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Palette */}
              <div className="p-4 rounded-2xl bg-navy-950/80 border border-navy-800 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-accent uppercase tracking-wider">
                  <Palette className="w-4 h-4" />
                  <span>Paleta de Cores Recomendada</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {selectedTemplate.colors.map((hex, idx) => (
                    <div key={idx} className="text-center">
                      <div
                        className="w-full h-12 rounded-xl shadow border border-white/20 mb-1"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[10px] font-mono text-gray-300 font-bold uppercase">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Problems found */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Principais Gargalos Deste Segmento:
                </div>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {selectedTemplate.sample_problems.map((prob, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Copy Magnética */}
            <div className="p-5 rounded-2xl bg-navy-950/80 border border-navy-800 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-accent uppercase tracking-wider">
                <Type className="w-4 h-4" />
                <span>Copywriting de Conversão (Hero Headline & CTA)</span>
              </div>
              <div className="p-3 bg-navy-900 rounded-xl border border-navy-800 text-sm font-medium text-white italic">
                "{selectedTemplate.hero_copy}"
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Chamada de Ação no WhatsApp:</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {selectedTemplate.cta_copy}
                </span>
              </div>
            </div>

            {/* Estrutura do Site */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-accent uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Estrutura de Seções Pronta para Entrega</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedTemplate.structure.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-gray-300 p-2.5 rounded-xl bg-navy-950/60 border border-navy-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagens Sugeridas */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Imagens Sugeridas para a Vitrine:
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedTemplate.suggested_images.map((img, idx) => (
                  <div key={idx} className="h-28 rounded-xl overflow-hidden border border-navy-800 shadow">
                    <img src={img} alt="Demonstração" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
