'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  FileText, 
  Sparkles, 
  Printer, 
  CheckCircle2, 
  RefreshCw, 
  Users2, 
  DollarSign, 
  ArrowRight,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { store } from '@/lib/store';
import { AIService } from '@/lib/aiService';
import { Company, Proposal } from '@/types';
import ProposalView from '@/components/ProposalView';

function PropostasContent() {
  const searchParams = useSearchParams();
  const companyIdParam = searchParams.get('companyId');

  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(false);
  const [crmSynced, setCrmSynced] = useState(false);

  useEffect(() => {
    const list = store.getCompanies();
    setCompanies(list);

    if (list.length > 0) {
      const targetId = (companyIdParam && list.some(c => c.id === companyIdParam))
        ? companyIdParam
        : list[0].id;
      
      setSelectedCompanyId(targetId);
      const existing = store.getProposal(targetId);
      if (existing) {
        setProposal(existing);
      } else {
        handleGenerateProposal(targetId);
      }
    }
  }, [companyIdParam]);

  const handleGenerateProposal = async (cId?: string) => {
    const targetId = cId || selectedCompanyId;
    const company = companies.find(c => c.id === targetId) || store.getCompanyById(targetId);
    if (!company) return;

    setLoading(true);
    try {
      const analysis = store.getAnalysis(targetId) || undefined;
      const result = await AIService.generateProposal(company, analysis);
      store.saveProposal(result);
      setProposal(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvanceToCRM = () => {
    if (selectedCompanyId) {
      store.updateCRMStage(selectedCompanyId, 'PROPOSTA_ENVIADA', 'Proposta comercial completa gerada e enviada para o cliente.');
      setCrmSynced(true);
      setTimeout(() => setCrmSynced(false), 3000);
    }
  };

  const currentCompany = companies.find(c => c.id === selectedCompanyId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      
      {/* Header (no-print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900/80 p-6 rounded-3xl border border-navy-800">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-accent mb-1">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>AGENTE: PROPOSAL AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Gerador de Proposta Comercial Profissional
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Estrutura executiva com capa, diagnóstico, entrega, prazos, investimento e botão de exportação em PDF.
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
                const existing = store.getProposal(newId);
                if (existing) setProposal(existing);
                else handleGenerateProposal(newId);
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
            href="/configuracoes"
            className="w-full sm:w-auto px-3.5 py-2 mt-auto rounded-xl bg-navy-800 hover:bg-navy-700 text-gray-200 border border-navy-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
            title="Editar Valores dos Planos em Configurações"
          >
            <Settings className="w-3.5 h-3.5 text-accent" />
            <span>Editar Valores</span>
          </Link>

          <button
            onClick={() => handleGenerateProposal()}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 mt-auto rounded-xl bg-accent text-navy-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Calculando...' : 'Regerar Proposta'}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-4 bg-navy-900/40 rounded-3xl border border-navy-800">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto" />
          <div className="text-base font-bold text-white">PROPOSAL AI estruturando a proposta comercial...</div>
          <div className="text-xs text-gray-400 max-w-md mx-auto">
            Configurando escopo de entregáveis, cronograma executivo e opções de investimento para {currentCompany?.name}.
          </div>
        </div>
      ) : proposal ? (
        <div className="space-y-8">
          
          {/* Document Preview & PDF Engine */}
          <ProposalView proposal={proposal} company={currentCompany} />

          {/* CRM Action Bar (no-print) */}
          <div className="no-print bg-navy-900/80 p-6 rounded-3xl border border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-extrabold text-white text-sm flex items-center space-x-2">
                <Users2 className="w-4 h-4 text-accent" />
                <span>Atualizar Funil de Vendas</span>
              </div>
              <div className="text-xs text-gray-400">
                Mova o lead de {proposal.company_name} para a coluna "Proposta Enviada" no CRM.
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleAdvanceToCRM}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{crmSynced ? '✓ Atualizado no CRM!' : 'Marcar "Proposta Enviada"'}</span>
              </button>

              <Link
                href="/crm"
                className="px-4 py-2.5 rounded-xl bg-accent text-navy-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-accent/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Acompanhar no CRM</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      ) : null}

    </div>
  );
}

export default function PropostasPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-sm text-gray-400">
        Carregando Gerador de Proposta Comercial...
      </div>
    }>
      <PropostasContent />
    </Suspense>
  );
}
