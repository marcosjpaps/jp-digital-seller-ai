'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  DollarSign, 
  Building2, 
  Layers, 
  Bot, 
  Save, 
  RotateCcw, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  HelpCircle,
  FileText,
  Zap,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Clock,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { store } from '@/lib/store';
import { AppSettings, DEFAULT_APP_SETTINGS, ProposalTier, ConceptLayoutType } from '@/types';
import Link from 'next/link';

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_APP_SETTINGS);
  const [activeTab, setActiveTab] = useState<'proposals' | 'agency' | 'deliverables' | 'ai'>('proposals');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  useEffect(() => {
    const loaded = store.getSettings();
    setSettings(loaded);
  }, []);

  const handleSave = () => {
    store.saveSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    const restored = store.resetSettings();
    setSettings(restored);
    setResetModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Helper to update proposal tier
  const updateTier = (index: number, updated: Partial<ProposalTier>) => {
    const newTiers = [...settings.proposal.tiers];
    newTiers[index] = { ...newTiers[index], ...updated };
    setSettings({
      ...settings,
      proposal: {
        ...settings.proposal,
        tiers: newTiers
      }
    });
  };

  // Add feature to tier
  const addTierFeature = (tierIndex: number) => {
    const newTiers = [...settings.proposal.tiers];
    newTiers[tierIndex].features.push('Novo benefício incluso');
    setSettings({
      ...settings,
      proposal: {
        ...settings.proposal,
        tiers: newTiers
      }
    });
  };

  // Remove feature from tier
  const removeTierFeature = (tierIndex: number, featureIndex: number) => {
    const newTiers = [...settings.proposal.tiers];
    newTiers[tierIndex].features = newTiers[tierIndex].features.filter((_, i) => i !== featureIndex);
    setSettings({
      ...settings,
      proposal: {
        ...settings.proposal,
        tiers: newTiers
      }
    });
  };

  // Update feature text
  const updateTierFeature = (tierIndex: number, featureIndex: number, text: string) => {
    const newTiers = [...settings.proposal.tiers];
    newTiers[tierIndex].features[featureIndex] = text;
    setSettings({
      ...settings,
      proposal: {
        ...settings.proposal,
        tiers: newTiers
      }
    });
  };

  // Deliverables helpers
  const addDeliverable = () => {
    setSettings({
      ...settings,
      proposal: {
        ...settings.proposal,
        default_deliverables: [...settings.proposal.default_deliverables, 'Novo entregável ou serviço no pacote']
      }
    });
  };

  const removeDeliverable = (index: number) => {
    setSettings({
      ...settings,
      proposal: {
        ...settings.proposal,
        default_deliverables: settings.proposal.default_deliverables.filter((_, i) => i !== index)
      }
    });
  };

  const updateDeliverable = (index: number, text: string) => {
    const newDelivs = [...settings.proposal.default_deliverables];
    newDelivs[index] = text;
    setSettings({
      ...settings,
      proposal: {
        ...settings.proposal,
        default_deliverables: newDelivs
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900/90 p-6 sm:p-8 rounded-3xl border border-navy-800 shadow-xl relative overflow-hidden">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-accent mb-1.5">
            <Settings className="w-4 h-4 text-accent" />
            <span>CENTRAL DE CONFIGURAÇÕES GLOBAIS DO SISTEMA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Personalização do Negócio & Valores
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
            Configure os preços das propostas, dados da sua agência/vendedor, prazos de entrega, forma de pagamento e diretrizes da IA. Todas as alterações são aplicadas imediatamente em todo o sistema.
          </p>
        </div>

        {/* Global Save Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setResetModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-gray-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-navy-700"
            title="Restaurar valores de fábrica"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-navy-950 font-black text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Salvo com Sucesso!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Salvar Configurações</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="flex flex-wrap gap-2 border-b border-navy-800 pb-2">
        <button
          onClick={() => setActiveTab('proposals')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'proposals'
              ? 'bg-accent text-navy-950 shadow-md shadow-accent/15'
              : 'text-gray-400 hover:text-white hover:bg-navy-900/60'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>1. Valores & Planos de Venda (Propostas)</span>
        </button>

        <button
          onClick={() => setActiveTab('agency')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'agency'
              ? 'bg-accent text-navy-950 shadow-md shadow-accent/15'
              : 'text-gray-400 hover:text-white hover:bg-navy-900/60'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>2. Dados da Sua Agência / Vendedor</span>
        </button>

        <button
          onClick={() => setActiveTab('deliverables')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'deliverables'
              ? 'bg-accent text-navy-950 shadow-md shadow-accent/15'
              : 'text-gray-400 hover:text-white hover:bg-navy-900/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>3. Escopo & Entregáveis do Site</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ai'
              ? 'bg-accent text-navy-950 shadow-md shadow-accent/15'
              : 'text-gray-400 hover:text-white hover:bg-navy-900/60'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>4. Comportamento da IA & Padrões</span>
        </button>
      </div>

      {/* ABA 1: VALORES E PLANOS DA PROPOSTA COMERCIAL */}
      {activeTab === 'proposals' && (
        <div className="space-y-6">
          <div className="bg-navy-900/80 p-6 rounded-2xl border border-navy-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-accent" />
                  <span>Configuração dos 3 Planos Comerciais</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Estes valores e benefícios serão inseridos automaticamente nas Propostas Comerciais e nos relatórios de vendas gerados pelo sistema.
                </p>
              </div>
            </div>

            {/* Cards dos 3 Planos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {settings.proposal.tiers.map((tier, tIdx) => (
                <div 
                  key={tIdx} 
                  className={`p-5 rounded-2xl border bg-navy-950/80 flex flex-col justify-between space-y-4 relative ${
                    tier.popular ? 'border-accent shadow-lg shadow-accent/10 ring-1 ring-accent' : 'border-navy-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Plano {tIdx + 1}
                      </span>
                      <label className="flex items-center space-x-1.5 cursor-pointer text-[10px] font-semibold text-gray-400 hover:text-white">
                        <input
                          type="checkbox"
                          checked={Boolean(tier.popular)}
                          onChange={(e) => updateTier(tIdx, { popular: e.target.checked })}
                          className="rounded text-accent focus:ring-0 w-3 h-3 bg-navy-900 border-navy-700 cursor-pointer"
                        />
                        <span>Mais Popular / Destaque</span>
                      </label>
                    </div>

                    {/* Nome do Plano */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">
                        Nome do Plano:
                      </label>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => updateTier(tIdx, { name: e.target.value })}
                        className="w-full px-3 py-2 bg-navy-900 border border-navy-700 rounded-xl text-xs text-white font-bold focus:border-accent focus:outline-none"
                      />
                    </div>

                    {/* Preço de Venda */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">
                        Valor de Venda (R$):
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={tier.price}
                          onChange={(e) => updateTier(tIdx, { price: e.target.value })}
                          className="w-full px-3 py-2 bg-navy-900 border border-navy-700 rounded-xl text-sm text-accent font-black focus:border-accent focus:outline-none"
                          placeholder="R$ 1.850,00"
                        />
                      </div>
                    </div>

                    {/* Benefícios Inclusos */}
                    <div className="space-y-2 pt-2 border-t border-navy-800/80">
                      <div className="flex items-center justify-between text-[11px] font-bold text-gray-300">
                        <span>Benefícios Inclusos:</span>
                        <button
                          type="button"
                          onClick={() => addTierFeature(tIdx)}
                          className="text-accent hover:underline text-[10px] flex items-center space-x-0.5"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Adicionar</span>
                        </button>
                      </div>

                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {tier.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-1.5">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => updateTierFeature(tIdx, fIdx, e.target.value)}
                              className="flex-1 px-2.5 py-1 bg-navy-900/90 border border-navy-800 rounded-lg text-[11px] text-gray-200 focus:border-accent focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => removeTierFeature(tIdx, fIdx)}
                              className="p-1 text-gray-500 hover:text-rose-400 transition-colors"
                              title="Remover benefício"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Condições Comerciais Gerais */}
          <div className="bg-navy-900/80 p-6 rounded-2xl border border-navy-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>Condições Padrão da Proposta Comercial</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-300 mb-1">
                  Prazo de Entrega do Site:
                </label>
                <input
                  type="text"
                  value={settings.proposal.timeline}
                  onChange={(e) => setSettings({
                    ...settings,
                    proposal: { ...settings.proposal, timeline: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
                  placeholder="5 a 7 dias úteis após o envio dos materiais"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 mb-1">
                  Condições de Pagamento Padrão:
                </label>
                <input
                  type="text"
                  value={settings.proposal.payment_terms}
                  onChange={(e) => setSettings({
                    ...settings,
                    proposal: { ...settings.proposal, payment_terms: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
                  placeholder="50% entrada + 50% na aprovação ou 12x no cartão"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 mb-1">
                  Mensalidade de Manutenção Sugerida:
                </label>
                <input
                  type="text"
                  value={settings.proposal.maintenance_price}
                  onChange={(e) => setSettings({
                    ...settings,
                    proposal: { ...settings.proposal, maintenance_price: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
                  placeholder="R$ 97,00/mês"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: DADOS DA AGÊNCIA / VENDEDOR */}
      {activeTab === 'agency' && (
        <div className="bg-navy-900/80 p-6 rounded-2xl border border-navy-800 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-accent" />
              <span>Identidade da Sua Agência ou Perfil de Vendedor</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Estes dados aparecerão no cabeçalho das propostas, nas assinaturas de mensagens de WhatsApp, e-mails e dossiês de PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1 flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-accent" />
                <span>Nome da Agência / Marca Comercial:</span>
              </label>
              <input
                type="text"
                value={settings.agency.name}
                onChange={(e) => setSettings({
                  ...settings,
                  agency: { ...settings.agency, name: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
                placeholder="Ex: JP DIGITAL SELLER AI ou Sua Agência Web"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Nome do Vendedor / Consultor:</span>
              </label>
              <input
                type="text"
                value={settings.agency.seller_name}
                onChange={(e) => setSettings({
                  ...settings,
                  agency: { ...settings.agency, seller_name: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
                placeholder="Ex: Marco Silva ou Consultor Especialista"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Cidade Padrão de Prospecção:</span>
              </label>
              <input
                type="text"
                value={settings.agency.city}
                onChange={(e) => setSettings({
                  ...settings,
                  agency: { ...settings.agency, city: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
                placeholder="Ex: João Pinheiro - MG"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1 flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>WhatsApp Oficial do Vendedor:</span>
              </label>
              <input
                type="text"
                value={settings.agency.whatsapp}
                onChange={(e) => setSettings({
                  ...settings,
                  agency: { ...settings.agency, whatsapp: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
                placeholder="(38) 99999-8877"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>E-mail Profissional:</span>
              </label>
              <input
                type="email"
                value={settings.agency.email}
                onChange={(e) => setSettings({
                  ...settings,
                  agency: { ...settings.agency, email: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
                placeholder="contato@seunegocio.com.br"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1 flex items-center space-x-1.5">
                <CreditCard className="w-3.5 h-3.5 text-accent" />
                <span>Chave Pix para Recebimento:</span>
              </label>
              <input
                type="text"
                value={settings.agency.pix_key}
                onChange={(e) => setSettings({
                  ...settings,
                  agency: { ...settings.agency, pix_key: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
                placeholder="CPF, CNPJ, Telefone ou E-mail Pix"
              />
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: ESCOPO & ENTREGÁVEIS DO SITE */}
      {activeTab === 'deliverables' && (
        <div className="bg-navy-900/80 p-6 rounded-2xl border border-navy-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-accent" />
                <span>Entregáveis Padrão da Proposta Comercial</span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Estes são os itens do escopo técnico que descrevem tudo o que está incluso no serviço contratado pelo cliente.
              </p>
            </div>

            <button
              onClick={addDeliverable}
              className="px-3.5 py-2 rounded-xl bg-accent text-navy-950 font-bold text-xs flex items-center space-x-1 shadow active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Item</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {settings.proposal.default_deliverables.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 bg-navy-950 p-2.5 rounded-xl border border-navy-800">
                <span className="w-6 h-6 rounded-full bg-navy-900 text-accent font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateDeliverable(idx, e.target.value)}
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none font-medium"
                />
                <button
                  onClick={() => removeDeliverable(idx)}
                  className="p-1 text-gray-500 hover:text-rose-400 transition-colors"
                  title="Remover item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA 4: COMPORTAMENTO DA IA */}
      {activeTab === 'ai' && (
        <div className="bg-navy-900/80 p-6 rounded-2xl border border-navy-800 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Bot className="w-4 h-4 text-accent" />
              <span>Configurações dos Agentes de IA</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Defina como a IA deve se comportar ao criar os conceitos, redigir mensagens e formular propostas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            {/* Tom de Voz */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-300">
                Tom de Voz das Mensagens de Venda:
              </label>
              <select
                value={settings.ai.default_tone}
                onChange={(e) => setSettings({
                  ...settings,
                  ai: { ...settings.ai, default_tone: e.target.value as any }
                })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
              >
                <option value="consultivo">Consultivo & Parceiro (Recomendado para negócios locais)</option>
                <option value="direto">Direto & Focado em ROI (Foco em números e vendas rápidas)</option>
                <option value="luxo">Elegante & Exclusivo (Ideal para marcas de alto padrão)</option>
                <option value="comercial">Vibrante & Promocional (Foco em agilidade e delivery)</option>
              </select>
              <p className="text-[10px] text-gray-500">
                Influencia o tom usado pelo Sales AI ao gerar os scripts de WhatsApp e Instagram.
              </p>
            </div>

            {/* Layout Padrão Inicial */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-300">
                Layout Arquitetural Padrão para Novos Sites:
              </label>
              <select
                value={settings.ai.default_layout}
                onChange={(e) => setSettings({
                  ...settings,
                  ai: { ...settings.ai, default_layout: e.target.value as ConceptLayoutType }
                })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-white focus:border-accent focus:outline-none"
              >
                <option value="luxury">Opção 1: Luxury Showcase VIP (Nobre, lookbook e elegância)</option>
                <option value="dark_tech">Opção 2: Dark High-Tech (Moda escura, métricas ao vivo)</option>
                <option value="minimal">Opção 3: Minimalista Clean Magazine (Espaçoso e moderno)</option>
                <option value="catalog">Opção 4: Catálogo Comercial & Delivery (Produtos com preços)</option>
                <option value="authority">Opção 5: Autoridade & Agendamento VIP (Corporativo e clínicas)</option>
              </select>
              <p className="text-[10px] text-gray-500">
                Será o layout pré-selecionado sempre que uma nova empresa for criada no sistema.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Ação Flutuante no Rodapé para Salvar */}
      <div className="sticky bottom-6 z-30 p-4 bg-navy-950/95 backdrop-blur-md rounded-2xl border border-navy-700 shadow-2xl flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <HelpCircle className="w-4 h-4 text-accent" />
          <span>As alterações salvas são aplicadas automaticamente em todas as próximas propostas e sites gerados.</span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/propostas"
            className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-xs font-bold text-gray-200 transition-colors flex items-center space-x-1"
          >
            <FileText className="w-3.5 h-3.5 text-accent" />
            <span>Ver Propostas</span>
          </Link>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-navy-950 font-black text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Salvo com Sucesso!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Salvar Tudo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal de Confirmação para Restaurar Padrões */}
      {resetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Restaurar Valores Padrão?</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Isso irá redefinir todos os preços de planos (R$ 997, R$ 1.850, R$ 2.900), prazos e entregáveis para as configurações originais do sistema.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setResetModal(false)}
                className="px-4 py-2 rounded-xl bg-navy-800 text-xs font-semibold text-gray-300 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow"
              >
                Sim, Restaurar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
