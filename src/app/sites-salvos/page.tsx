'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FolderKanban, 
  Sparkles, 
  Building2, 
  Palette, 
  Eye, 
  Printer, 
  Trash2, 
  Search, 
  ArrowRight, 
  MessageSquare, 
  FileDown, 
  PlusCircle,
  MapPin,
  Layers,
  ChevronRight
} from 'lucide-react';
import { store } from '@/lib/store';
import { WebsiteConcept, Company, ConceptLayoutType } from '@/types';
import ConceptPDFView from '@/components/ConceptPDFView';
import { PRESET_LAYOUTS } from '@/data/layoutArchitectures';

export default function SitesSalvosPage() {
  const [savedItems, setSavedItems] = useState<{ concept: WebsiteConcept; company: Company }[]>([]);
  const [search, setSearch] = useState('');
  const [selectedLayoutFilter, setSelectedLayoutFilter] = useState<string>('all');
  const [pdfConcept, setPdfConcept] = useState<{ concept: WebsiteConcept; company: Company } | null>(null);

  useEffect(() => {
    loadSavedSites();
  }, []);

  const loadSavedSites = () => {
    const list = store.getAllSavedConcepts();
    setSavedItems(list);
  };

  const handleDelete = (companyId: string, conceptId: string, name: string) => {
    if (confirm(`Deseja realmente remover o modelo de site "${name}"?`)) {
      store.deleteWebsiteConcept(companyId, conceptId);
      loadSavedSites();
    }
  };

  const filtered = savedItems.filter(({ concept, company }) => {
    const matchesSearch = 
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.segment.toLowerCase().includes(search.toLowerCase()) ||
      (concept.variant_title || '').toLowerCase().includes(search.toLowerCase()) ||
      (concept.visual_name || '').toLowerCase().includes(search.toLowerCase()) ||
      company.city.toLowerCase().includes(search.toLowerCase());

    const matchesLayout = 
      selectedLayoutFilter === 'all' || 
      (concept.layout_type || 'luxury') === selectedLayoutFilter;

    return matchesSearch && matchesLayout;
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 space-y-6">
      
      {/* If in PDF viewer mode */}
      {pdfConcept ? (
        <ConceptPDFView
          concept={pdfConcept.concept}
          company={pdfConcept.company}
          onBack={() => setPdfConcept(null)}
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900/80 p-6 sm:p-8 rounded-3xl border border-navy-800 shadow-xl">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-accent mb-1">
                <FolderKanban className="w-4 h-4" />
                <span>BIBLIOTECA DE MODELOS SALVOS DAS EMPRESAS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Meus Sites & Demonstrações Salvas
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Acesse, edite novamente e exporte em PDF todos os modelos de sites criados para as empresas locais.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/conceito-site"
                className="px-4 py-2.5 rounded-xl bg-accent text-navy-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <PlusCircle className="w-4 h-4 font-black" />
                <span>+ Criar Novo Conceito</span>
              </Link>
            </div>
          </div>

          {/* Search & Layout Architecture Filters */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-navy-900/60 p-4 rounded-2xl border border-navy-800">
            {/* Search input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por empresa, cidade, segmento ou modelo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
            </div>

            {/* Layout Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto text-xs font-bold">
              <span className="text-gray-400 text-[11px] whitespace-nowrap">Layout:</span>
              <button
                onClick={() => setSelectedLayoutFilter('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedLayoutFilter === 'all'
                    ? 'bg-accent text-navy-950'
                    : 'bg-navy-950 text-gray-400 hover:text-white'
                }`}
              >
                Todos ({savedItems.length})
              </button>

              {PRESET_LAYOUTS.map((lay) => {
                const count = savedItems.filter(i => (i.concept.layout_type || 'luxury') === lay.id).length;
                return (
                  <button
                    key={lay.id}
                    onClick={() => setSelectedLayoutFilter(lay.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                      selectedLayoutFilter === lay.id
                        ? 'bg-accent text-navy-950'
                        : 'bg-navy-950 text-gray-400 hover:text-white'
                    }`}
                  >
                    {lay.badge} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid of Saved Sites */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-navy-900/40 rounded-3xl border border-navy-800">
              <FolderKanban className="w-12 h-12 text-gray-600 mx-auto" />
              <div className="text-base font-bold text-white">Nenhum modelo de site encontrado</div>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Crie seu primeiro conceito com IA ou altere os termos da sua busca.
              </p>
              <Link
                href="/conceito-site"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-accent text-navy-950 font-bold text-xs shadow hover:brightness-110"
              >
                <PlusCircle className="w-4 h-4 font-black" />
                <span>Gerar Primeiro Modelo de Site</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filtered.map(({ concept, company }) => {
                const layoutInfo = PRESET_LAYOUTS.find(l => l.id === (concept.layout_type || 'luxury')) || PRESET_LAYOUTS[0];
                const cleanPhone = company.whatsapp?.replace(/\D/g, '') || '';
                const waUrl = cleanPhone ? `https://api.whatsapp.com/send?phone=55${cleanPhone}` : 'https://api.whatsapp.com/send';

                return (
                  <div
                    key={concept.id}
                    className="p-6 rounded-3xl bg-navy-900/80 border border-navy-800 hover:border-accent/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center space-x-1 text-[11px] text-gray-400">
                            <MapPin className="w-3 h-3 text-accent" />
                            <span>{company.city}</span>
                          </div>
                          <h3 className="font-extrabold text-white text-base mt-0.5 leading-snug group-hover:text-accent transition-colors">
                            {company.name}
                          </h3>
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent/15 text-accent border border-accent/25">
                          {layoutInfo.badge}
                        </span>
                      </div>

                      {/* Variant & Style */}
                      <div className="mt-3 bg-navy-950/80 p-3 rounded-2xl border border-navy-800/80 space-y-1.5">
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span>{concept.variant_title || concept.visual_name}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 line-clamp-2">
                          "{concept.site_structure.hero.headline}"
                        </p>
                      </div>

                      {/* Palette Preview */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-500 uppercase">Paleta:</span>
                        <div className="flex space-x-1">
                          {Object.entries(concept.color_palette).map(([k, hex]) => (
                            <div
                              key={k}
                              className="w-4 h-4 rounded-full border border-navy-900 shadow-sm"
                              style={{ backgroundColor: hex }}
                              title={`${k}: ${hex}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="text-[10px] text-gray-500 mt-2">
                        Criado em: {new Date(concept.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-4 border-t border-navy-800 flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-1.5">
                        <Link
                          href={`/conceito-site?companyId=${company.id}`}
                          className="px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-accent font-bold text-xs flex items-center space-x-1 transition-all"
                          title="Abrir no Estúdio e Editar"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </Link>

                        <button
                          onClick={() => setPdfConcept({ concept, company })}
                          className="px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-gray-200 hover:text-white font-bold text-xs flex items-center space-x-1 transition-all"
                          title="Exportar PDF do Modelo"
                        >
                          <Printer className="w-3.5 h-3.5 text-cyan-400" />
                          <span>PDF</span>
                        </button>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors"
                          title="Enviar no WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>

                      <button
                        onClick={() => handleDelete(company.id, concept.id, concept.variant_title || company.name)}
                        className="p-1.5 rounded-xl text-gray-500 hover:text-rose-400 hover:bg-navy-800 transition-colors"
                        title="Excluir Modelo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

    </div>
  );
}
