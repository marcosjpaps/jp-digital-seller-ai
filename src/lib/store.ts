import { Company, DigitalAnalysis, WebsiteConcept, SalesMessages, Proposal, CRMLead, CRMStage, AppSettings, DEFAULT_APP_SETTINGS, AuthUser } from '@/types';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  COMPANIES: 'jp_seller_companies_v1',
  ANALYSIS: 'jp_seller_analysis_v1',
  CONCEPTS: 'jp_seller_concepts_v1',
  MESSAGES: 'jp_seller_messages_v1',
  PROPOSALS: 'jp_seller_proposals_v1',
  LEADS: 'jp_seller_leads_v1',
  USER: 'jp_seller_user_v1',
  SETTINGS: 'jp_seller_settings_v1',
  USERS: 'jp_seller_users_v2',
  CURRENT_USER: 'jp_seller_current_user_v2',
};

export const DEFAULT_USER: AuthUser = {
  id: 'usr-marcos-01',
  email: 'marcos220896antonio@gmail.com',
  password: 'MAR9115COS',
  name: 'Marcos Antonio',
  role: 'admin',
  created_at: new Date().toISOString()
};

// Initial Seed Data with real-feeling João Pinheiro - MG businesses
const INITIAL_COMPANIES: Company[] = [
  {
    id: 'emp-1',
    name: 'Boutique Bella JP',
    segment: 'Moda feminina',
    city: 'João Pinheiro - MG',
    instagram: '@boutiquebellajp',
    google_maps_link: 'https://maps.google.com/?q=Boutique+Bella+Joao+Pinheiro',
    whatsapp: '38999887711',
    current_site: '',
    description: 'Loja conceituada de moda feminina no centro de João Pinheiro, atuando com roupas casuais e festas há 6 anos.',
    photos: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop'
    ],
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    stage: 'INTERESSADO'
  },
  {
    id: 'emp-2',
    name: 'Parrilla & Chopp Pinheirense',
    segment: 'Restaurante & Gastronomia',
    city: 'João Pinheiro - MG',
    instagram: '@parrillapinheirense',
    google_maps_link: 'https://maps.google.com/?q=Parrilla+Joao+Pinheiro',
    whatsapp: '38998123456',
    current_site: 'http://sitesimplesantigo.com.br',
    description: 'Churrascaria e choperia gourmet na avenida principal de João Pinheiro, com pratos executivos e música ao vivo nos fins de semana.',
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop'
    ],
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    stage: 'PROPOSTA_ENVIADA'
  },
  {
    id: 'emp-3',
    name: 'Clínica OdontoPinheiro',
    segment: 'Odontologia & Estética Dental',
    city: 'João Pinheiro - MG',
    instagram: '@odontopinheiro.estetica',
    google_maps_link: 'https://maps.google.com/?q=OdontoPinheiro',
    whatsapp: '38997654321',
    current_site: '',
    description: 'Consultório odontológico focado em clareamento, lentes em resina e ortodontia no bairro Centro.',
    photos: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop'
    ],
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    stage: 'CONTATO_REALIZADO'
  },
  {
    id: 'emp-4',
    name: 'Noroeste Imóveis JP',
    segment: 'Imobiliária & Corretores',
    city: 'João Pinheiro - MG',
    instagram: '@noroesteimoveisjp',
    google_maps_link: 'https://maps.google.com/?q=Noroeste+Imoveis+Joao+Pinheiro',
    whatsapp: '38999112233',
    current_site: '',
    description: 'Imobiliária especializada em loteamentos, fazendas na região e casas de médio e alto padrão em João Pinheiro.',
    photos: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop'
    ],
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    stage: 'FECHADO'
  }
];

const INITIAL_ANALYSIS: Record<string, DigitalAnalysis> = {
  'emp-1': {
    id: 'ana-1',
    company_id: 'emp-1',
    digital_score: 88,
    opportunity_level: 'Alta oportunidade',
    report: {
      company_name: 'Boutique Bella JP',
      executive_summary: 'Empresa com excelente posicionamento visual no Instagram em João Pinheiro, mas sem site próprio. Perde dezenas de vendas semanais respondendo mensagens repetidas no direct.',
      current_presence: 'Instagram ativo com 7.400 seguidores locais, boas fotos nos stories, porém sem catálogo web e sem link profissional na bio.',
      strengths: [
        'Engajamento forte com público feminino de João Pinheiro',
        'Fotos de boa qualidade com modelos e provador semanal',
        'Excelente reputação e ponto físico tradicional no Centro'
      ],
      issues_found: [
        'NÃO POSSUI SITE próprio nem catálogo indexado no Google',
        'Cliente precisa perguntar preço e tamanho individualmente no WhatsApp',
        'Produtos esgotam e fotos continuam gerando mensagens improdutivas',
        'Dependência exclusiva do algoritmo do Instagram para atrair novidades'
      ],
      opportunities: [
        'Criar Catálogo Digital VIP com link direto para WhatsApp',
        'Captar clientes que buscam no Google: "roupas femininas em João Pinheiro"',
        'Automatizar o atendimento economizando até 15 horas semanais da equipe',
        'Fidelizar clientes com aviso de nova coleção via página rápida'
      ],
      recommended_strategy: 'Apresentar um protótipo visual elegante em tons Nude/Ouro com botão de compra rápida pelo WhatsApp para demonstrar ganho imediato de tempo e aumento de vendas.',
      score_breakdown: {
        instagram_quality: 75,
        website_presence: 10,
        communication_speed: 60,
        local_seo_maps: 40
      }
    },
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  'emp-2': {
    id: 'ana-2',
    company_id: 'emp-2',
    digital_score: 82,
    opportunity_level: 'Alta oportunidade',
    report: {
      company_name: 'Parrilla & Chopp Pinheirense',
      executive_summary: 'Restaurante tradicional com cardápio desatualizado em site antigo não responsivo. Clientes têm dificuldade de ver opções no celular.',
      current_presence: 'Site antigo criado em 2018 que não abre direito no celular; Instagram movimentado, mas sem link de cardápio interativo.',
      strengths: [
        'Marca reconhecida e bem avaliada por moradores e viajantes da BR-040',
        'Pratos fotogênicos e carnes de alta qualidade',
        'Ambiente agradável com música ao vivo'
      ],
      issues_found: [
        'Site atual é antigo, lento e desconfigurado no smartphone',
        'Cardápio em PDF de 15MB enviado no WhatsApp que muitos desistem de baixar',
        'Falta de página de reservas para aniversários e confraternizações'
      ],
      opportunities: [
        'Cardápio Digital Rápido (QR Code nas mesas e link no Instagram)',
        'Sistema próprio de pedidos sem pagar comissões abusivas',
        'Página de eventos e reservas que valoriza o chopp artesanal'
      ],
      recommended_strategy: 'Demonstrar o cardápio interativo moderno no celular do proprietário e enfatizar a economia em comissões.',
      score_breakdown: {
        instagram_quality: 70,
        website_presence: 25,
        communication_speed: 65,
        local_seo_maps: 55
      }
    },
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  }
};

const INITIAL_CONCEPTS: Record<string, WebsiteConcept> = {
  'emp-1': {
    id: 'cpt-1',
    company_id: 'emp-1',
    visual_name: 'Bella Boutique — Coleção & Glamour JP',
    style: 'Elegante, Clean, Feminino e Sofisticado',
    color_palette: {
      primary: '#1A1A1A',
      secondary: '#F5EBE0',
      accent: '#D4AF37',
      background: '#FCFBF9',
      text: '#222222'
    },
    site_structure: {
      hero: {
        headline: 'Moda feminina exclusiva para mulheres que valorizam elegância e autenticidade em João Pinheiro.',
        subheadline: 'Descubra a nova coleção com looks selecionados para o seu dia a dia e momentos inesquecíveis.',
        cta_text: 'Ver Looks e Chamar no WhatsApp'
      },
      social_proof: [
        '+5.000 clientes satisfeitas na região',
        'Loja física no Centro de João Pinheiro',
        'Envios rápidos e atendimento exclusivo'
      ],
      services: [
        {
          title: 'Coleção Casual Chic',
          description: 'Peças versáteis, tecidos premium e caimento impecável para trabalhar ou passear.'
        },
        {
          title: 'Linha Festa & Eventos',
          description: 'Vestidos e conjuntos marcantes para casamentos, formaturas e celebrações.'
        },
        {
          title: 'Acessórios & Calçados',
          description: 'Acessórios selecionados para compor produções completas com harmonia.'
        }
      ],
      testimonials: [
        {
          name: 'Mariana Silva',
          comment: 'Sempre encontro o look perfeito para qualquer ocasião. O atendimento é impecável!',
          rating: 5
        },
        {
          name: 'Dra. Camila Rocha',
          comment: 'Roupas com qualidade surreal. Amo a curadoria das peças em João Pinheiro.',
          rating: 5
        }
      ],
      location_cta: {
        address_highlight: 'Rua Capitão Speridião, Centro — João Pinheiro/MG',
        whatsapp_cta: 'Atendimento Personalizado no WhatsApp: (38) 99988-7711'
      }
    },
    image_suggestions: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop'
    ],
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  }
};

const INITIAL_MESSAGES: Record<string, SalesMessages> = {
  'emp-1': {
    id: 'msg-1',
    company_id: 'emp-1',
    whatsapp: `Olá, tudo bem? Aqui é o especialista digital de João Pinheiro! 🌟

Notei o sucesso da Boutique Bella JP aqui na cidade e como suas peças são lindas! 

Porém reparei que muitas clientes que procuram por roupas femininas no Google ou no Instagram acabam ficando sem ver o catálogo atualizado, ou ficam esperando horas no WhatsApp por preços.

Eu desenhei uma prévia exclusiva de um Site e Catálogo VIP para a Boutique Bella JP que organiza as coleções e facilita a venda direta pelo WhatsApp.

Posso te mandar o link da demonstração de 1 minuto sem compromisso? Tenho certeza que vai amar o resultado! ✨`,
    instagram: `Oi meninas da Boutique Bella JP! Adoro os looks da loja de vocês aqui em João Pinheiro. Percebi que vocês ainda não têm um catálogo digital interativo para quem não quer ficar caçando peças no feed. Criei um conceito visual exclusivo para vocês verem como ficaria incrível. Posso mandar o link aqui? 👗✨`,
    email: {
      subject: 'Oportunidade Digital: Catálogo VIP & Site Exclusivo para Boutique Bella JP',
      body: `Prezada equipe da Boutique Bella JP,

Espero que estejam excelentes!

Acompanho o crescimento da Boutique Bella JP no comércio de João Pinheiro e o carinho com que apresentam a moda feminina para a cidade.

Analisando a presença online da loja, identificamos uma grande oportunidade: centralizar seus looks mais procurados em um site leve e elegante, integrado ao seu WhatsApp oficial. Isso elimina a perda de vendas de clientes que pesquisam no Google e reduz o tempo gasto respondendo repetidamente dúvidas sobre modelos disponíveis.

Preparamos uma demonstração personalizada do conceito digital da Boutique Bella JP que pode ser visualizada pelo celular em menos de 2 minutos.

Ficamos à disposição para apresentar esse conceito sem nenhum custo.

Atenciosamente,
JP Digital Seller AI — Especialistas em Vendas Digitais Locais`
    },
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  }
};

const INITIAL_PROPOSALS: Record<string, Proposal> = {
  'emp-1': {
    id: 'prop-1',
    company_id: 'emp-1',
    company_name: 'Boutique Bella JP',
    cover_title: 'Proposta Comercial de Transformação Digital',
    cover_subtitle: 'Criação de Site & Catálogo de Vendas de Alta Conversão para Boutique Bella JP em João Pinheiro',
    current_analysis: 'A Boutique Bella JP possui forte apelo estético no Instagram, mas sofre com atrito no atendimento e ausência de posicionamento nas buscas do Google em João Pinheiro.',
    problem_diagnosed: 'Perda de clientes que pesquisam roupas no Google; sobrecarga no WhatsApp com perguntas repetitivas de preço e estoque; dependência de posts temporários do Instagram.',
    recommended_solution: 'Desenvolvimento de uma vitrine digital moderna, ultra-rápida, com visual de alto padrão em tons de nude e dourado, catálogo de coleções e botão direto para o WhatsApp oficial.',
    deliverables: [
      'Site institucional e vitrine virtual responsiva (Desktop e Celular)',
      'Integração direta com o WhatsApp de vendas com mensagens pré-formatadas',
      'Configuração e otimização do Google Meu Negócio / Google Maps',
      'Hospedagem ultra-rápida inclusa por 1 ano com certificado de segurança SSL',
      'Domínio próprio registrado (.com.br)',
      'Treinamento prático em vídeo para atualização fácil de fotos e novidades'
    ],
    timeline: '5 a 7 dias úteis a partir do envio das fotos e aprovação inicial.',
    tiers: [
      {
        name: 'Plano Essencial',
        price: 'R$ 997,00',
        features: [
          'Landing Page de Alta Conversão',
          'Galeria de Melhores Looks',
          'Botão Flutuante de WhatsApp',
          'Otimização para Celular'
        ]
      },
      {
        name: 'Plano Profissional',
        price: 'R$ 1.850,00',
        popular: true,
        features: [
          'Site Completo com Catálogo de Coleções',
          'Otimização Google Local (SEO João Pinheiro)',
          'Painel fácil para trocar fotos',
          'Domínio .com.br + SSL + Hospedagem 1 ano',
          'Suporte prioritário via WhatsApp'
        ]
      },
      {
        name: 'Plano Premium VIP',
        price: 'R$ 2.900,00',
        features: [
          'Tudo do Plano Profissional',
          'Sessão de fotos profissionais dos produtos em JP',
          'Campanha de Tráfego Pago (Anúncios no Instagram por 15 dias)',
          'Estratégia de Captação de Leads no WhatsApp'
        ]
      }
    ],
    next_steps: [
      '1. Escolha do plano ideal para o momento da Boutique Bella JP',
      '2. Assinatura do termo de início de projeto (simples e digital)',
      '3. Reunião de 20 minutos de alinhamento visual e entrega de materiais',
      '4. Publicação e comemoração do lançamento!'
    ],
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  }
};

const INITIAL_LEADS: CRMLead[] = [
  {
    id: 'lead-1',
    company_id: 'emp-1',
    company_name: 'Boutique Bella JP',
    contact_name: 'Fernanda (Proprietária)',
    phone: '(38) 99988-7711',
    value: 1850,
    stage: 'INTERESSADO',
    notes: 'Viu a demonstração do conceito visual, adorou a paleta de cores. Quer saber se parcelamos no cartão.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'lead-2',
    company_id: 'emp-2',
    company_name: 'Parrilla & Chopp Pinheirense',
    contact_name: 'Marcos Gerente',
    phone: '(38) 99812-3456',
    value: 2900,
    stage: 'PROPOSTA_ENVIADA',
    notes: 'Proposta enviada pelo WhatsApp e e-mail. Reunião de fechamento marcada para quinta-feira às 15h.',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'lead-3',
    company_id: 'emp-3',
    company_name: 'Clínica OdontoPinheiro',
    contact_name: 'Dra. Patrícia',
    phone: '(38) 99765-4321',
    value: 1850,
    stage: 'CONTATO_REALIZADO',
    notes: 'Mensagem enviada no WhatsApp. Respondeu que o sócio vai olhar na segunda-feira.',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'lead-4',
    company_id: 'emp-4',
    company_name: 'Noroeste Imóveis JP',
    contact_name: 'Carlos Corretor Chefe',
    phone: '(38) 99911-2233',
    value: 3500,
    stage: 'FECHADO',
    notes: 'Contrato assinado! Sinal de 50% pago via Pix. Desenvolvimento do portal imobiliário em andamento.',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

class DataStore {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // COMPANIES
  public getCompanies(): Company[] {
    if (!this.isBrowser()) return INITIAL_COMPANIES;
    const stored = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(INITIAL_COMPANIES));
      return INITIAL_COMPANIES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_COMPANIES;
    }
  }

  public getCompanyById(id: string): Company | undefined {
    const list = this.getCompanies();
    return list.find(c => c.id === id);
  }

  public saveCompany(company: Company): void {
    const list = this.getCompanies();
    const existingIndex = list.findIndex(c => c.id === company.id);
    let updated: Company[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = company;
    } else {
      updated = [company, ...list];
    }
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(updated));
    }
    // Also auto-sync/ensure lead exists in CRM
    this.syncCompanyToLead(company);
  }

  public deleteCompany(id: string): void {
    const list = this.getCompanies().filter(c => c.id !== id);
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(list));
    }
  }

  // ANALYSIS
  public getAnalysis(companyId: string): DigitalAnalysis | null {
    if (!this.isBrowser()) return INITIAL_ANALYSIS[companyId] || null;
    const stored = localStorage.getItem(STORAGE_KEYS.ANALYSIS);
    const map = stored ? JSON.parse(stored) : INITIAL_ANALYSIS;
    return map[companyId] || null;
  }

  public saveAnalysis(analysis: DigitalAnalysis): void {
    if (!this.isBrowser()) return;
    const stored = localStorage.getItem(STORAGE_KEYS.ANALYSIS);
    const map = stored ? JSON.parse(stored) : { ...INITIAL_ANALYSIS };
    map[analysis.company_id] = analysis;
    localStorage.setItem(STORAGE_KEYS.ANALYSIS, JSON.stringify(map));
  }

  // CONCEPTS (Supports multiple variants / options per company)
  public getWebsiteConcepts(companyId: string): WebsiteConcept[] {
    if (!this.isBrowser()) {
      return INITIAL_CONCEPTS[companyId] ? [INITIAL_CONCEPTS[companyId]] : [];
    }
    const stored = localStorage.getItem(STORAGE_KEYS.CONCEPTS);
    const map = stored ? JSON.parse(stored) : INITIAL_CONCEPTS;
    const value = map[companyId];
    if (Array.isArray(value)) return value;
    if (value) return [value];
    return [];
  }

  public getWebsiteConcept(companyId: string): WebsiteConcept | null {
    const list = this.getWebsiteConcepts(companyId);
    return list.length > 0 ? list[0] : null;
  }

  public saveWebsiteConcept(concept: WebsiteConcept): void {
    if (!this.isBrowser()) return;
    const stored = localStorage.getItem(STORAGE_KEYS.CONCEPTS);
    const map = stored ? JSON.parse(stored) : { ...INITIAL_CONCEPTS };
    const currentList = this.getWebsiteConcepts(concept.company_id);
    const existingIndex = currentList.findIndex(c => c.id === concept.id);
    let updatedList: WebsiteConcept[];
    if (existingIndex >= 0) {
      updatedList = [...currentList];
      updatedList[existingIndex] = concept;
    } else {
      updatedList = [concept, ...currentList];
    }
    map[concept.company_id] = updatedList;
    localStorage.setItem(STORAGE_KEYS.CONCEPTS, JSON.stringify(map));
  }

  public deleteWebsiteConcept(companyId: string, conceptId: string): void {
    if (!this.isBrowser()) return;
    const stored = localStorage.getItem(STORAGE_KEYS.CONCEPTS);
    const map = stored ? JSON.parse(stored) : { ...INITIAL_CONCEPTS };
    const currentList = this.getWebsiteConcepts(companyId).filter(c => c.id !== conceptId);
    map[companyId] = currentList;
    localStorage.setItem(STORAGE_KEYS.CONCEPTS, JSON.stringify(map));
  }

  public getAllSavedConcepts(): { concept: WebsiteConcept; company: Company }[] {
    const companies = this.getCompanies();
    const result: { concept: WebsiteConcept; company: Company }[] = [];
    for (const comp of companies) {
      const concepts = this.getWebsiteConcepts(comp.id);
      for (const cpt of concepts) {
        result.push({ concept: cpt, company: comp });
      }
    }
    return result;
  }

  // MESSAGES
  public getSalesMessages(companyId: string): SalesMessages | null {
    if (!this.isBrowser()) return INITIAL_MESSAGES[companyId] || null;
    const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const map = stored ? JSON.parse(stored) : INITIAL_MESSAGES;
    return map[companyId] || null;
  }

  public saveSalesMessages(messages: SalesMessages): void {
    if (!this.isBrowser()) return;
    const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const map = stored ? JSON.parse(stored) : { ...INITIAL_MESSAGES };
    map[messages.company_id] = messages;
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(map));
  }

  // PROPOSALS
  public getProposal(companyId: string): Proposal | null {
    if (!this.isBrowser()) return INITIAL_PROPOSALS[companyId] || null;
    const stored = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
    const map = stored ? JSON.parse(stored) : INITIAL_PROPOSALS;
    return map[companyId] || null;
  }

  public saveProposal(proposal: Proposal): void {
    if (!this.isBrowser()) return;
    const stored = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
    const map = stored ? JSON.parse(stored) : { ...INITIAL_PROPOSALS };
    map[proposal.company_id] = proposal;
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(map));
  }

  // CRM LEADS
  public getCRMLeads(): CRMLead[] {
    if (!this.isBrowser()) return INITIAL_LEADS;
    const stored = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_LEADS;
    }
  }

  public updateCRMStage(companyId: string, stage: CRMStage, notes?: string): void {
    const leads = this.getCRMLeads();
    const lead = leads.find(l => l.company_id === companyId);
    if (lead) {
      lead.stage = stage;
      lead.updated_at = new Date().toISOString();
      if (notes) lead.notes = notes;
      if (this.isBrowser()) {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      }
    }
    // Also update company stage
    const company = this.getCompanyById(companyId);
    if (company) {
      company.stage = stage;
      this.saveCompany(company);
    }
  }

  public saveCRMLead(lead: CRMLead): void {
    const leads = this.getCRMLeads();
    const index = leads.findIndex(l => l.id === lead.id || l.company_id === lead.company_id);
    let updated: CRMLead[];
    if (index >= 0) {
      updated = [...leads];
      updated[index] = { ...updated[index], ...lead, updated_at: new Date().toISOString() };
    } else {
      updated = [lead, ...leads];
    }
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));
    }
  }

  private syncCompanyToLead(company: Company): void {
    const leads = this.getCRMLeads();
    const existing = leads.find(l => l.company_id === company.id);
    if (!existing) {
      const newLead: CRMLead = {
        id: `lead-${Date.now()}`,
        company_id: company.id,
        company_name: company.name,
        contact_name: 'Responsável Comercial',
        phone: company.whatsapp || '(38) 99999-0000',
        value: 1850,
        stage: company.stage || 'NOVO_LEAD',
        notes: `Cadastrado via formulário de prospecção em ${company.city}.`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.saveCRMLead(newLead);
    }
  }

  // DASHBOARD METRICS
  public getDashboardStats() {
    const companies = this.getCompanies();
    const leads = this.getCRMLeads();
    const analysisCount = companies.length; // all analyzed or ready
    const contactedCount = leads.filter(l => l.stage !== 'NOVO_LEAD').length;
    const proposalsCount = leads.filter(l => ['PROPOSTA_ENVIADA', 'FECHADO', 'ENTREGUE'].includes(l.stage)).length;
    const closedCount = leads.filter(l => ['FECHADO', 'ENTREGUE'].includes(l.stage)).length;
    const closedRevenue = leads
      .filter(l => ['FECHADO', 'ENTREGUE'].includes(l.stage))
      .reduce((acc, curr) => acc + (curr.value || 0), 0);
    const pipelineRevenue = leads
      .filter(l => !['FECHADO', 'ENTREGUE'].includes(l.stage))
      .reduce((acc, curr) => acc + (curr.value || 0), 0);

    return {
      companiesAnalyzed: analysisCount,
      contactsMade: contactedCount,
      proposalsCreated: proposalsCount,
      closedClients: closedCount,
      closedRevenue,
      pipelineRevenue,
      conversionRate: analysisCount > 0 ? Math.round((closedCount / analysisCount) * 100) : 0
    };
  }

  // GLOBAL APP SETTINGS
  public getSettings(): AppSettings {
    if (typeof window === 'undefined') return DEFAULT_APP_SETTINGS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_APP_SETTINGS));
        return DEFAULT_APP_SETTINGS;
      }
      return {
        ...DEFAULT_APP_SETTINGS,
        ...JSON.parse(data),
        agency: { ...DEFAULT_APP_SETTINGS.agency, ...JSON.parse(data).agency },
        proposal: { ...DEFAULT_APP_SETTINGS.proposal, ...JSON.parse(data).proposal },
        ai: { ...DEFAULT_APP_SETTINGS.ai, ...JSON.parse(data).ai }
      };
    } catch {
      return DEFAULT_APP_SETTINGS;
    }
  }

  public saveSettings(settings: AppSettings): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings', e);
    }
  }

  public resetSettings(): AppSettings {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_APP_SETTINGS));
    }
    return DEFAULT_APP_SETTINGS;
  }

  // USER AUTHENTICATION & SESSIONS
  public getUsers(): AuthUser[] {
    if (typeof window === 'undefined') return [DEFAULT_USER];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([DEFAULT_USER]));
        return [DEFAULT_USER];
      }
      const parsed = JSON.parse(data);
      // Ensure DEFAULT_USER (Marcos) exists
      if (!parsed.some((u: AuthUser) => u.email.toLowerCase() === DEFAULT_USER.email.toLowerCase())) {
        parsed.unshift(DEFAULT_USER);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return [DEFAULT_USER];
    }
  }

  public getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return DEFAULT_USER;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));
        return DEFAULT_USER;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_USER;
    }
  }

  public setCurrentUser(user: AuthUser | null): void {
    if (typeof window === 'undefined') return;
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) {
      console.error('Error saving current user', e);
    }
  }

  public registerUser(email: string, password: string, name: string): { user?: AuthUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { error: 'E-mail e senha são obrigatórios.' };
    }
    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { error: 'Este e-mail já está cadastrado no sistema.' };
    }
    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      password: password.trim(),
      name: name.trim() || 'Vendedor VIP',
      role: 'seller',
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      this.setCurrentUser(newUser);
    }
    return { user: newUser };
  }

  public loginUser(email: string, password: string): { user?: AuthUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();
    const users = this.getUsers();
    const found = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return { error: 'Usuário não encontrado com este e-mail.' };
    }
    if (found.password && found.password !== cleanPass) {
      return { error: 'Senha incorreta. Verifique suas credenciais.' };
    }
    this.setCurrentUser(found);
    return { user: found };
  }

  public logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }
}

export const store = new DataStore();


