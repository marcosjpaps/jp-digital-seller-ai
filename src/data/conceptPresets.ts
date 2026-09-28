export interface StylePreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  characteristics: string[];
}

export interface ColorPalettePreset {
  id: string;
  name: string;
  tag: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export interface StructureSectionPreset {
  id: string;
  label: string;
  description: string;
  category: 'core' | 'conversion' | 'authority' | 'trust';
  defaultActive: boolean;
}

export interface CopyPreset {
  id: string;
  angle: string;
  headlineTemplate: string;
  subheadlineTemplate: string;
  ctaTemplate: string;
}

// 1. 10 ESTILOS VISUAIS
export const PRESET_STYLES: StylePreset[] = [
  {
    id: 'elegante-luxo',
    name: 'Elegante & Sofisticado',
    badge: 'Alto Padrão',
    description: 'Estética nobre, tipografia refinada e sensação de exclusividade.',
    characteristics: ['Tipografia com serifa/elegante', 'Espaçamento generoso', 'Detalhes dourados e nudes']
  },
  {
    id: 'dark-high-tech',
    name: 'Dark Mode High-Tech',
    badge: 'Futurista & Tech',
    description: 'Fundo escuro profundo com contrastes em azul elétrico e cyan.',
    characteristics: ['Alta imersão noturna', 'Bordas luminosas', 'Sensação de software inovador']
  },
  {
    id: 'minimalista-clean',
    name: 'Minimalista & Clean',
    badge: 'Essencial',
    description: 'Foco total no produto e na mensagem, sem ruídos ou distrações.',
    characteristics: ['Muito espaço em branco', 'Linhas finas', 'Hierarquia direta e leveza']
  },
  {
    id: 'vibrante-comercial',
    name: 'Vibrante & Alta Energia',
    badge: 'Foco em Vendas',
    description: 'Cores dinâmicas, botões de ação chamativos e apelo promocional.',
    characteristics: ['Gatilhos de urgência', 'Contraste alto', 'CTA WhatsApp destacado']
  },
  {
    id: 'executivo-corporativo',
    name: 'Executivo & Corporativo',
    badge: 'Institucional',
    description: 'Sobriedade, azul marinho e solidez para inspirar máxima confiança.',
    characteristics: ['Transmite tradição', 'Credenciais e prêmios', 'Padrão bancário e consultivo']
  },
  {
    id: 'rustico-artesanal',
    name: 'Rústico Artesanal & Acolhedor',
    badge: 'Humanizado',
    description: 'Tons terrosos, calor humano e proximidade com a comunidade.',
    characteristics: ['Texturas suaves', 'Sensação de aconchego', 'Valorização da história local']
  },
  {
    id: 'saude-cuidado',
    name: 'Saúde, Cuidado & Confiança',
    badge: 'Médico & Bem-estar',
    description: 'Ambiente higiênico, cores suaves e sensação de tranquilidade.',
    characteristics: ['Tons azul celeste e verde menta', 'Rostos sorridentes', 'Foco no bem-estar']
  },
  {
    id: 'alta-gastronomia',
    name: 'Alta Gastronomia & Bistrô',
    badge: 'Gourmet',
    description: 'Pratos fotogênicos em destaque, ambiente sofisticado e apetite.',
    characteristics: ['Preto profundo e âmbar', 'Menu digital interativo', 'Fotos de dar água na boca']
  },
  {
    id: 'imobiliario-moderno',
    name: 'Imobiliário & Investimento',
    badge: 'Patrimonial',
    description: 'Apresentação imponente de imóveis e lançamentos para morar e investir.',
    characteristics: ['Filtros de busca rápidos', 'Destaque de metros quadrados', 'Tours virtuais']
  },
  {
    id: 'criativo-boutique',
    name: 'Criativo & Editorial',
    badge: 'Design Tendência',
    description: 'Composições assimétricas modernas e estética digna de revista.',
    characteristics: ['Layout contemporâneo', 'Lookbook interativo', 'Identidade autêntica']
  }
];

// 2. 10 PALETAS DE CORES PRONTAS
export const PRESET_PALETTES: ColorPalettePreset[] = [
  {
    id: 'ouro-preto',
    name: 'Ouro Nobre & Preto Obsidiana',
    tag: 'Luxo',
    palette: {
      primary: '#1A1A1A',
      secondary: '#282828',
      accent: '#D4AF37',
      background: '#FCFBF9',
      text: '#1C1917'
    }
  },
  {
    id: 'azul-eletrico-navy',
    name: 'Azul Elétrico & Dark Navy',
    tag: 'SaaS Moderno',
    palette: {
      primary: '#0A2740',
      secondary: '#071321',
      accent: '#00BFFF',
      background: '#F8FAFC',
      text: '#0F172A'
    }
  },
  {
    id: 'esmeralda-noite',
    name: 'Esmeralda Nobre & Noite',
    tag: 'Sucesso & Prosperidade',
    palette: {
      primary: '#064E3B',
      secondary: '#022C22',
      accent: '#10B981',
      background: '#F0FDF4',
      text: '#064E3B'
    }
  },
  {
    id: 'terracota-areia',
    name: 'Terracota Artesanal & Areia',
    tag: 'Aconchegante',
    palette: {
      primary: '#7C2D12',
      secondary: '#431407',
      accent: '#EA580C',
      background: '#FEF3C7',
      text: '#451A03'
    }
  },
  {
    id: 'roxo-neon-cyber',
    name: 'Roxo Cyber & Deep Violet',
    tag: 'Inovador',
    palette: {
      primary: '#3B0764',
      secondary: '#1E1B4B',
      accent: '#A855F7',
      background: '#FAF5FF',
      text: '#2E1065'
    }
  },
  {
    id: 'saude-ceu',
    name: 'Azul Sereno & Saúde',
    tag: 'Clínica & Odonto',
    palette: {
      primary: '#0369A1',
      secondary: '#0C4A6E',
      accent: '#38BDF8',
      background: '#F0F9FF',
      text: '#0F172A'
    }
  },
  {
    id: 'rubi-carvao',
    name: 'Rubi Gourmet & Carvão Nobre',
    tag: 'Gastronomia',
    palette: {
      primary: '#881337',
      secondary: '#1C1917',
      accent: '#F43F5E',
      background: '#FFF1F2',
      text: '#1C1917'
    }
  },
  {
    id: 'rosa-quartz-dourado',
    name: 'Rosa Quartz & Dourado Suave',
    tag: 'Boutique & Beleza',
    palette: {
      primary: '#831843',
      secondary: '#4C0519',
      accent: '#EC4899',
      background: '#FDF2F8',
      text: '#500724'
    }
  },
  {
    id: 'teal-ambar',
    name: 'Teal Moderno & Âmbar Solar',
    tag: 'Arquitetura & Engenharia',
    palette: {
      primary: '#0F766E',
      secondary: '#134E4A',
      accent: '#F59E0B',
      background: '#F0FDFA',
      text: '#134E4A'
    }
  },
  {
    id: 'monocromatico-minimal',
    name: 'Preto & Branco Minimalista Puro',
    tag: 'Clean Minimal',
    palette: {
      primary: '#09090B',
      secondary: '#18181B',
      accent: '#71717A',
      background: '#FFFFFF',
      text: '#18181B'
    }
  }
];

// 3. 10 OPÇÕES DE ESTRUTURA DO SITE
export const PRESET_STRUCTURE_SECTIONS: StructureSectionPreset[] = [
  {
    id: 'hero',
    label: '1. Dobra Principal (Hero)',
    description: 'Headline magnética, foto de alto impacto e botão direto de WhatsApp.',
    category: 'core',
    defaultActive: true
  },
  {
    id: 'social_proof',
    label: '2. Barra de Prova Social Local',
    description: 'Destaques numéricos (+5.000 clientes, anos de história em João Pinheiro).',
    category: 'authority',
    defaultActive: true
  },
  {
    id: 'services',
    label: '3. Vitrine de Serviços / Produtos',
    description: 'Grade com cartões ilustrativos e detalhes das principais soluções.',
    category: 'core',
    defaultActive: true
  },
  {
    id: 'differentials',
    label: '4. Diferenciais & Por Que Escolher',
    description: 'Motivos claros pelos quais a empresa supera os concorrentes locais.',
    category: 'authority',
    defaultActive: true
  },
  {
    id: 'testimonials',
    label: '5. Depoimentos com 5 Estrelas',
    description: 'Avaliações reais de clientes com estrelas douradas e comentários sinceros.',
    category: 'trust',
    defaultActive: true
  },
  {
    id: 'gallery',
    label: '6. Galeria Visual & Portfólio',
    description: 'Fotos reais de trabalhos entregues, pratos servidos ou produtos da loja.',
    category: 'authority',
    defaultActive: true
  },
  {
    id: 'faq',
    label: '7. Perguntas Frequentes (FAQ)',
    description: 'Respostas para as 4 dúvidas mais comuns que travam o fechamento de vendas.',
    category: 'conversion',
    defaultActive: true
  },
  {
    id: 'guarantee',
    label: '8. Selo de Garantia & Procedência',
    description: 'Tranquilidade e segurança para quem contrata ou compra pela primeira vez.',
    category: 'trust',
    defaultActive: true
  },
  {
    id: 'location_cta',
    label: '9. Mapa de Localização & Horários',
    description: 'Endereço em João Pinheiro, link para GPS e horários de atendimento.',
    category: 'core',
    defaultActive: true
  },
  {
    id: 'floating_cta',
    label: '10. Botão Flutuante de WhatsApp 24/7',
    description: 'Canal de atendimento sempre acessível em qualquer rolagem de tela.',
    category: 'conversion',
    defaultActive: true
  }
];

// 4. 10 OPÇÕES DE COPYWRITING E HEADLINES
export const PRESET_COPIES: CopyPreset[] = [
  {
    id: 'autoridade-absoluta',
    angle: 'Autoridade & Liderança Local',
    headlineTemplate: 'A referência definitiva em {segment} em {city}.',
    subheadlineTemplate: 'Tradição, excelência no atendimento e o padrão de qualidade que você e sua família merecem.',
    ctaTemplate: 'Falar com Especialista no WhatsApp'
  },
  {
    id: 'rapidez-agilidade',
    angle: 'Velocidade & Atendimento Sem Espera',
    headlineTemplate: 'Agilidade, precisão e o atendimento mais rápido de {city}.',
    subheadlineTemplate: 'Diga adeus à espera. Tire dúvidas, solicite orçamentos e seja atendido em minutos.',
    ctaTemplate: 'Receber Atendimento Imediato'
  },
  {
    id: 'exclusividade-luxo',
    angle: 'Exclusividade & Experiência VIP',
    headlineTemplate: 'Soluções exclusivas para quem valoriza sofisticação em cada detalhe.',
    subheadlineTemplate: 'Uma curadoria pensada sob medida para superar as expectativas dos clientes mais exigentes.',
    ctaTemplate: 'Conhecer Catálogo Exclusivo'
  },
  {
    id: 'custo-beneficio',
    angle: 'Transparência & Custo-Benefício',
    headlineTemplate: 'O melhor investimento em {segment} sem surpresas na entrega.',
    subheadlineTemplate: 'Qualidade superior com condições justas e transparentes para você fechar o melhor negócio.',
    ctaTemplate: 'Solicitar Orçamento Transparente'
  },
  {
    id: 'transformacao',
    angle: 'Transformação & Resultados Reais',
    headlineTemplate: 'Transforme o seu dia a dia com os melhores profissionais de {city}.',
    subheadlineTemplate: 'Resultados comprovados que geram satisfação e segurança desde o primeiro contato.',
    ctaTemplate: 'Quero Transformar Minha Experiência'
  },
  {
    id: 'tradicao-confianca',
    angle: 'Tradição, Raízes & Segurança',
    headlineTemplate: 'Anos de história e a confiança de centenas de pinheiSquare.',
    subheadlineTemplate: 'Um compromisso sério com nossa cidade, entregando qualidade que atravessa gerações.',
    ctaTemplate: 'Conversar com a Nossa Equipe'
  },
  {
    id: 'descomplicado-facil',
    angle: 'Facilidade & Zero Burocracia',
    headlineTemplate: 'Tudo o que você procura em {segment}, de forma simples e direta.',
    subheadlineTemplate: 'Sem complicação: escolha o que precisa e fale direto no WhatsApp com quem resolve.',
    ctaTemplate: 'Pedir Agora via WhatsApp'
  },
  {
    id: 'inovacao-modernidade',
    angle: 'Inovação & Tecnologia de Ponta',
    headlineTemplate: 'O futuro de {segment} já chegou em {city}.',
    subheadlineTemplate: 'Técnicas modernas, infraestrutura de ponta e inovação para entregar o melhor para você.',
    ctaTemplate: 'Agendar Uma Demonstração'
  },
  {
    id: 'comunidade-acolhimento',
    angle: 'Acolhimento & Cuidado Humano',
    headlineTemplate: 'Mais do que clientes, construímos relacionamentos de carinho e respeito.',
    subheadlineTemplate: 'Um ambiente pensado para você se sentir em casa em cada visita.',
    ctaTemplate: 'Venha Tomar um Café Conosco'
  },
  {
    id: 'oferta-oportunidade',
    angle: 'Oportunidade & Condições Especiais',
    headlineTemplate: 'A oportunidade perfeita para garantir o melhor de {segment} hoje.',
    subheadlineTemplate: 'Condições exclusivas de lançamento por tempo limitado para clientes da região.',
    ctaTemplate: 'Garantir Minha Condição Especial'
  }
];
