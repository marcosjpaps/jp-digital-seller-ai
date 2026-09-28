'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  PlusCircle, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Send, 
  FileText, 
  Trash2, 
  MapPin, 
  Globe, 
  Phone,
  Compass
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { store } from '@/lib/store';
import { Company } from '@/types';
import OpportunityBadge from '@/components/OpportunityBadge';

export default function EmpresasPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCompanies(store.getCompanies());
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Deseja realmente remover a empresa "${name}"?`)) {
      store.deleteCompany(id);
      setCompanies(store.getCompanies());
    }
  };

  const filtered = companies.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.segment.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-accent" />
            <span>Empresas Cadastradas</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Gerencie os negócios locais mapeados para prospecção e venda de sites.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <Link
            href="/radar-maps"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent to-blue-600 text-navy-950 font-black text-xs shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Radar Google Maps</span>
          </Link>

          <Link
            href="/empresas/novo"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white border border-navy-700 font-bold text-xs hover:border-accent/40 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-accent" />
            <span>Cadastro Manual</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-navy-900/80 p-4 rounded-2xl border border-navy-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, segmento ou cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
        </div>

        <div className="text-xs text-gray-400">
          Mostrando <strong className="text-white">{filtered.length}</strong> de {companies.length} empresas
        </div>
      </div>

      {/* Grid of Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((company) => {
          const analysis = store.getAnalysis(company.id);
          const score = analysis?.digital_score || 85;

          return (
            <div
              key={company.id}
              className="p-5 rounded-2xl bg-navy-900/70 border border-navy-800 hover:border-accent/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-snug">
                      {company.name}
                    </h3>
                    <div className="text-xs text-accent font-medium mt-0.5">
                      {company.segment}
                    </div>
                  </div>
                  <OpportunityBadge score={score} level={analysis?.opportunity_level} />
                </div>

                <div className="flex items-center text-[11px] text-gray-400 mt-2 space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                  <span className="truncate">{company.city}</span>
                </div>

                {company.description && (
                  <p className="mt-3 text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {company.description}
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-navy-800/80 space-y-1.5 text-xs text-gray-400">
                  {company.instagram && (
                    <div className="flex items-center space-x-2">
                      <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                      <span className="font-mono text-[11px] text-gray-300">{company.instagram}</span>
                    </div>
                  )}
                  {company.whatsapp && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-mono text-[11px] text-gray-300">{company.whatsapp}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] text-gray-300">
                      {company.current_site ? (
                        <span className="text-amber-400 font-mono truncate">{company.current_site}</span>
                      ) : (
                        <span className="text-rose-400 font-semibold">Sem site próprio</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-navy-800 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-1.5">
                  <Link
                    href={`/analista-ia?companyId=${company.id}`}
                    className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-accent text-xs font-semibold"
                    title="Análise IA"
                  >
                    <Sparkles className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/mensagens-venda?companyId=${company.id}`}
                    className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-emerald-400 text-xs font-semibold"
                    title="Mensagens de Venda"
                  >
                    <Send className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/propostas?companyId=${company.id}`}
                    className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-cyan-400 text-xs font-semibold"
                    title="Proposta Comercial"
                  >
                    <FileText className="w-4 h-4" />
                  </Link>
                </div>

                <button
                  onClick={() => handleDelete(company.id, company.name)}
                  className="p-2 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-navy-800/80 transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
