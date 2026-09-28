export type CRMStage =
  | 'NOVO_LEAD'
  | 'CONTATO_REALIZADO'
  | 'INTERESSADO'
  | 'PROPOSTA_ENVIADA'
  | 'FECHADO'
  | 'ENTREGUE';

export interface AuthUser {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: 'admin' | 'seller';
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  segment: string;
  city: string;
  instagram?: string;
  google_maps_link?: string;
  whatsapp?: string;
  current_site?: string;
  description?: string;
  photos?: string[];
  created_at: string;
  stage: CRMStage;
}

export interface DigitalAnalysis {
  id: string;
  company_id: string;
  digital_score: number; // 0 - 100
  opportunity_level: 'Baixa oportunidade' | 'Média oportunidade' | 'Alta oportunidade';
  report: {
    company_name: string;
    executive_summary: string;
    current_presence: string;
    strengths: string[];
    issues_found: string[];
    opportunities: string[];
    recommended_strategy: string;
    score_breakdown: {
      instagram_quality: number;
      website_presence: number;
      communication_speed: number;
      local_seo_maps: number;
    };
  };
  created_at: string;
}

export type ConceptLayoutType = 'luxury' | 'dark_tech' | 'minimal' | 'catalog' | 'authority';

export interface WebsiteConcept {
  id: string;
  company_id: string;
  variant_title?: string;
  layout_type?: ConceptLayoutType;
  visual_name: string;
  style: string;
  custom_badge?: string;
  color_palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  site_structure: {
    hero: {
      headline: string;
      subheadline: string;
      cta_text: string;
    };
    social_proof: string[];
    services: {
      title: string;
      description: string;
    }[];
    testimonials: {
      name: string;
      comment: string;
      rating: number;
    }[];
    location_cta: {
      address_highlight: string;
      whatsapp_cta: string;
    };
    faq?: {
      question: string;
      answer: string;
    }[];
  };
  active_sections?: string[];
  image_suggestions: string[];
  created_at: string;
}

export interface SalesMessages {
  id: string;
  company_id: string;
  whatsapp: string;
  instagram: string;
  email: {
    subject: string;
    body: string;
  };
  created_at: string;
}

export interface ProposalTier {
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
}

export interface Proposal {
  id: string;
  company_id: string;
  company_name: string;
  cover_title: string;
  cover_subtitle: string;
  current_analysis: string;
  problem_diagnosed: string;
  recommended_solution: string;
  deliverables: string[];
  timeline: string;
  tiers: ProposalTier[];
  next_steps: string[];
  created_at: string;
}

export interface CRMLead {
  id: string;
  company_id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  value: number;
  stage: CRMStage;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DemoTemplate {
  id: string;
  segment: string;
  title: string;
  style: string;
  colors: string[];
  hero_copy: string;
  cta_copy: string;
  structure: string[];
  suggested_images: string[];
  sample_problems: string[];
}

export interface AppSettings {
  agency: {
    name: string;
    seller_name: string;
    city: string;
    whatsapp: string;
    email: string;
    pix_key: string;
  };
  proposal: {
    cover_title: string;
    timeline: string;
    payment_terms: string;
    maintenance_price: string;
    guarantee_days: number;
    tiers: ProposalTier[];
    default_deliverables: string[];
    next_steps: string[];
  };
  ai: {
    default_tone: 'consultivo' | 'direto' | 'luxo' | 'comercial';
    default_layout: ConceptLayoutType;
    auto_generate_multiple: boolean;
  };
}

export const DEFAULT_APP_SETTINGS: AppSettings = {
  agency: {
    name: 'JP DIGITAL SELLER AI',
    seller_name: 'Marcos Antonio',
    city: 'João Pinheiro - MG',
    whatsapp: '(38) 99999-8877',
    email: 'marcos220896antonio@gmail.com',
    pix_key: 'marcos220896antonio@gmail.com'
  },
  proposal: {
    cover_title: 'Proposta Comercial de Transformação & Vendas Digitais',
    timeline: '5 a 7 dias úteis após o envio dos materiais básicos',
    payment_terms: '50% de entrada + 50% na aprovação final (ou em até 12x no cartão)',
    maintenance_price: 'R$ 97,00/mês (Hospedagem rápida + Suporte contínuo)',
    guarantee_days: 30,
    tiers: [
      {
        name: 'Plano Essencial Express',
        price: 'R$ 997,00',
        popular: false,
        features: [
          'Landing Page de Alta Conversão',
          'Seções Hero, Serviços e Depoimentos',
          'Botão Flutuante de WhatsApp Direto',
          'Otimização 100% para Celulares',
          'Hospedagem rápida inclusa'
        ]
      },
      {
        name: 'Plano Profissional Autoridade',
        price: 'R$ 1.850,00',
        popular: true,
        features: [
          'Site Institucional Completo Multi-seções',
          'Catálogo Interativo de Produtos / Serviços',
          'Otimização SEO Local no Google da Cidade',
          'Registro de Domínio .com.br + Certificado SSL',
          'Hospedagem Premium por 12 meses',
          'Painel Administrativo para Atualizações',
          'Treinamento prático da equipe para atendimento'
        ]
      },
      {
        name: 'Plano Máquina de Escala & Tráfego',
        price: 'R$ 2.900,00',
        popular: false,
        features: [
          'Tudo do Plano Profissional Autoridade',
          'Configuração Completa do Google Meu Negócio / Maps',
          'Estrutura pronta para campanhas de anúncios (Meta / Google Ads)',
          'Pixel do Meta e Google Analytics 4 instalados',
          'Suporte VIP prioritário via WhatsApp direto por 6 meses'
        ]
      }
    ],
    default_deliverables: [
      'Site Profissional Responsivo (Otimizado para Celulares, Tablets e Computadores)',
      'Integração direta com o WhatsApp Comercial da empresa com mensagem personalizada',
      'Configuração e otimização do Google Meu Negócio / Google Maps',
      'Hospedagem de alta performance e segurança com Certificado SSL (HTTPS) incluso',
      'Registro e configuração do domínio oficial (.com.br)',
      'Painel simples e intuitivo para atualização de dados, fotos e promoções',
      'Treinamento prático da equipe para atendimento rápido de leads vindos do site'
    ],
    next_steps: [
      'Aprovação da Proposta e escolha do Plano ideal',
      'Envio do logotipo, fotos principais e contatos da empresa',
      'Desenvolvimento do design e programação do site em ambiente de teste',
      'Apresentação para validação e ajustes finais',
      'Publicação oficial do domínio e entrega da Máquina de Vendas no ar!'
    ]
  },
  ai: {
    default_tone: 'consultivo',
    default_layout: 'luxury',
    auto_generate_multiple: true
  }
};

