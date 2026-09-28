import { Company, DigitalAnalysis, WebsiteConcept, ConceptLayoutType, SalesMessages, Proposal } from '@/types';
import { DEMO_TEMPLATES } from '@/data/templates';
import { store } from './store';

export class AIService {
  /**
   * 4 — DIGITAL ANALYST AI
   * Avalia a empresa local, calcula o Score e gera o Relatório Digital completo.
   */
  public static async analyzeCompany(company: Company): Promise<DigitalAnalysis> {
    // Artificial latency for authentic AI feeling
    await new Promise((r) => setTimeout(r, 900));

    const hasSite = Boolean(company.current_site && company.current_site.trim() !== '');
    const hasInsta = Boolean(company.instagram && company.instagram.trim() !== '');
    const hasMaps = Boolean(company.google_maps_link && company.google_maps_link.trim() !== '');

    // Score calculation logic
    let opportunityScore = 65; // base
    if (!hasSite) opportunityScore += 24; // huge opportunity to sell a site!
    if (hasInsta) opportunityScore += 10; // active on social media = has budget & audience
    if (!hasMaps) opportunityScore += 5; // can sell Google My Business setup too

    // Bound between 10 and 98
    opportunityScore = Math.min(Math.max(opportunityScore, 35), 98);

    let opportunityLevel: 'Baixa oportunidade' | 'Média oportunidade' | 'Alta oportunidade' = 'Média oportunidade';
    if (opportunityScore <= 40) opportunityLevel = 'Baixa oportunidade';
    else if (opportunityScore <= 70) opportunityLevel = 'Média oportunidade';
    else opportunityLevel = 'Alta oportunidade';

    // Segment template match
    const template = DEMO_TEMPLATES.find(t => 
      t.segment.toLowerCase().includes(company.segment.toLowerCase()) || 
      company.segment.toLowerCase().includes(t.segment.toLowerCase())
    ) || DEMO_TEMPLATES[0];

    const strengths: string[] = [
      `Negócio atuante no segmento de ${company.segment} em ${company.city || 'João Pinheiro - MG'}.`,
      hasInsta ? `Presença no Instagram (${company.instagram}), indicando preocupação com a imagem da marca.` : 'Ponto comercial com potencial de captação orgânica local.',
      'Excelente momento de mercado para expansão com captação de clientes pela internet.'
    ];

    const issues: string[] = [];
    if (!hasSite) {
      issues.push('NÃO POSSUI SITE PRÓPRIO: A empresa é invisível para quem pesquisa por fornecedores no Google.');
      issues.push('Dependência vulnerável dos algoritmos de redes sociais (posts e stories somem em 24h).');
      issues.push('Atendimento manual e sobrecarregado no WhatsApp para tirar dúvidas repetitivas.');
    } else {
      issues.push('Site existente não está otimizado para celulares modernos ou carece de copywriting persuasivo.');
      issues.push('Falta de chamadas diretas (CTA) conectando o visitante instantaneamente ao WhatsApp comercial.');
    }

    if (!hasMaps) {
      issues.push('Ficha do Google Maps não vinculada ou sem otimização de SEO local para buscas em João Pinheiro.');
    }

    const opportunities: string[] = [
      `Posicionar ${company.name} no topo das pesquisas locais do Google para ${company.segment} em ${company.city || 'João Pinheiro'}.`,
      'Implementar um catálogo/vitrine digital interativa que reduz em até 70% o tempo da equipe tirando dúvidas de clientes.',
      'Apresentar autoridade profissional inquestionável que permite cobrar valores mais altos e atrair clientes mais qualificados.',
      'Integrar botão direto para o WhatsApp oficial com rastreamento de cliques e conversões.'
    ];

    const recommendedStrategy = !hasSite
      ? `Apresentar à diretoria de ${company.name} uma demonstração visual do conceito do site sob medida, enfatizando que empresas com site transmitem 83% mais confiança e que a concorrência em ${company.city} ainda é baixa no Google.`
      : `Propor uma modernização completa da presença digital com foco em experiência mobile e conversão direta via WhatsApp, demonstrando a diferença entre um site comum e uma máquina de vendas online.`;

    const report = {
      company_name: company.name,
      executive_summary: `Análise diagnóstica realizada para ${company.name} (${company.segment}). O negócio apresenta ${opportunityLevel.toLowerCase()} para implementação de infraestrutura digital de vendas. A ausência de site próprio ou modernização representa um vazamento diário de oportunidades para concorrentes na região.`,
      current_presence: hasSite 
        ? `Possui site (${company.current_site}) com necessidade de reformulação moderna e melhoria no funil de conversão.` 
        : `Atualmente NÃO possui site ativo. Depende exclusivamente de boca a boca ou redes sociais.`,
      strengths,
      issues_found: issues,
      opportunities,
      recommended_strategy: recommendedStrategy,
      score_breakdown: {
        instagram_quality: hasInsta ? 72 : 28,
        website_presence: hasSite ? 45 : 12,
        communication_speed: 68,
        local_seo_maps: hasMaps ? 60 : 35
      }
    };

    return {
      id: `ana-${Date.now()}`,
      company_id: company.id,
      digital_score: opportunityScore,
      opportunity_level: opportunityLevel,
      report,
      created_at: new Date().toISOString()
    };
  }

  /**
   * 5 — WEBSITE CONCEPT AI
   * Cria uma demonstração personalizada com nome visual, estilo, paleta, estrutura e textos.
   */
  /**
   * 5 — WEBSITE CONCEPT AI
   * Cria uma demonstração personalizada com opções de estilo, paleta, estrutura e textos.
   */
  public static async generateWebsiteConcept(company: Company, variantIndex: number = 0): Promise<WebsiteConcept> {
    await new Promise((r) => setTimeout(r, 600));

    const template = DEMO_TEMPLATES.find(t => 
      t.segment.toLowerCase().includes(company.segment.toLowerCase()) || 
      company.segment.toLowerCase().includes(t.segment.toLowerCase())
    ) || DEMO_TEMPLATES[0];

    const city = company.city || 'João Pinheiro - MG';
    const baseColors = template.colors;

    // 5 Fundamentally Distinct Layout Architectures
    const variantConfigs: {
      title: string;
      layout_type: ConceptLayoutType;
      style: string;
      badge: string;
      palette: { primary: string; secondary: string; accent: string; background: string; text: string };
      heroHeadline: string;
      heroSub: string;
      ctaText: string;
    }[] = [
      {
        title: 'Opção 1: Luxury Showcase VIP',
        layout_type: 'luxury',
        style: 'Estética de luxo, tipografia clássica, acabamento nobre e lookbook em destaque',
        badge: 'Alto Padrão',
        palette: {
          primary: baseColors[0] || '#1A1A1A',
          secondary: baseColors[1] || '#282828',
          accent: '#D4AF37',
          background: '#FCFBF9',
          text: '#1C1917'
        },
        heroHeadline: template.hero_copy.replace('João Pinheiro', city),
        heroSub: `A referência definitiva em ${company.segment} em ${city}. Curadoria exclusiva e padrão de qualidade inquestionável.`,
        ctaText: 'Ver Coleção Exclusiva'
      },
      {
        title: 'Opção 2: Dark Mode High-Tech & Conversão',
        layout_type: 'dark_tech',
        style: 'Modo escuro futurista, bordas neon luminosas e botões de alta conversão',
        badge: 'Neon & Conversão',
        palette: {
          primary: '#071321',
          secondary: '#0A2740',
          accent: '#00BFFF',
          background: '#040810',
          text: '#F8FAFC'
        },
        heroHeadline: `Agilidade, precisão e o melhor de ${company.segment} em ${city} direto no WhatsApp.`,
        heroSub: `Conecte-se instantaneamente com nossa equipe e garanta atendimento prioritário sem filas nem espera.`,
        ctaText: 'Falar no WhatsApp em 1 Clique'
      },
      {
        title: 'Opção 3: Minimalista Clean & Magazine',
        layout_type: 'minimal',
        style: 'Minimalista puro, espaço em branco contemporâneo e foco absoluto no produto',
        badge: 'Design Clean',
        palette: {
          primary: '#09090B',
          secondary: '#18181B',
          accent: '#71717A',
          background: '#FFFFFF',
          text: '#18181B'
        },
        heroHeadline: `Tudo o que você procura em ${company.segment}, de forma simples e transparente em ${city}.`,
        heroSub: `Qualidade inquestionável, preços justos e satisfação comprovada por clientes de toda a região.`,
        ctaText: 'Conhecer Nossas Soluções'
      },
      {
        title: 'Opção 4: Catálogo Comercial & Pedidos WhatsApp',
        layout_type: 'catalog',
        style: 'Formato e-commerce e delivery local com seletor de categorias e botão rápido de compra',
        badge: 'Vendas Diretas',
        palette: {
          primary: '#0F172A',
          secondary: '#1E293B',
          accent: '#10B981',
          background: '#F8FAFC',
          text: '#0F172A'
        },
        heroHeadline: `Os melhores produtos e soluções de ${company.segment} com entrega ágil em ${city}.`,
        heroSub: `Navegue pelo nosso catálogo online e faça seu pedido direto pelo WhatsApp com total segurança.`,
        ctaText: 'Fazer Pedido Agora'
      },
      {
        title: 'Opção 5: Corporativo, Autoridade & Agendamento',
        layout_type: 'authority',
        style: 'Institucional sólido, formulário de agendamento na primeira dobra e selos de credibilidade',
        badge: 'Autoridade & Confiança',
        palette: {
          primary: '#0369A1',
          secondary: '#0C4A6E',
          accent: '#38BDF8',
          background: '#F0F9FF',
          text: '#0F172A'
        },
        heroHeadline: `Excelência e segurança profissional em ${company.segment} para você e sua família em ${city}.`,
        heroSub: `Corpo técnico certificado, infraestrutura completa e atendimento pontual e humanizado.`,
        ctaText: 'Agendar Consulta / Horário'
      }
    ];

    const currentConfig = variantConfigs[variantIndex % variantConfigs.length];

    return {
      id: `cpt-${Date.now()}-${variantIndex}`,
      company_id: company.id,
      variant_title: currentConfig.title,
      layout_type: currentConfig.layout_type,
      custom_badge: currentConfig.badge,
      visual_name: `${company.name} — ${currentConfig.title}`,
      style: currentConfig.style,
      color_palette: currentConfig.palette,
      site_structure: {
        hero: {
          headline: currentConfig.heroHeadline,
          subheadline: currentConfig.heroSub,
          cta_text: currentConfig.ctaText
        },
        social_proof: [
          `Referência em ${company.segment} em ${city}`,
          `Centenas de clientes atendidos com nota 5 estrelas`,
          'Atendimento ágil, personalizado e transparente'
        ],
        services: [
          {
            title: `Soluções Especiais em ${company.segment}`,
            description: 'Serviços e produtos sob medida pensados para superar as expectativas dos clientes mais exigentes.'
          },
          {
            title: 'Atendimento Consultivo e Rápido',
            description: 'Nossa equipe está pronta para orientar a melhor escolha com total dedicação e respeito ao seu tempo.'
          },
          {
            title: 'Garantia de Qualidade e Satisfação',
            description: 'Padrão rigoroso em cada entrega, assegurando total tranquilidade para você e sua família.'
          }
        ],
        testimonials: [
          {
            name: 'Cliente Verificado',
            comment: `Excelente atendimento e profissionalismo da equipe da ${company.name}. Recomendo para toda a cidade de ${city.split('-')[0].trim()}!`,
            rating: 5
          },
          {
            name: 'Morador Local',
            comment: `Serviço impecável. Fui atendido super rápido pelo WhatsApp e recebi exatamente o que precisava.`,
            rating: 5
          }
        ],
        location_cta: {
          address_highlight: `Localização Privilegiada em ${city}`,
          whatsapp_cta: `Fale agora no WhatsApp: ${company.whatsapp || 'Atendimento Oficial'}`
        },
        faq: [
          {
            question: `Como funciona o atendimento da ${company.name}?`,
            answer: `Você pode nos chamar diretamente pelo botão de WhatsApp para tirar dúvidas ou fazer seu pedido em menos de 1 minuto.`
          },
          {
            question: `Quais as formas de pagamento aceitas?`,
            answer: `Aceitamos Pix, cartões de crédito em até 12x e condições facilitadas para moradores de ${city}.`
          }
        ]
      },
      active_sections: ['hero', 'social_proof', 'services', 'testimonials', 'location_cta', 'faq'],
      image_suggestions: template.suggested_images,
      created_at: new Date().toISOString()
    };
  }

  public static async generateMultipleConcepts(company: Company): Promise<WebsiteConcept[]> {
    const list: WebsiteConcept[] = [];
    for (let i = 0; i < 5; i++) {
      list.push(await this.generateWebsiteConcept(company, i));
    }
    return list;
  }

  /**
   * 6 — SALES AI
   * Gera mensagens de venda personalizadas para WhatsApp, Instagram e E-mail.
   */
  public static async generateSalesMessages(company: Company, analysis?: DigitalAnalysis): Promise<SalesMessages> {
    await new Promise((r) => setTimeout(r, 700));

    const city = company.city || 'João Pinheiro';
    const mainIssue = analysis?.report?.issues_found?.[0] || 'não possui um site moderno para captação de clientes no Google';

    const whatsapp = `Olá, tudo bem? Aqui é o especialista em estratégias digitais aqui de ${city}! 🚀

Estava pesquisando referências de ${company.segment} em ${city} e fiquei muito impressionado com o trabalho da ${company.name}! Parabéns pelo posicionamento.

Porém, notei um detalhe importante: ao pesquisar pelo seu negócio no Google, percebi que você ainda ${mainIssue.toLowerCase().replace('não possui site próprio: ', '')}. 

Isso faz com que clientes da nossa cidade acabem caindo no WhatsApp de outros concorrentes ou fiquem com dúvidas sobre seus serviços.

Para te ajudar, eu criei uma demonstração visual gratuita e exclusiva de como ficaria um **Site Moderno e Máquina de Vendas** para a ${company.name} (já adaptado para o celular).

Posso te mandar o link da demonstração aqui? Leva menos de 1 minuto para ver! 📲✨`;

    const instagram = `Oi equipe da ${company.name}! Admiro muito o trabalho de vocês em ${city}! 👏

Percebi que muitos clientes procuram por ${company.segment} no Google e vocês ainda não têm um site oficial com catálogo rápido integrado ao WhatsApp.

Desenvolvi um protótipo visual exclusivo da ${company.name} para vocês verem como ficaria incrível. Posso mandar a prévia para vocês darem uma olhada? É rapidinho! 😊🚀`;

    const email = {
      subject: `Demonstração Visual Exclusiva para ${company.name} — Oportunidade Digital em ${city}`,
      body: `Prezado(a) gestor(a) da ${company.name},

Espero que este e-mail o(a) encontre em excelente momento.

Acompanho o setor de ${company.segment} em ${city} e identifiquei um potencial imediato de expansão para a ${company.name}.

Ao realizarmos uma auditoria digital do mercado local, constatamos que consumidores que buscam soluções pelo Google ou redes sociais encontram gargalos para obter respostas imediatas e acessar o portfólio oficial da sua empresa.

Diante disso, desenvolvemos um conceito visual exclusivo de um **Portal de Alta Conversão**, projetado especificamente para:
1. Posicionar a ${company.name} como autoridade máxima de ${company.segment} em ${city};
2. Automatizar o atendimento preliminar via WhatsApp com um clique;
3. Captar clientes qualificados que hoje compram da concorrência por falta de um canal web oficial.

Criamos um ambiente interativo onde você pode conferir essa proposta visual em menos de 2 minutos.

Ficamos à disposição para compartilhar a demonstração e avaliar como implementar essa máquina de vendas para o seu negócio.

Cordialmente,

Equipe JP Digital Seller AI
Especialistas em Crescimento Digital de Negócios Locais
Contato: consultoria@jpdigitalseller.com.br`
    };

    return {
      id: `msg-${Date.now()}`,
      company_id: company.id,
      whatsapp,
      instagram,
      email,
      created_at: new Date().toISOString()
    };
  }

  /**
   * 7 — PROPOSAL AI
   * Gera uma proposta comercial completa, estruturada e pronta para exportar/imprimir em PDF.
   */
  public static async generateProposal(company: Company, analysis?: DigitalAnalysis): Promise<Proposal> {
    await new Promise((r) => setTimeout(r, 900));

    const settings = store.getSettings();
    const city = company.city || settings.agency.city || 'João Pinheiro - MG';
    const mainProblem = analysis?.report?.issues_found?.[0] || 'Ausência de site institucional responsivo e perda de clientes nas pesquisas locais do Google';

    const configuredTiers = (settings.proposal?.tiers && settings.proposal.tiers.length > 0)
      ? settings.proposal.tiers
      : [
          {
            name: 'Plano Essencial Express',
            price: 'R$ 997,00',
            features: [
              'Landing Page de Alta Conversão',
              'Seções Hero, Serviços e Depoimentos',
              'Botão Flutuante de WhatsApp',
              'Otimização Completa para Celular',
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
              `Otimização SEO Local (Google ${city.split('-')[0].trim()})`,
              'Registro de Domínio .com.br + Certificado SSL',
              'Hospedagem Premium por 12 meses',
              'Painel Administrativo para Atualizações',
              'Suporte prioritário via WhatsApp'
            ]
          },
          {
            name: 'Plano Estratégico Premium VIP',
            price: 'R$ 2.900,00',
            features: [
              'Tudo incluído no Plano Profissional',
              'Configuração Completa do Google Meu Negócio / Maps',
              'Configuração de Anúncios no Meta Ads (Instagram/Facebook)',
              'Treinamento de Fechamento de Vendas no WhatsApp',
              'Consultoria Mensal de Performance (primeiros 30 dias)'
            ]
          }
        ];

    const configuredDeliverables = (settings.proposal?.default_deliverables && settings.proposal.default_deliverables.length > 0)
      ? settings.proposal.default_deliverables
      : [
          'Site Profissional Responsivo (Otimizado para Celulares, Tablets e Computadores)',
          'Integração direta com o WhatsApp Comercial da empresa com mensagem personalizada',
          `Configuração e otimização do Google Meu Negócio / Google Maps em ${city}`,
          'Hospedagem de alta performance e segurança com Certificado SSL (HTTPS) incluso',
          'Registro e configuração do domínio oficial (.com.br)',
          'Painel simples e intuitivo para atualização de dados, fotos e promoções',
          'Treinamento prático da equipe para atendimento rápido de leads vindos do site'
        ];

    const configuredNextSteps = (settings.proposal?.next_steps && settings.proposal.next_steps.length > 0)
      ? settings.proposal.next_steps
      : [
          '1. Seleção do plano que melhor atende os objetivos da empresa',
          '2. Envio do comprovante de início ou parcelamento',
          '3. Reunião rápida (15 a 20 minutos) para coleta de fotos e preferências',
          '4. Apresentação da versão final e publicação oficial na internet!'
        ];

    return {
      id: `prop-${Date.now()}`,
      company_id: company.id,
      company_name: company.name,
      cover_title: settings.proposal?.cover_title || 'Proposta Comercial de Transformação & Vendas Digitais',
      cover_subtitle: `Desenvolvimento de Site Profissional e Posicionamento Estratégico para ${company.name} em ${city}`,
      current_analysis: `A ${company.name} conta com excelente reconhecimento de marca e qualidade em ${company.segment}, porém sua presença online atual não reflete todo o potencial do negócio, deixando de converter leads que diariamente buscam por soluções na internet.`,
      problem_diagnosed: mainProblem,
      recommended_solution: `Construção de um Site Institucional e Máquina de Vendas Digital ultra-rápida, com design sob medida, copywriting persuasivo, otimização de SEO para o Google de ${city} e canal direto para o WhatsApp comercial.`,
      deliverables: configuredDeliverables,
      timeline: settings.proposal?.timeline || '5 a 7 dias úteis após o envio dos materiais básicos (fotos e logotipo).',
      tiers: configuredTiers,
      next_steps: configuredNextSteps,
      created_at: new Date().toISOString()
    };
  }
}
