'use client';

import React, { useState } from 'react';
import { CRMLead, CRMStage } from '@/types';
import { 
  Users, 
  MessageSquare, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  ArrowRightCircle, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import Link from 'next/link';

interface CRMBoardProps {
  initialLeads: CRMLead[];
  onStageChange: (companyId: string, newStage: CRMStage, notes?: string) => void;
}

const STAGES: { id: CRMStage; label: string; color: string; badgeColor: string }[] = [
  { id: 'NOVO_LEAD', label: 'Novo Lead', color: 'border-blue-500/40', badgeColor: 'bg-blue-500/20 text-blue-300' },
  { id: 'CONTATO_REALIZADO', label: 'Contato Realizado', color: 'border-purple-500/40', badgeColor: 'bg-purple-500/20 text-purple-300' },
  { id: 'INTERESSADO', label: 'Interessado', color: 'border-amber-500/40', badgeColor: 'bg-amber-500/20 text-amber-300' },
  { id: 'PROPOSTA_ENVIADA', label: 'Proposta Enviada', color: 'border-cyan-500/40', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
  { id: 'FECHADO', label: 'Fechado 🚀', color: 'border-emerald-500/60', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
  { id: 'ENTREGUE', label: 'Entregue ✅', color: 'border-teal-500/40', badgeColor: 'bg-teal-500/20 text-teal-300' }
];

export default function CRMBoard({ initialLeads, onStageChange }: CRMBoardProps) {
  const [leads, setLeads] = useState<CRMLead[]>(initialLeads);
  const [search, setSearch] = useState('');

  const filteredLeads = leads.filter(l => 
    l.company_name.toLowerCase().includes(search.toLowerCase()) ||
    l.contact_name.toLowerCase().includes(search.toLowerCase()) ||
    l.notes.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdvance = (lead: CRMLead) => {
    const currentIndex = STAGES.findIndex(s => s.id === lead.stage);
    if (currentIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentIndex + 1].id;
      onStageChange(lead.company_id, nextStage);
      setLeads(prev => prev.map(item => item.id === lead.id ? { ...item, stage: nextStage } : item));
    }
  };

  const handleMoveBack = (lead: CRMLead) => {
    const currentIndex = STAGES.findIndex(s => s.id === lead.stage);
    if (currentIndex > 0) {
      const prevStage = STAGES[currentIndex - 1].id;
      onStageChange(lead.company_id, prevStage);
      setLeads(prev => prev.map(item => item.id === lead.id ? { ...item, stage: prevStage } : item));
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-navy-900/80 p-4 rounded-2xl border border-navy-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por empresa, contato ou nota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs text-gray-400">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-white">{filteredLeads.length}</span>
            <span>Leads no funil</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <span>R$ {filteredLeads.reduce((acc, curr) => acc + (curr.value || 0), 0).toLocaleString('pt-BR')}</span>
            <span className="text-gray-400 font-normal">no pipeline</span>
          </div>
        </div>
      </div>

      {/* Kanban Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 items-start">
        {STAGES.map((stage) => {
          const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
          const stageValue = stageLeads.reduce((acc, curr) => acc + (curr.value || 0), 0);

          return (
            <div
              key={stage.id}
              className="bg-navy-900/60 rounded-2xl p-3 border border-navy-800 flex flex-col min-h-[480px]"
            >
              {/* Stage Header */}
              <div className="pb-3 border-b border-navy-800 mb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">{stage.label}</h4>
                  <div className="text-[11px] text-accent font-semibold mt-0.5">
                    R$ {stageValue.toLocaleString('pt-BR')}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${stage.badgeColor}`}>
                  {stageLeads.length}
                </span>
              </div>

              {/* Leads Column Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[680px] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="text-center py-10 px-2 text-[11px] text-gray-500 italic">
                    Nenhum lead nesta etapa
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className={`p-3.5 rounded-xl bg-navy-950/90 border ${stage.color} hover:border-accent/60 transition-all duration-150 shadow-sm space-y-2.5`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-extrabold text-white text-xs leading-snug">
                            {lead.company_name}
                          </div>
                          <div className="text-[11px] text-gray-400 font-medium">
                            {lead.contact_name}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-emerald-400">
                            R$ {lead.value?.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>

                      {/* Notes / Status message */}
                      <p className="text-[11px] text-gray-300 bg-navy-900/70 p-2 rounded-lg border border-navy-800/80 leading-relaxed line-clamp-3">
                        {lead.notes}
                      </p>

                      {/* Phone & Date */}
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-navy-900">
                        <span className="font-mono">{lead.phone}</span>
                        <span>{new Date(lead.updated_at || lead.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center justify-between gap-1 pt-1">
                        <a
                          href={`https://wa.me/55${lead.phone?.replace(/\D/g, '') || ''}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 text-[10px] flex items-center space-x-1"
                          title="Abrir WhatsApp"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span className="hidden sm:inline">Whats</span>
                        </a>

                        <div className="flex items-center space-x-1">
                          {stage.id !== 'NOVO_LEAD' && (
                            <button
                              onClick={() => handleMoveBack(lead)}
                              className="px-2 py-1 rounded bg-navy-800 text-gray-400 hover:text-white text-[10px] font-bold"
                              title="Voltar etapa"
                            >
                              ←
                            </button>
                          )}
                          {stage.id !== 'ENTREGUE' && (
                            <button
                              onClick={() => handleAdvance(lead)}
                              className="px-2 py-1 rounded bg-accent/20 text-accent hover:bg-accent hover:text-navy-950 font-bold text-[10px] flex items-center space-x-1 transition-colors"
                              title="Avançar etapa no pipeline"
                            >
                              <span>Avançar</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
