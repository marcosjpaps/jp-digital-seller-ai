'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  Phone, 
  Globe, 
  FileText, 
  Image as ImageIcon,
  ArrowLeft,
  Check
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import Link from 'next/link';
import { store } from '@/lib/store';
import { Company } from '@/types';
import { DEMO_TEMPLATES } from '@/data/templates';

export default function NovaEmpresaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    segment: 'Moda feminina',
    city: 'João Pinheiro - MG',
    instagram: '',
    google_maps_link: '',
    whatsapp: '',
    current_site: '',
    description: '',
    photos: [] as string[]
  });

  const [samplePhotoUrl, setSamplePhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTemplateFill = (segmentName: string) => {
    const t = DEMO_TEMPLATES.find(temp => temp.segment.toLowerCase().includes(segmentName.toLowerCase()));
    if (t) {
      setFormData(prev => ({
        ...prev,
        segment: t.segment,
        description: prev.description || `Empresa líder em ${t.segment} oferecendo serviços de alto padrão para clientes de João Pinheiro e região.`,
        photos: t.suggested_images
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor, informe o nome da empresa.');
      return;
    }

    setLoading(true);

    const newCompany: Company = {
      id: `emp-${Date.now()}`,
      name: formData.name,
      segment: formData.segment,
      city: formData.city || 'João Pinheiro - MG',
      instagram: formData.instagram,
      google_maps_link: formData.google_maps_link,
      whatsapp: formData.whatsapp,
      current_site: formData.current_site,
      description: formData.description,
      photos: formData.photos.length > 0 ? formData.photos : [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop'
      ],
      created_at: new Date().toISOString(),
      stage: 'NOVO_LEAD'
    };

    store.saveCompany(newCompany);

    // Direct routing to DIGITAL ANALYST AI
    router.push(`/analista-ia?companyId=${newCompany.id}&autoAnalyze=true`);
  };

  const addPhoto = () => {
    if (samplePhotoUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, samplePhotoUrl.trim()]
      }));
      setSamplePhotoUrl('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
      
      {/* Back button */}
      <Link
        href="/empresas"
        className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para lista de empresas</span>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center space-x-2.5">
          <Building2 className="w-6 h-6 text-accent" />
          <span>Cadastrar Empresa Local</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Insira as informações encontradas no Instagram, Google Maps ou indicação local para acionar o Analista Digital IA.
        </p>
      </div>

      {/* Quick Presets by Segment */}
      <div className="bg-navy-900/60 p-4 rounded-2xl border border-navy-800 space-y-2">
        <div className="text-xs font-bold text-gray-300">Preenchimento Rápido por Segmento:</div>
        <div className="flex flex-wrap gap-2">
          {DEMO_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => handleTemplateFill(tmpl.segment)}
              className="px-2.5 py-1 rounded-lg text-xs bg-navy-950 hover:bg-accent/20 hover:text-accent border border-navy-700 text-gray-300 font-medium transition-all"
            >
              + {tmpl.segment}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-navy-900/80 rounded-3xl border border-navy-800 p-6 sm:p-8 space-y-6 shadow-xl">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Nome da empresa */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5">
              Nome da Empresa *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Boutique Bella JP, Pizzaria da Esplanada, Odonto Sorriso..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-navy-950 border border-navy-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>

          {/* Segmento */}
          <div>
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5">
              Segmento de Atuação
            </label>
            <select
              value={formData.segment}
              onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
              className="w-full px-4 py-3 bg-navy-950 border border-navy-700 rounded-xl text-sm text-white focus:outline-none focus:border-accent"
            >
              <option value="Moda feminina">Moda feminina</option>
              <option value="Restaurante & Gastronomia">Restaurante & Gastronomia</option>
              <option value="Clínica Médica & Saúde">Clínica Médica & Saúde</option>
              <option value="Odontologia & Estética Dental">Odontologia & Estética Dental</option>
              <option value="Imobiliária & Corretores">Imobiliária & Corretores</option>
              <option value="Construção Civil & Reformas">Construção Civil & Reformas</option>
              <option value="Móveis Planejados & Decoração">Móveis Planejados & Decoração</option>
              <option value="Academia & Fitness">Academia & Fitness</option>
              <option value="Serviços & Especialistas Locais">Serviços & Especialistas Locais</option>
              <option value="Outro Segmento">Outro Segmento</option>
            </select>
          </div>

          {/* Cidade */}
          <div>
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5">
              Cidade / Localização
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-accent absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full pl-9 pr-4 py-3 bg-navy-950 border border-navy-700 rounded-xl text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5">
              Instagram (@usuario)
            </label>
            <div className="relative">
              <InstagramIcon className="w-4 h-4 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="@empresa_jp"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full pl-9 pr-4 py-3 bg-navy-950 border border-navy-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent font-mono"
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5">
              WhatsApp Comercial
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="(38) 99999-9999"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full pl-9 pr-4 py-3 bg-navy-950 border border-navy-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent font-mono"
              />
            </div>
          </div>

          {/* Link Google Maps */}
          <div>
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5">
              Link Google Maps / Google Meu Negócio
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="https://maps.google.com/..."
                value={formData.google_maps_link}
                onChange={(e) => setFormData({ ...formData, google_maps_link: e.target.value })}
                className="w-full pl-9 pr-4 py-3 bg-navy-950 border border-navy-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Site Atual */}
          <div>
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5">
              Site Atual (Deixe em branco se não possuir)
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="www.empresa.com.br (ou vazio)"
                value={formData.current_site}
                onChange={(e) => setFormData({ ...formData, current_site: e.target.value })}
                className="w-full pl-9 pr-4 py-3 bg-navy-950 border border-navy-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5">
              Descrição da Empresa / O que vendem / Ponto forte
            </label>
            <textarea
              rows={3}
              placeholder="Descreva detalhes sobre a empresa, tempo de mercado em João Pinheiro, principais produtos e serviços..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-navy-950 border border-navy-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none"
            />
          </div>

          {/* Fotos e Referências */}
          <div className="sm:col-span-2 space-y-3">
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider">
              Fotos & Referências Visuais (URLs de imagens do Instagram ou produtos)
            </label>
            <div className="flex space-x-2">
              <input
                type="url"
                placeholder="https://exemplo.com/foto-do-produto.jpg"
                value={samplePhotoUrl}
                onChange={(e) => setSamplePhotoUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-navy-950 border border-navy-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={addPhoto}
                className="px-4 py-2.5 rounded-xl bg-navy-800 text-gray-200 hover:text-white text-xs font-semibold"
              >
                + Adicionar Foto
              </button>
            </div>

            {formData.photos.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.photos.map((url, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-navy-700">
                    <img src={url} alt="Foto de referência" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== idx) }))}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-bl p-0.5 text-[9px]"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Button: ANALISAR EMPRESA COM IA */}
        <div className="pt-4 border-t border-navy-800">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent via-blue-500 to-accent text-navy-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-accent/25 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5 fill-navy-950" />
            <span>{loading ? 'ANALISANDO COM IA...' : 'ANALISAR EMPRESA COM IA'}</span>
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">
            A IA analisará a presença digital, gerará o Score de Oportunidade e o Relatório Executivo instantaneamente.
          </p>
        </div>

      </form>

    </div>
  );
}
