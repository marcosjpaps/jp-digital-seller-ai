'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users2, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  Building2, 
  PlusCircle, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { store } from '@/lib/store';
import { CRMLead, CRMStage } from '@/types';
import CRMBoard from '@/components/CRMBoard';

export default function CRMPage() {
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [stats, setStats] = useState({
    closedRevenue: 0,
    pipelineRevenue: 0,
    closedClients: 0,
    totalLeads: 0
  });

  useEffect(() => {
    loadCRMData();
  }, []);

  const loadCRMData = () => {
    const list = store.getCRMLeads();
    setLeads(list);

    const closed = list.filter(l => ['FECHADO', 'ENTREGUE'].includes(l.stage));
    const pipeline = list.filter(l => !['FECHADO', 'ENTREGUE'].includes(l.stage));

    setStats({
      closedRevenue: closed.reduce((acc, curr) => acc + (curr.value || 0), 0),
      pipelineRevenue: pipeline.reduce((acc, curr) => acc + (curr.value || 0), 0),
      closedClients: closed.length,
      totalLeads: list.length
    });
  };

  const handleStageChange = (companyId: string, newStage: CRMStage, notes?: string) => {
    store.updateCRMStage(companyId, newStage, notes);
    loadCRMData();
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900/80 p-6 rounded-3xl border border-navy-800">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-accent mb-1">
            <Users2 className="w-4 h-4" />
            <span>MÓDULO: CRM DE VENDAS DIGITAIS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pipeline de Clientes & Fechamento de Sites
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Acompanhe cada oportunidade desde o primeiro contato até o fechamento e entrega final.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/empresas/novo"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent text-navy-950 font-black text-xs shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4 font-black" />
            <span>+ Adicionar Lead</span>
          </Link>
        </div>
      </div>

      {/* Mini Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-navy-800">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Total em Pipeline
          </div>
          <div className="text-2xl font-black text-white mt-2">
            R$ {stats.pipelineRevenue.toLocaleString('pt-BR')}
          </div>
          <p className="text-[11px] text-accent mt-1">Oportunidades ativas em João Pinheiro</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
            <span>Faturamento Fechado</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            R$ {stats.closedRevenue.toLocaleString('pt-BR')}
          </div>
          <p className="text-[11px] text-gray-300 mt-1">{stats.closedClients} contratos assinados</p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/70 border border-navy-800">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Ticket Médio
          </div>
          <div className="text-2xl font-black text-white mt-2">
            R$ {(stats.totalLeads > 0 ? Math.round((stats.closedRevenue + stats.pipelineRevenue) / stats.totalLeads) : 1850).toLocaleString('pt-BR')}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Por site profissional vendido</p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/70 border border-navy-800">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Etapas Ativas
          </div>
          <div className="text-2xl font-black text-white mt-2">6 Fases</div>
          <p className="text-[11px] text-gray-400 mt-1">Do Novo Lead à Entrega</p>
        </div>

      </div>

      {/* Interactive Kanban Board */}
      <CRMBoard initialLeads={leads} onStageChange={handleStageChange} />

    </div>
  );
}
