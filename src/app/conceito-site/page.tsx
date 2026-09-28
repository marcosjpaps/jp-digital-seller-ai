'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Zap, 
  Sparkles, 
  Building2, 
  Palette, 
  Layout, 
  Type, 
  ArrowRight, 
  Send, 
  RefreshCw,
  Eye,
  CheckCircle2,
  Copy,
  Printer,
  PlusCircle,
  Check,
  Sliders,
  FileDown,
  Layers,
  ChevronRight,
  SlidersHorizontal,
  Flame,
  Wand2,
  FolderKanban
} from 'lucide-react';
import { store } from '@/lib/store';
import { AIService } from '@/lib/aiService';
import { Company, WebsiteConcept } from '@/types';
import LiveSitePreview from '@/components/LiveSitePreview';
import ConceptPDFView from '@/components/ConceptPDFView';
import { 
  PRESET_STYLES, 
  PRESET_PALETTES, 
  PRESET_STRUCTURE_SECTIONS, 
  PRESET_COPIES 
} from '@/data/conceptPresets';
import { PRESET_LAYOUTS, LayoutArchitecture } from '@/data/layoutArchitectures';

function ConceitoSiteContent() {
  const searchParams = useSearchParams();
  const companyIdParam = searchParams.get('companyId');

  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [concepts, setConcepts] = useState<WebsiteConcept[]>([]);
  const [selectedConceptIndex, setSelectedConceptIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [generatingNew, setGeneratingNew] = useState(false);
  
  // View mode: 'editor' or 'pdf_export'
  const [viewMode, setViewMode] = useState<'editor' | 'pdf_export'>('editor');
  
  // Customizer active tab
  const [customizerTab, setCustomizerTab] = useState<'layout' | 'style' | 'colors' | 'copy' | 'structure'>('layout');
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [copiedHeadline, setCopiedHeadline] = useState(false);

  useEffect(() => {
    const list = store.getCompanies();
    setCompanies(list);

    if (list.length > 0) {
      const targetId = (companyIdParam && list.some(c => c.id === companyIdParam))
        ? companyIdParam
        : list[0].id;
      
      setSelectedCompanyId(targetId);
      loadConceptsForCompany(targetId);
    }
  }, [companyIdParam]);

  const loadConceptsForCompany = async (companyId: string) => {
    const company = store.getCompanyById(companyId);
    if (!company) return;

    let existingList = store.getWebsiteConcepts(companyId);
    if (existingList.length === 0) {
      setLoading(true);
      try {
        const generated = await AIService.generateMultipleConcepts(company);
        generated.forEach(c => store.saveWebsiteConcept(c));
        setConcepts(generated);
        setSelectedConceptIndex(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setConcepts(existingList);
      setSelectedConceptIndex(0);
    }
  };

  const currentCompany = companies.find(c => c.id === selectedCompanyId);
  const currentConcept = concepts[selectedConceptIndex] || concepts[0] || null;

  // Generate a brand new variant option
  const handleAddNewOption = async () => {
    if (!currentCompany) return;
    setGeneratingNew(true);
    try {
      const newOptionIndex = concepts.length;
      const newConcept = await AIService.generateWebsiteConcept(currentCompany, newOptionIndex);
      newConcept.variant_title = `Opção ${newOptionIndex + 1}: Conceito Personalizado`;
      store.saveWebsiteConcept(newConcept);
      const updatedList = store.getWebsiteConcepts(selectedCompanyId);
      setConcepts(updatedList);
      setSelectedConceptIndex(0); // newly added is first
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingNew(false);
    }
  };

  // Update current concept in state and store
  const updateCurrentConcept = (updated: WebsiteConcept) => {
    const newList = [...concepts];
    newList[selectedConceptIndex] = updated;
    setConcepts(newList);
    store.saveWebsiteConcept(updated);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  // Apply a layout architecture preset
  const handleSelectLayout = (layout: LayoutArchitecture) => {
    if (!currentConcept) return;
    updateCurrentConcept({
      ...currentConcept,
      layout_type: layout.id,
      style: layout.description,
      custom_badge: layout.badge
    });
  };

  // Apply a style preset
  const handleSelectStylePreset = (preset: typeof PRESET_STYLES[0]) => {
    if (!currentConcept) return;
    updateCurrentConcept({
      ...currentConcept,
      style: preset.description,
      custom_badge: preset.badge
    });
  };

  // Apply a color palette preset
  const handleSelectPalettePreset = (preset: typeof PRESET_PALETTES[0]) => {
    if (!currentConcept) return;
    updateCurrentConcept({
      ...currentConcept,
      color_palette: { ...preset.palette }
    });
  };

  // Apply a copywriting preset
  const handleSelectCopyPreset = (preset: typeof PRESET_COPIES[0]) => {
    if (!currentConcept || !currentCompany) return;
    const city = currentCompany.city || 'João Pinheiro';
    const segment = currentCompany.segment || 'Serviços';

    const headline = preset.headlineTemplate
      .replace('{segment}', segment)
      .replace('{city}', city);
    const subheadline = preset.subheadlineTemplate
      .replace('{segment}', segment)
      .replace('{city}', city);
    const cta = preset.ctaTemplate;

    updateCurrentConcept({
      ...currentConcept,
      site_structure: {
        ...currentConcept.site_structure,
        hero: {
          headline,
          subheadline,
          cta_text: cta
        }
      }
    });
  };

  // Toggle active structure section
  const handleToggleSection = (sectionId: string) => {
    if (!currentConcept) return;
    const currentActive = currentConcept.active_sections || ['hero', 'social_proof', 'services', 'testimonials', 'location_cta'];
    let newActive: string[];
    if (currentActive.includes(sectionId)) {
      newActive = currentActive.filter(s => s !== sectionId);
    } else {
      newActive = [...currentActive, sectionId];
    }
    updateCurrentConcept({
      ...currentConcept,
      active_sections: newActive
    });
  };

  const copyHeadline = () => {
    if (currentConcept) {
      navigator.clipboard.writeText(`${currentConcept.site_structure.hero.headline}\n${currentConcept.site_structure.hero.subheadline}`);
      setCopiedHeadline(true);
      setTimeout(() => setCopiedHeadline(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      
      {/* If in PDF export view mode, render dedicated ConceptPDFView */}
      {viewMode === 'pdf_export' && currentConcept && currentCompany ? (
        <ConceptPDFView
          concept={currentConcept}
          company={currentCompany}
          onBack={() => setViewMode('editor')}
        />
      ) : (
        <>
          {/* Main Top Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900/80 p-6 rounded-3xl border border-navy-800 shadow-xl">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-accent mb-1">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>AGENTE: WEBSITE CONCEPT AI • MÚLTIPLAS OPÇÕES & CUSTOMIZADOR</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Estúdio de Demonstrações & Modelos de Sites
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Gere variações, customize estilos, paletas, estruturas e copie ou exporte o modelo diretamente em PDF.
              </p>
            </div>

            {/* Company Selector & Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-full sm:w-60">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Empresa em Prospecção:
                </label>
                <select
                  value={selectedCompanyId}
                  onChange={(e) => {
                    const newId = e.target.value;
                    setSelectedCompanyId(newId);
                    loadConceptsForCompany(newId);
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

              <Link
                href="/sites-salvos"
                className="px-3.5 py-2 mt-auto rounded-xl bg-navy-800 hover:bg-navy-700 text-gray-200 hover:text-white border border-navy-700 text-xs font-bold flex items-center space-x-1.5 transition-all"
                title="Acessar biblioteca de sites criados e salvos"
              >
                <FolderKanban className="w-4 h-4 text-accent" />
                <span>Meus Sites Salvos</span>
              </Link>

              {/* Botão para Salvar / Exportar em PDF */}
              <button
                onClick={() => setViewMode('pdf_export')}
                className="px-4 py-2 mt-auto rounded-xl bg-gradient-to-r from-accent to-blue-500 text-navy-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
                title="Salvar este modelo de site em PDF profissional"
              >
                <FileDown className="w-4 h-4 font-black" />
                <span>Salvar Modelo em PDF</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center space-y-4 bg-navy-900/40 rounded-3xl border border-navy-800">
              <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto" />
              <div className="text-base font-bold text-white">WEBSITE CONCEPT AI construindo opções de sites...</div>
              <div className="text-xs text-gray-400 max-w-md mx-auto">
                Desenvolvendo múltiplas opções visuais de alta conversão para {currentCompany?.name}.
              </div>
            </div>
          ) : currentConcept && currentCompany ? (
            <div className="space-y-8">
              
              {/* 1. SELETOR DE MÚLTIPLAS OPÇÕES / VARIAÇÕES DE SITES */}
              <div className="bg-navy-900/90 p-4 rounded-2xl border border-navy-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Opções de Sites Geradas ({concepts.length}):
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Alterne entre conceitos para comparar ou apresentar ao cliente
                    </span>
                  </div>

                  <button
                    onClick={handleAddNewOption}
                    disabled={generatingNew}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-accent hover:text-white border border-accent/25 text-xs font-semibold transition-all self-start sm:self-auto"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{generatingNew ? 'Gerando...' : '+ Gerar Nova Opção com IA'}</span>
                  </button>
                </div>

                {/* Tabs das Opções */}
                <div className="flex flex-wrap gap-2">
                  {concepts.map((c, idx) => {
                    const isSelected = idx === selectedConceptIndex;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedConceptIndex(idx)}
                        className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-accent text-navy-950 border-accent shadow-md shadow-accent/20'
                            : 'bg-navy-950 text-gray-300 border-navy-800 hover:border-gray-600'
                        }`}
                      >
                        <div
                          className="w-3 h-3 rounded-full border border-black/30"
                          style={{ backgroundColor: c.color_palette.primary }}
                        />
                        <span>{c.variant_title || `Opção ${idx + 1}`}</span>
                        {c.custom_badge && (
                          <span
                            className={`px-1.5 py-0.2 text-[9px] rounded-full font-black ${
                              isSelected ? 'bg-navy-950 text-accent' : 'bg-navy-800 text-gray-300'
                            }`}
                          >
                            {c.custom_badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. DEMONSTRAÇÃO VISUAL INTERATIVA (LIVE PREVIEW) */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-accent" />
                      <span>{currentConcept.variant_title || 'Conceito Selecionado'}</span>
                    </h2>
                    <p className="text-xs text-gray-400">
                      Visualização ao vivo com as cores, estrutura e copywriting configurados abaixo.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {saveFeedback && (
                      <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1 animate-pulse">
                        <Check className="w-3.5 h-3.5" />
                        <span>Alterações Salvas!</span>
                      </span>
                    )}

                    <button
                      onClick={() => setViewMode('pdf_export')}
                      className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-xs font-bold text-gray-200 border border-navy-700 flex items-center space-x-1.5 shadow"
                    >
                      <FileDown className="w-4 h-4 text-accent" />
                      <span>Exportar Este Modelo em PDF</span>
                    </button>
                  </div>
                </div>

                <LiveSitePreview concept={currentConcept} company={currentCompany} />
              </div>

              {/* 3. CENTRO DE PERSONALIZAÇÃO COM 10 PRÉ-OPÇÕES EM CADA DIMENSÃO */}
              <div className="bg-navy-900/90 rounded-3xl border border-navy-800 p-6 sm:p-8 space-y-6 shadow-xl">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-5">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center space-x-2">
                      <SlidersHorizontal className="w-5 h-5 text-accent" />
                      <span>Personalização Profissional do Conceito</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Escolha entre 10 opções pré-configuradas em cada pilar ou digite seus próprios textos e cores.
                    </p>
                  </div>

                  {/* Abas do Customizador */}
                  <div className="flex flex-wrap bg-navy-950 p-1 rounded-xl border border-navy-800 self-start sm:self-auto gap-1">
                    <button
                      onClick={() => setCustomizerTab('layout')}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        customizerTab === 'layout'
                          ? 'bg-accent text-navy-950 shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-accent fill-accent" />
                      <span>1. Layouts Pré-Moldados (5 Opções)</span>
                    </button>

                    <button
                      onClick={() => setCustomizerTab('style')}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        customizerTab === 'style'
                          ? 'bg-accent text-navy-950 shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>2. Estilos (10 Opções)</span>
                    </button>

                    <button
                      onClick={() => setCustomizerTab('colors')}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        customizerTab === 'colors'
                          ? 'bg-accent text-navy-950 shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      <span>3. Cores (10 Paletas)</span>
                    </button>

                    <button
                      onClick={() => setCustomizerTab('copy')}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        customizerTab === 'copy'
                          ? 'bg-accent text-navy-950 shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Type className="w-3.5 h-3.5" />
                      <span>4. Textos & Copy (10 Opções)</span>
                    </button>

                    <button
                      onClick={() => setCustomizerTab('structure')}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        customizerTab === 'structure'
                          ? 'bg-accent text-navy-950 shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>5. Estrutura (10 Módulos)</span>
                    </button>
                  </div>
                </div>

                {/* ABA 0: 5 LAYOUTS PRÉ-MOLDADOS RADICALMENTE DISTINTOS */}
                {customizerTab === 'layout' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-gray-300">
                        Escolha entre os 5 Layouts Pré-Moldados (Muda completamente a estrutura visual, tipografia e formato do site):
                      </div>
                      <span className="text-[11px] text-accent font-semibold">
                        Layout Atual: {(currentConcept.layout_type || 'luxury').toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                      {PRESET_LAYOUTS.map((layout) => {
                        const isSelected = (currentConcept.layout_type || 'luxury') === layout.id;
                        return (
                          <div
                            key={layout.id}
                            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                              isSelected
                                ? 'bg-navy-950 border-accent ring-2 ring-accent/60 shadow-lg shadow-accent/15'
                                : 'bg-navy-950/70 border-navy-800 hover:border-gray-600'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="h-24 rounded-xl overflow-hidden relative">
                                <img src={layout.sampleThumbnail} alt={layout.title} className="w-full h-full object-cover" />
                                <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-navy-950 text-accent border border-accent/30 shadow">
                                  {layout.badge}
                                </span>
                              </div>

                              <div className="font-extrabold text-xs text-white leading-tight">
                                {layout.title}
                              </div>

                              <div className="text-[10px] text-accent font-semibold">
                                Ideal para: {layout.bestFor}
                              </div>

                              <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3">
                                {layout.description}
                              </p>
                            </div>

                            <button
                              onClick={() => handleSelectLayout(layout)}
                              className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                                isSelected
                                  ? 'bg-accent text-navy-950 font-black shadow'
                                  : 'bg-navy-800 hover:bg-navy-700 text-gray-200'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{isSelected ? 'Layout Ativo' : 'Ativar Este Layout'}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* ABA 1.1: ESTILOS VISUAIS (10 OPÇÕES) */}
                {customizerTab === 'style' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-xs font-bold text-gray-300">
                        Selecione uma Direção Estética (10 Estilos Validados para Negócios Locais):
                      </div>
                      <span className="text-[11px] text-accent font-semibold">
                        Estilo Ativo: {currentConcept.custom_badge || 'Padrão'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      {PRESET_STYLES.map((style) => {
                        const isStyleSelected = 
                          currentConcept.style === style.description || 
                          currentConcept.custom_badge === style.badge ||
                          (currentConcept.style || '').toLowerCase().includes(style.name.toLowerCase());

                        return (
                          <button
                            key={style.id}
                            onClick={() => handleSelectStylePreset(style)}
                            className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-2 group ${
                              isStyleSelected
                                ? 'bg-navy-950 border-accent ring-2 ring-accent/60 shadow-lg shadow-accent/20'
                                : 'bg-navy-950/70 border-navy-800 hover:border-gray-600'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  isStyleSelected ? 'bg-accent text-navy-950 font-black' : 'bg-navy-800 text-accent'
                                }`}>
                                  {style.badge}
                                </span>
                                {isStyleSelected && (
                                  <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-0.5">
                                    <Check className="w-3 h-3" />
                                    <span>Ativo</span>
                                  </span>
                                )}
                              </div>
                              <div className="font-extrabold text-xs text-white mt-1 group-hover:text-accent transition-colors">
                                {style.name}
                              </div>
                              <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                                {style.description}
                              </p>
                            </div>

                            <div className="text-[10px] text-accent font-semibold flex items-center justify-between pt-1 border-t border-navy-900">
                              <span>{isStyleSelected ? '✓ Estilo Aplicado' : 'Clique para Aplicar'}</span>
                              <ChevronRight className="w-3 h-3" />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Campo para editar estilo manualmente */}
                    <div className="pt-3 border-t border-navy-800">
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Descrição Personalizada do Estilo:
                      </label>
                      <input
                        type="text"
                        value={currentConcept.style}
                        onChange={(e) => updateCurrentConcept({ ...currentConcept, style: e.target.value })}
                        className="w-full px-4 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                )}

                {/* ABA 2: PALETAS DE CORES (10 OPÇÕES + CUSTOMIZAÇÃO HEX) */}
                {customizerTab === 'colors' && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="text-xs font-bold text-gray-300">
                          Escolha uma das 10 Paletas de Cores Prontas:
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] text-gray-400">
                          <span>Cor Primária Atual:</span>
                          <div 
                            className="w-4 h-4 rounded-full border border-white/20 shadow-sm inline-block align-middle" 
                            style={{ backgroundColor: currentConcept.color_palette.primary }}
                          />
                          <span className="font-mono text-accent font-bold">{currentConcept.color_palette.primary}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {PRESET_PALETTES.map((pal) => {
                          const isPaletteSelected = 
                            currentConcept.color_palette.primary.toLowerCase() === pal.palette.primary.toLowerCase() &&
                            currentConcept.color_palette.accent.toLowerCase() === pal.palette.accent.toLowerCase();

                          return (
                            <button
                              key={pal.id}
                              onClick={() => handleSelectPalettePreset(pal)}
                              className={`p-3 rounded-2xl transition-all text-left space-y-2 group border ${
                                isPaletteSelected
                                  ? 'bg-navy-950 border-accent ring-2 ring-accent/60 shadow-lg shadow-accent/20'
                                  : 'bg-navy-950 border-navy-800 hover:border-accent/60'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white group-hover:text-accent truncate">
                                  {pal.name}
                                </span>
                                {isPaletteSelected && (
                                  <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-0.5">
                                    <Check className="w-3 h-3" />
                                  </span>
                                )}
                              </div>

                              <div className="grid grid-cols-5 gap-1">
                                {Object.entries(pal.palette).map(([k, hex]) => (
                                  <div
                                    key={k}
                                    className="h-6 rounded shadow-sm border border-white/10"
                                    style={{ backgroundColor: hex }}
                                    title={`${k}: ${hex}`}
                                  />
                                ))}
                              </div>

                              <div className="text-[10px] text-gray-400 font-mono flex items-center justify-between">
                                <span>{pal.tag}</span>
                                <span className={isPaletteSelected ? 'text-emerald-400 font-bold' : 'text-accent font-bold'}>
                                  {isPaletteSelected ? '✓ Ativa' : 'Aplicar'}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Customização Manual de Cores Individuais */}
                    <div className="pt-4 border-t border-navy-800 space-y-3">
                      <div className="text-xs font-bold text-gray-300">
                        Ajuste Fino de Cores (Altere os valores Hex diretamente):
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {Object.entries(currentConcept.color_palette).map(([key, hex]) => (
                          <div key={key} className="bg-navy-950 p-3 rounded-xl border border-navy-800 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-gray-400 uppercase">{key}</span>
                              <input
                                type="color"
                                value={hex}
                                onChange={(e) => {
                                  updateCurrentConcept({
                                    ...currentConcept,
                                    color_palette: {
                                      ...currentConcept.color_palette,
                                      [key]: e.target.value
                                    }
                                  });
                                }}
                                className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                              />
                            </div>
                            <input
                              type="text"
                              value={hex}
                              onChange={(e) => {
                                updateCurrentConcept({
                                  ...currentConcept,
                                  color_palette: {
                                    ...currentConcept.color_palette,
                                    [key]: e.target.value
                                  }
                                });
                              }}
                              className="w-full px-2 py-1 bg-navy-900 border border-navy-700 rounded text-[11px] font-mono text-white text-center"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ABA 3: TEXTOS & COPYWRITING (10 OPÇÕES PRÉ-DEFINIDAS + EDIÇÃO LIVRE) */}
                {customizerTab === 'copy' && (
                  <div className="space-y-6">
                    {/* 10 Opções de Ângulos de Venda */}
                    <div>
                      <div className="text-xs font-bold text-gray-300 mb-3">
                        Escolha entre 10 Ângulos de Copywriting de Alta Conversão (Clique para aplicar):
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        {PRESET_COPIES.map((copyPreset) => (
                          <button
                            key={copyPreset.id}
                            onClick={() => handleSelectCopyPreset(copyPreset)}
                            className="p-3 rounded-xl bg-navy-950 border border-navy-800 hover:border-accent text-left group transition-all space-y-1.5"
                          >
                            <span className="text-[10px] font-bold text-accent uppercase block">
                              {copyPreset.angle}
                            </span>
                            <p className="text-[11px] text-gray-300 italic line-clamp-2">
                              "{copyPreset.headlineTemplate.replace('{segment}', currentCompany.segment).replace('{city}', currentCompany.city)}"
                            </p>
                            <div className="text-[9px] text-gray-500 font-semibold group-hover:text-white">
                              + Aplicar esta headline
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Campos Editáveis Livres */}
                    <div className="pt-4 border-t border-navy-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-gray-300">
                          Edição Livre dos Textos do Site:
                        </div>
                        <button
                          onClick={copyHeadline}
                          className="text-xs text-gray-400 hover:text-accent flex items-center space-x-1"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedHeadline ? 'Copiado!' : 'Copiar Textos'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-accent uppercase mb-1">
                            Hero Headline (Título Principal)
                          </label>
                          <input
                            type="text"
                            value={currentConcept.site_structure.hero.headline}
                            onChange={(e) => {
                              updateCurrentConcept({
                                ...currentConcept,
                                site_structure: {
                                  ...currentConcept.site_structure,
                                  hero: {
                                    ...currentConcept.site_structure.hero,
                                    headline: e.target.value
                                  }
                                }
                              });
                            }}
                            className="w-full px-4 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-accent uppercase mb-1">
                            Subtítulo da Dobra Principal
                          </label>
                          <textarea
                            rows={2}
                            value={currentConcept.site_structure.hero.subheadline}
                            onChange={(e) => {
                              updateCurrentConcept({
                                ...currentConcept,
                                site_structure: {
                                  ...currentConcept.site_structure,
                                  hero: {
                                    ...currentConcept.site_structure.hero,
                                    subheadline: e.target.value
                                  }
                                }
                              });
                            }}
                            className="w-full px-4 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-emerald-400 uppercase mb-1">
                            Texto do Botão de WhatsApp (CTA)
                          </label>
                          <input
                            type="text"
                            value={currentConcept.site_structure.hero.cta_text}
                            onChange={(e) => {
                              updateCurrentConcept({
                                ...currentConcept,
                                site_structure: {
                                  ...currentConcept.site_structure,
                                  hero: {
                                    ...currentConcept.site_structure.hero,
                                    cta_text: e.target.value
                                  }
                                }
                              });
                            }}
                            className="w-full px-4 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ABA 4: ESTRUTURA (10 MÓDULOS DE SEÇÕES ATIVÁVEIS) */}
                {customizerTab === 'structure' && (
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-bold text-gray-300 mb-2">
                        Gerencie os 10 Módulos de Estrutura do Site (Ative ou desative seções conforme a estratégia):
                      </div>
                      <p className="text-[11px] text-gray-400 mb-4">
                        Personalize o que será apresentado para a empresa para fechar contratos mais rápidos.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {PRESET_STRUCTURE_SECTIONS.map((sec) => {
                          const activeList = currentConcept.active_sections || ['hero', 'social_proof', 'services', 'testimonials', 'location_cta'];
                          const isActive = activeList.includes(sec.id);

                          return (
                            <button
                              key={sec.id}
                              onClick={() => handleToggleSection(sec.id)}
                              className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                                isActive
                                  ? 'bg-navy-950 border-accent/70 shadow-sm shadow-accent/10'
                                  : 'bg-navy-950/40 border-navy-800 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                                    isActive ? 'bg-accent text-navy-950' : 'bg-navy-800 text-gray-400'
                                  }`}>
                                    {isActive ? '✓' : ''}
                                  </span>
                                  <span className="text-[9px] uppercase font-bold text-gray-500">
                                    {sec.category}
                                  </span>
                                </div>
                                <div className="font-bold text-xs text-white mt-1">
                                  {sec.label}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">
                                  {sec.description}
                                </p>
                              </div>

                              <div className="text-[10px] font-semibold text-accent pt-1">
                                {isActive ? 'Ativo no Site' : '+ Ativar Módulo'}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Serviços inclusos na estrutura */}
                    <div className="pt-4 border-t border-navy-800 space-y-3">
                      <div className="text-xs font-bold text-gray-300">
                        Vitrine de Serviços / Produtos Cadastrados neste Modelo:
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {currentConcept.site_structure.services.map((srv, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) => {
                                const newServices = [...currentConcept.site_structure.services];
                                newServices[idx] = { ...newServices[idx], title: e.target.value };
                                updateCurrentConcept({
                                  ...currentConcept,
                                  site_structure: {
                                    ...currentConcept.site_structure,
                                    services: newServices
                                  }
                                });
                              }}
                              className="w-full px-2.5 py-1.5 bg-navy-900 border border-navy-700 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-accent"
                            />
                            <textarea
                              rows={2}
                              value={srv.description}
                              onChange={(e) => {
                                const newServices = [...currentConcept.site_structure.services];
                                newServices[idx] = { ...newServices[idx], description: e.target.value };
                                updateCurrentConcept({
                                  ...currentConcept,
                                  site_structure: {
                                    ...currentConcept.site_structure,
                                    services: newServices
                                  }
                                });
                              }}
                              className="w-full px-2.5 py-1.5 bg-navy-900 border border-navy-700 rounded-lg text-[11px] text-gray-300 focus:outline-none focus:border-accent resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* 4. FOOTER COM ATALHOS PARA EXPORTAÇÃO EM PDF E MENSAGENS */}
              <div className="bg-navy-900/60 p-6 rounded-3xl border border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-extrabold text-white text-sm flex items-center space-x-2">
                    <FileDown className="w-4 h-4 text-accent" />
                    <span>Conceito Visual Finalizado!</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Salve este modelo de site em PDF ou gere mensagens de contato para apresentar para {currentCompany.name}.
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setViewMode('pdf_export')}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent to-blue-500 text-navy-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Printer className="w-4 h-4 font-black" />
                    <span>Salvar Modelo em PDF</span>
                  </button>

                  <Link
                    href={`/mensagens-venda?companyId=${selectedCompanyId}`}
                    className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs flex items-center space-x-1.5 border border-navy-700 transition-all"
                  >
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>Gerar Mensagem de Venda</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>

            </div>
          ) : null}
        </>
      )}

    </div>
  );
}

export default function ConceitoSitePage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-sm text-gray-400">
        Carregando Gerador de Conceito de Site...
      </div>
    }>
      <ConceitoSiteContent />
    </Suspense>
  );
}
