'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, 
  Search, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle, 
  Phone, 
  Compass, 
  Filter, 
  ArrowRight,
  Star,
  Building2,
  AlertTriangle,
  Zap,
  Flame,
  Check
} from 'lucide-react';
import { store } from '@/lib/store';
import { ProspectLead, Company } from '@/types';
import OpportunityBadge from '@/components/OpportunityBadge';

const PRESET_SEGMENTS = [
  'Restaurantes & Gastronomia',
  'Odontologia & Clínicas',
  'Imobiliárias & Corretores',
  'Moda & Lojas de Roupas',
  'Oficinas & Centro Automotivo',
  'Beleza, Cabelo & Estética'
];

export default function RadarMapsPage() {
  const router = useRouter();
  const [city, setCity] = useState('João Pinheiro - MG');
  const [segment, setSegment] = useState('Restaurantes & Gastronomia');
  const [onlyWithoutSite, setOnlyWithoutSite] = useState(true);
  const [allLeads, setAllLeads] = useState<ProspectLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [importedIds, setImportedIds] = useState<Record<string, boolean>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Instant client-side filtering for 0ms response when clicking toggle
  const visibleLeads = onlyWithoutSite 
    ? allLeads.filter(l => !l.has_website) 
    : allLeads;

  useEffect(() => {
    try {
      const s = store.getSettings();
      if (s?.agency?.city) {
        setCity(s.agency.city);
      }
    } catch {}
    // Trigger initial scan fetching all leads so toggle can switch between both states
    scanMaps('João Pinheiro - MG', 'Restaurantes & Gastronomia');
  }, []);

  const scanMaps = async (searchCity = city, searchSegment = segment) => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/maps/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: searchCity,
          segment: searchSegment,
          onlyWithoutSite: false // fetch all so toggle can show/hide with 0ms delay
        })
      });
      const data = await res.json();
      if (data.leads) {
        setAllLeads(data.leads);
        setGoogleMapsUrl(data.google_maps_search_query_url || '');
      }
    } catch (err) {
      console.error('Erro ao buscar empresas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (lead: ProspectLead, andCreateConcept = false) => {
    const newCompany: Company = {
      id: `emp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: lead.name,
      segment: lead.segment,
      city: lead.city,
      whatsapp: lead.whatsapp || '',
      google_maps_link: lead.google_maps_url || '',
      current_site: lead.current_site || '',
      description: `Empresa mapeada via Radar Google Maps em ${lead.city}. ${lead.opportunity_reason}`,
      stage: 'NOVO_LEAD',
      created_at: new Date().toISOString(),
      photos: lead.photo ? [lead.photo] : []
    };

    // Save in local store
    store.saveCompany(newCompany);

    // Save in Neon PostgreSQL server
    try {
      fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany)
      }).catch(() => {});
    } catch {}

    setImportedIds(prev => ({ ...prev, [lead.id]: true }));
    setStatusMessage(`Empresa "${lead.name}" importada com sucesso para sua lista!`);

    if (andCreateConcept) {
      setTimeout(() => {
        router.push(`/conceito-site?company_id=${newCompany.id}`);
      }, 500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 p-6 sm:p-8 rounded-3xl border border-navy-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold border border-accent/25">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Radar de Prospecção Google Maps Ativado</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Encontrar Empresas no <span className="text-accent">Google Maps</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            O robô vasculha os comércios da sua região e identifica negócios que <strong>NÃO possuem site próprio</strong> ou estão com presença digital fraca. Importe-os com 1 clique e gere conceitos de sites profissionais na hora.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-navy-900/90 rounded-3xl border border-navy-800 p-6 space-y-5 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* City */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Cidade de Busca:</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ex: João Pinheiro - MG"
              className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>

          {/* Segment */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center space-x-1.5">
              <Filter className="w-3.5 h-3.5 text-accent" />
              <span>Nicho / Ramo de Atuação:</span>
            </label>
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent"
            >
              {PRESET_SEGMENTS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <button
              onClick={() => scanMaps(city, segment)}
              disabled={loading}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-accent to-blue-600 text-navy-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>Escanear Google Maps</span>
                </>
              )}
            </button>

            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-gray-200 border border-navy-700 hover:border-accent/40 text-xs font-bold transition-colors flex items-center space-x-1.5 flex-shrink-0"
                title="Abrir pesquisa oficial no Google Maps"
              >
                <span>Ver no Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
              </a>
            )}
          </div>
        </div>

        {/* Quick Segment Chips & Custom Filter Toggle */}
        <div className="pt-3 border-t border-navy-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400 mr-1 flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-accent" />
              <span>Nichos Rápidos:</span>
            </span>
            {PRESET_SEGMENTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSegment(s);
                  scanMaps(city, s);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  segment === s
                    ? 'bg-accent text-navy-950 font-bold'
                    : 'bg-navy-950 text-gray-300 hover:text-white border border-navy-800 hover:border-navy-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Interactive Toggle Button for Golden Opportunities */}
          <button
            type="button"
            onClick={() => setOnlyWithoutSite(!onlyWithoutSite)}
            className={`flex items-center space-x-3 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
              onlyWithoutSite
                ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 hover:bg-amber-500/25'
                : 'bg-navy-950 border-navy-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
            }`}
            title="Clique para alternar o filtro de empresas sem site"
          >
            {/* Visual Animated Switch */}
            <div className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 pointer-events-none ${
              onlyWithoutSite ? 'bg-amber-500' : 'bg-navy-800 border border-navy-700'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                onlyWithoutSite ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </div>

            <div className="flex items-center space-x-2 pointer-events-none">
              <span className="font-extrabold tracking-wide">
                Apenas empresas SEM site (Oportunidades de Ouro)
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                onlyWithoutSite 
                  ? 'bg-amber-500 text-navy-950' 
                  : 'bg-navy-800 text-gray-400 border border-navy-700'
              }`}>
                {onlyWithoutSite ? 'ATIVO' : 'TODAS'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Success notification */}
      {statusMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Leads Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-black text-white">
              Empresas Encontradas ({visibleLeads.length} de {allLeads.length})
            </h2>
            {onlyWithoutSite && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Filtrado: Apenas Sem Site
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400 font-mono">
            Radar em: <strong className="text-white">{city}</strong> • {segment}
          </span>
        </div>

        {visibleLeads.length === 0 && !loading && (
          <div className="p-12 text-center bg-navy-900/50 rounded-3xl border border-navy-800 space-y-3">
            <Compass className="w-10 h-10 text-gray-600 mx-auto" />
            <p className="text-sm font-bold text-gray-400">
              Nenhuma empresa encontrada com os filtros selecionados.
            </p>
            <p className="text-xs text-gray-500">
              Tente selecionar outro nicho ou desmarcar o filtro de &quot;apenas empresas sem site&quot;.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleLeads.map((lead) => {
            const isImported = importedIds[lead.id];

            return (
              <div
                key={lead.id}
                className="bg-navy-900/80 rounded-2xl border border-navy-800 hover:border-accent/40 p-5 space-y-4 flex flex-col justify-between shadow-xl transition-all"
              >
                <div className="space-y-3">
                  
                  {/* Header: Name & Opportunity Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-extrabold text-white leading-tight">
                        {lead.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs text-accent mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate">{lead.address}</span>
                      </div>
                    </div>
                    <OpportunityBadge score={lead.opportunity_score} level="Alta oportunidade" />
                  </div>

                  {/* Google Reviews & Website status */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    {lead.rating && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{lead.rating.toFixed(1)}</span>
                        <span className="text-gray-400 text-[10px]">({lead.reviews_count} avaliações)</span>
                      </span>
                    )}

                    {!lead.has_website ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 font-bold border border-rose-500/30">
                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                        <span>SEM SITE PRÓPRIO</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30">
                        <Globe className="w-3 h-3 text-amber-400" />
                        <span>Site Desatualizado</span>
                      </span>
                    )}
                  </div>

                  {/* Why this is an opportunity */}
                  <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800/80 text-xs text-gray-300 space-y-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                      Diagnóstico do Radar:
                    </span>
                    <p className="leading-relaxed line-clamp-3">
                      {lead.opportunity_reason}
                    </p>
                  </div>

                  {/* Phone & Maps Link */}
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                    <div className="flex items-center space-x-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5 text-accent" />
                      <span>{lead.phone}</span>
                    </div>

                    <a
                      href={lead.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline flex items-center space-x-1 font-semibold"
                    >
                      <span>Abrir no Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>

                {/* Actions */}
                <div className="space-y-2 pt-3 border-t border-navy-800">
                  <button
                    type="button"
                    onClick={() => handleImport(lead, true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-accent to-blue-600 text-navy-950 font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Zap className="w-4 h-4 fill-navy-950" />
                    <span>Criar Conceito de Site Agora</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleImport(lead, false)}
                    disabled={isImported}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      isImported
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-navy-800 hover:bg-navy-700 text-gray-300 border border-navy-700 hover:text-white'
                    }`}
                  >
                    {isImported ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Empresa Salva na Lista</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Apenas Importar para CRM</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
