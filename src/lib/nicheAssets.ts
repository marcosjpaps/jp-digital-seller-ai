import { Company, WebsiteConcept } from '@/types';

export interface NicheData {
  id: string;
  name: string;
  keywords: string[];
  palette: { primary: string; secondary: string; accent: string; background: string; text: string };
  images: string[];
  heroHeadline: string;
  heroSub: string;
  ctaText: string;
  services: { title: string; description: string }[];
  socialProof: string[];
  faq: { question: string; answer: string }[];
}

export const NICHES: NicheData[] = [
  {
    id: 'odontologia',
    name: 'Odontologia & Estética Dental',
    keywords: ['odonto', 'dent', 'sorriso', 'ortodontia', 'dente', 'implante', 'clareamento'],
    palette: {
      primary: '#0D9488',
      secondary: '#134E4A',
      accent: '#06B6D4',
      background: '#F8FAFC',
      text: '#0F172A'
    },
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop'
    ],
    heroHeadline: 'Transforme o seu sorriso com tecnologia digital e conforto absoluto.',
    heroSub: 'Tratamentos de excelência em implantes, alinhadores transparentes e estética dental para devolver sua autoconfiança.',
    ctaText: 'Avaliar Meu Sorriso no WhatsApp',
    services: [
      { title: 'Implantes & Próteses Fixas', description: 'Recupere a mastigação e o sorriso natural com procedimentos modernos, rápidos e sem dor.' },
      { title: 'Alinhadores Invisíveis & Ortodontia', description: 'Dentes perfeitamente alinhados com discrição e conforto, sem aparelhos metálicos convencionais.' },
      { title: 'Lentes em Resina & Clareamento', description: 'Estética dental personalizada para um sorriso branco, harmônico e radiante.' }
    ],
    socialProof: [
      'Mais de 1.500 sorrisos transformados com nota máxima',
      'Consultórios modernos e biossegurança rigorosa',
      'Atendimento pontual e humanizado para toda a família'
    ],
    faq: [
      { question: 'Como agendar a primeira consulta de avaliação?', answer: 'Basta clicar no botão do WhatsApp. Nossa recepção responde em poucos minutos para encontrar o melhor horário para você.' },
      { question: 'Quais as formas de pagamento para os tratamentos?', answer: 'Facilitamos em até 12x no cartão de crédito, Pix e condições personalizadas de parcelamento.' }
    ]
  },
  {
    id: 'restaurante',
    name: 'Restaurantes, Hamburguerias & Gastronomia',
    keywords: ['restaurante', 'burguer', 'burger', 'lanche', 'pizza', 'pizzaria', 'churrascaria', 'bar', 'chopp', 'gastro', 'comida'],
    palette: {
      primary: '#1C1917',
      secondary: '#292524',
      accent: '#F59E0B',
      background: '#0C0A09',
      text: '#F5F5F4'
    },
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'
    ],
    heroHeadline: 'Experiência gastronômica inesquecível com sabor autêntico e ingredientes selecionados.',
    heroSub: 'Peça delivery rápido no conforto da sua casa ou venha viver momentos especiais em nosso ambiente acolhedor.',
    ctaText: 'Ver Cardápio & Pedir no WhatsApp',
    services: [
      { title: 'Cortes Especiais & Pratos da Casa', description: 'Receitas exclusivas preparadas com carinho e padrão gastronômico superior.' },
      { title: 'Delivery Ágil Sem Taxas Extras', description: 'Seu pedido entregue quentinho na sua porta com acompanhamento em tempo real.' },
      { title: 'Reservas de Mesas & Comemorações', description: 'Espaço perfeito para aniversários, encontros de amigos e jantares em família.' }
    ],
    socialProof: [
      'Top avaliado no Google com milhares de pedidos entregues',
      'Ingredientes frescos e carnes nobres todos os dias',
      'Atendimento carinhoso e delivery mais rápido da cidade'
    ],
    faq: [
      { question: 'Qual o tempo médio de entrega do delivery?', answer: 'Nosso tempo médio de preparo e entrega é de 35 a 50 minutos, garantindo que tudo chegue quentinho e crocante.' },
      { question: 'Posso reservar mesa com antecedência?', answer: 'Sim! Clique no WhatsApp e envie sua solicitação de reserva sem nenhum custo.' }
    ]
  },
  {
    id: 'clinica',
    name: 'Clínica Médica & Saúde Especializada',
    keywords: ['medico', 'clinica', 'saude', 'oftalmo', 'exame', 'laboratorio', 'doutor', 'hospital', 'psicologia', 'fisioterapia'],
    palette: {
      primary: '#0369A1',
      secondary: '#075985',
      accent: '#38BDF8',
      background: '#F0F9FF',
      text: '#0F172A'
    },
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop'
    ],
    heroHeadline: 'Medicina humanizada, tecnologia de ponta e cuidado integral para sua saúde.',
    heroSub: 'Corpo clínico multidisciplinar dedicado a diagnósticos precisos e tratamentos seguros para você e sua família.',
    ctaText: 'Agendar Consulta / Exame',
    services: [
      { title: 'Consultas Médicas com Especialistas', description: 'Atendimento atencioso com hora marcada, sem esperas intermináveis na sala de espera.' },
      { title: 'Exames Complementares no Local', description: 'Infraestrutura diagnóstica completa com entrega ágil de laudos e resultados online.' },
      { title: 'Medicina Preventiva & Check-ups', description: 'Acompanhamento preventivo contínuo para manter sua qualidade de vida sempre em alta.' }
    ],
    socialProof: [
      'Equipe de especialistas com titulação reconhecida',
      'Ambiente climatizado, acessível e confortável',
      'Resultados de exames com agilidade e precisão'
    ],
    faq: [
      { question: 'Quais convênios são atendidos?', answer: 'Atendemos os principais convênios da região e também oferecemos tabela social acessível para consultas particulares.' }
    ]
  },
  {
    id: 'imobiliaria',
    name: 'Imobiliárias, Terrenos & Fazendas',
    keywords: ['imob', 'imoveis', 'fazenda', 'terreno', 'lote', 'corretor', 'aluguel', 'venda de casa'],
    palette: {
      primary: '#0A2540',
      secondary: '#1E293B',
      accent: '#F59E0B',
      background: '#F8FAFC',
      text: '#0F172A'
    },
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop'
    ],
    heroHeadline: 'O imóvel ou fazenda ideal para morar ou investir com total segurança jurídica.',
    heroSub: 'Carteira selecionada de casas, apartamentos, lotes urbanos e propriedades rurais com assessoria completa do início ao fim.',
    ctaText: 'Falar com Corretor Especialista',
    services: [
      { title: 'Venda de Imóveis Urbanos & Rurais', description: 'Curadoria criteriosa de imóveis com documentação rigorosamente verificada.' },
      { title: 'Avaliação Mercadológica Imobiliária', description: 'Precificação correta e realista do seu patrimônio para uma venda justa e rápida.' },
      { title: 'Assessoria em Financiamento Bancário', description: 'Cuidamos de toda a burocracia bancária para aprovação do seu crédito com as melhores taxas.' }
    ],
    socialProof: [
      'Mais de 10 anos de credibilidade e centenas de contratos realizados',
      'Corretores credenciados pelo CRECI com atendimento consultivo',
      'Segurança jurídica em cada etapa da negociação'
    ],
    faq: [
      { question: 'Como faço para anunciar meu imóvel com vocês?', answer: 'Basta entrar em contato pelo WhatsApp. Nossa equipe faz uma visita para fotos e avaliação sem custos.' }
    ]
  },
  {
    id: 'barbearia',
    name: 'Barbearias, Salões & Estética',
    keywords: ['barbearia', 'barbeir', 'salao', 'cabelo', 'estetica', 'manicure', 'sobrancelha', 'noiva', 'lash'],
    palette: {
      primary: '#18181B',
      secondary: '#27272A',
      accent: '#EAB308',
      background: '#09090B',
      text: '#FAFAFA'
    },
    images: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop'
    ],
    heroHeadline: 'Estilo impecável, corte moderno e atendimento de alto padrão para você.',
    heroSub: 'Cuidado completo com visual refinado, ambiente descontraído e produtos de primeira linha para valorizar sua imagem.',
    ctaText: 'Agendar Meu Horário no WhatsApp',
    services: [
      { title: 'Cortes Modernos & Clássicos', description: 'Visagismo e técnicas atuais para valorizar os traços do seu rosto.' },
      { title: 'Barboterapia & Toalha Quente', description: 'Relaxamento total com navalha afiada, hidratação profunda e óleos essenciais.' },
      { title: 'Tratamentos Capilares & Estética', description: 'Selagem, hidratação, pigmentação e cuidados para cabelo e barba sempre saudáveis.' }
    ],
    socialProof: [
      'Ambiente climatizado com cerveja gelada e sinuca',
      'Profissionais experientes e premiados',
      'Agendamento rápido sem perda de tempo em filas'
    ],
    faq: [
      { question: 'Preciso agendar com antecedência?', answer: 'Recomendamos agendar pelo WhatsApp para garantir seu horário sem espera.' }
    ]
  },
  {
    id: 'oficina',
    name: 'Oficinas Mecânicas & Centro Automotivo',
    keywords: ['oficina', 'mecanic', 'pneu', 'auto', 'carro', 'funilaria', 'motor', 'oleo', 'alinhamento'],
    palette: {
      primary: '#0F172A',
      secondary: '#1E293B',
      accent: '#EF4444',
      background: '#020617',
      text: '#F8FAFC'
    },
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop'
    ],
    heroHeadline: 'Manutenção de confiança, peças originais e garantia total para o seu veículo.',
    heroSub: 'Diagnóstico computadorizado com transparência de custos e agilidade para você voltar a rodar com tranquilidade.',
    ctaText: 'Solicitar Orçamento Rápido no WhatsApp',
    services: [
      { title: 'Revisão Preventiva & Freios', description: 'Inspeção completa dos itens de segurança para viagens tranquilas sem imprevistos.' },
      { title: 'Alinhamento 3D & Troca de Pneus', description: 'Estabilidade perfeita e maior durabilidade dos seus pneus com maquinário de ponta.' },
      { title: 'Diagnóstico Eletrônico & Injeção', description: 'Detecção precisa de falhas com scanner automotivo atualizado para todas as marcas.' }
    ],
    socialProof: [
      'Garantia por escrito em todas as peças e serviços',
      'Mecânicos capacitados e honestidade comprovada',
      'Orçamento prévio sem surpresas na entrega'
    ],
    faq: [
      { question: 'O orçamento é cobrado?', answer: 'A avaliação inicial e orçamento prévio são gratuitos para os serviços realizados conosco.' }
    ]
  },
  {
    id: 'academia',
    name: 'Academias & Fitness',
    keywords: ['academia', 'fitness', 'crossfit', 'treino', 'musculacao', 'funcional', 'luta'],
    palette: {
      primary: '#16A34A',
      secondary: '#14532D',
      accent: '#22C55E',
      background: '#09090B',
      text: '#F4F4F5'
    },
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop'
    ],
    heroHeadline: 'Supere seus limites com estrutura moderna e acompanhamento que gera resultados.',
    heroSub: 'Musculação, funcional e aulas dinâmicas em ambiente motivador para transformar sua saúde e disposição.',
    ctaText: 'Ganhar 1 Treino Experimental Grátis',
    services: [
      { title: 'Musculação & Hipertrofia', description: 'Equipamentos modernos e treinos desenhados sob medida para o seu objetivo.' },
      { title: 'Acompanhamento com Personal', description: 'Instrução atenta para correta execução dos movimentos sem risco de lesões.' },
      { title: 'Aulas Coletivas & Funcional', description: 'Treinos dinâmicos e queima calórica intensa com energia contagiante.' }
    ],
    socialProof: [
      'Ambiente amplo, climatizado e moderno',
      'Planos flexíveis sem taxas escondidas de matrícula',
      'Centenas de alunos que transformaram o corpo e a saúde'
    ],
    faq: [
      { question: 'Como funciona o treino experimental?', answer: 'Você ganha 1 dia para conhecer toda a nossa estrutura sem pagar nada. Basta nos avisar no WhatsApp!' }
    ]
  },
  {
    id: 'moda',
    name: 'Moda, Lojas de Roupas & Calçados',
    keywords: ['moda', 'boutique', 'roupa', 'calcado', 'vestuario', 'sapato', 'tenis', 'acessorio'],
    palette: {
      primary: '#18181B',
      secondary: '#27272A',
      accent: '#D4AF37',
      background: '#FAF8F5',
      text: '#1C1917'
    },
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop'
    ],
    heroHeadline: 'Moda exclusiva e peças selecionadas que valorizam sua elegância e estilo único.',
    heroSub: 'Coleções com caimento impecável, tendências atuais e tecidos nobres para você se destacar em qualquer ocasião.',
    ctaText: 'Ver Coleção & Comprar no WhatsApp',
    services: [
      { title: 'Novidades & Lançamentos da Semana', description: 'Peças exclusivas com poucas unidades para garantir sua autenticidade.' },
      { title: 'Provador Presencial & Atendimento VIP', description: 'Consultoria de estilo para ajudar a compor looks perfeitos para seu dia a dia.' },
      { title: 'Envio Rápido & Entrega Local', description: 'Compre pelo WhatsApp e receba no mesmo dia no conforto da sua residência.' }
    ],
    socialProof: [
      'Peças selecionadas com caimento e tecido premium',
      'Centenas de clientes satisfeitas e fiéis',
      'Condições de pagamento facilitadas em até 6x'
    ],
    faq: [
      { question: 'Vocês realizam trocas?', answer: 'Sim! Garantimos troca fácil em até 7 dias corridos mantendo a etiqueta na peça.' }
    ]
  },
  {
    id: 'agro-pet',
    name: 'Agropecuária, Pet Shop & Veterinária',
    keywords: ['agro', 'pet', 'racao', 'veterinaria', 'bicho', 'animal', 'vacina', 'gado'],
    palette: {
      primary: '#15803D',
      secondary: '#166534',
      accent: '#EAB308',
      background: '#F0FDF4',
      text: '#14532D'
    },
    images: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop'
    ],
    heroHeadline: 'Saúde animal, nutrição de qualidade e soluções agropecuárias completas.',
    heroSub: 'Produtos para pequenos e grandes animais, medicamentos veterinários e rações premium com entrega rápida.',
    ctaText: 'Fazer Pedido / Consulta no WhatsApp',
    services: [
      { title: 'Rações Selecionadas & Acessórios', description: 'As melhores marcas do mercado para cães, gatos, cavalos e gado de corte e leite.' },
      { title: 'Medicamentos & Vacinas Importadas', description: 'Farmácia veterinária completa com orientação de profissionais qualificados.' },
      { title: 'Entrega Rural & Urbana Express', description: 'Receba sacarias e suprimentos direto na sua propriedade ou residência.' }
    ],
    socialProof: [
      'Produtos com procedência garantida e registro oficial',
      'Preços justos e descontos especiais para sacarias',
      'Atendimento experiente no campo e na cidade'
    ],
    faq: [
      { question: 'Vocês entregam em fazendas e na zona rural?', answer: 'Sim! Entregamos em propriedades rurais da região com agendamento prévio.' }
    ]
  }
];

/**
 * Intelligent detector: detects the exact niche based on company segment and name
 */
export function detectNicheForCompany(company: Partial<Company>): NicheData {
  const text = `${company.segment || ''} ${company.name || ''} ${company.description || ''}`.toLowerCase();

  for (const niche of NICHES) {
    if (niche.keywords.some(kw => text.includes(kw))) {
      return niche;
    }
  }

  // Default to Odonto or Food if not matched, rather than fashion clothing!
  return NICHES[0];
}

/**
 * Adapt a WebsiteConcept to a new niche
 */
export function adaptConceptToNiche(concept: WebsiteConcept, company: Company, nicheId: string): WebsiteConcept {
  const niche = NICHES.find(n => n.id === nicheId) || NICHES[0];
  const city = company.city || 'João Pinheiro - MG';

  return {
    ...concept,
    visual_name: `${company.name} — ${concept.variant_title || 'Conceito Profissional'}`,
    color_palette: {
      ...concept.color_palette,
      primary: niche.palette.primary,
      secondary: niche.palette.secondary,
      accent: niche.palette.accent
    },
    image_suggestions: (company.photos && company.photos.length > 0) ? company.photos : niche.images,
    site_structure: {
      ...concept.site_structure,
      hero: {
        headline: niche.heroHeadline.replace('João Pinheiro', city),
        subheadline: niche.heroSub.replace('João Pinheiro', city),
        cta_text: niche.ctaText
      },
      services: niche.services,
      social_proof: niche.socialProof,
      faq: niche.faq
    }
  };
}
