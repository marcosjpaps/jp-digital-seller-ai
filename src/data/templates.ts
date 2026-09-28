import { DemoTemplate } from '@/types';

export const DEMO_TEMPLATES: DemoTemplate[] = [
  {
    id: 'moda-feminina',
    segment: 'Moda feminina',
    title: 'Boutique & Moda Feminina Elegance',
    style: 'Elegante, clean e sofisticado',
    colors: ['#F5EBE0', '#1A1A1A', '#D4AF37', '#E3D5CA'],
    hero_copy: 'Moda feminina exclusiva para mulheres que valorizam elegância, conforto e autenticidade em cada detalhe.',
    cta_copy: 'Ver Coleção Exclusiva no WhatsApp',
    structure: [
      'Hero com vídeo/banner de nova coleção',
      'Categorias em Destaque (Vestidos, Conjuntos, Casual Chic)',
      'Lookbook da Semana com fotos reais',
      'Provador Virtual & Guia de Medidas',
      'Depoimentos de Clientes Vips de João Pinheiro',
      'Localização da Loja Física + Botão de Atendimento Direto'
    ],
    suggested_images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop'
    ],
    sample_problems: [
      'Depende 100% dos stories do Instagram que somem em 24h',
      'Cliente pergunta preço no direct e espera horas por resposta',
      'Sem catálogo organizado para compras rápidas'
    ]
  },
  {
    id: 'restaurante',
    segment: 'Restaurante & Gastronomia',
    title: 'Bistrô & Parrilla Artesanal',
    style: 'Acolhedor, gastronômico e premium dark',
    colors: ['#1C1917', '#E11D48', '#F59E0B', '#292524'],
    hero_copy: 'Uma experiência gastronômica inesquecível: cortes nobres, sabor artesanal e momentos memoráveis.',
    cta_copy: 'Reservar Mesa ou Pedir Delivery',
    structure: [
      'Hero com fotos de dar água na boca e chamada para reserva',
      'Cardápio Digital Interativo com fotos reais dos pratos',
      'Destaques do Chef (Pratos principais, Sobremesas, Vinhos)',
      'Horários de Funcionamento & Delivery para toda João Pinheiro',
      'Avaliações 5 Estrelas no Google',
      'Integração com WhatsApp sem taxa de aplicativo'
    ],
    suggested_images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop'
    ],
    sample_problems: [
      'Perde até 27% de comissão pagando taxas para plataformas de entrega',
      'Cardápio em PDF pesado no WhatsApp que clientes têm dificuldade de abrir',
      'Sem presença no Google Maps para quem busca "restaurante perto de mim"'
    ]
  },
  {
    id: 'clinica',
    segment: 'Clínica Médica & Saúde',
    title: 'Centro Médico Integrado',
    style: 'Moderno, confiável, higiênico e acolhedor',
    colors: ['#0284C7', '#0F172A', '#38BDF8', '#F0F9FF'],
    hero_copy: 'Cuidado humanizado e medicina de excelência para a saúde e o bem-estar de toda a sua família.',
    cta_copy: 'Agendar Consulta com Especialista',
    structure: [
      'Apresentação dos Médicos e Especialidades',
      'Exames Realizados no Local com Resultados Ágeis',
      'Convênios Atendidos e Facilidades de Pagamento',
      'Tour Virtual pela Estrutura Moderna e Climatizada',
      'Canal Direto de Agendamento via Secretária Virtual / WhatsApp',
      'Localização Central de fácil estacionamento'
    ],
    suggested_images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop'
    ],
    sample_problems: [
      'Pacientes não sabem quais especialidades e convênios são atendidos',
      'Linha telefônica sempre ocupada nos horários de pico',
      'Falta de credibilidade digital frente a novas clínicas que surgem'
    ]
  },
  {
    id: 'odontologia',
    segment: 'Odontologia & Estética Dental',
    title: 'Instituto Odontológico & Harmonização',
    style: 'Clean, tecnológico e luxuoso',
    colors: ['#0D9488', '#134E4A', '#CCFBF1', '#F8FAFC'],
    hero_copy: 'Transforme o seu sorriso com tecnologia de ponta, implantes sem dor e estética odontológica de alto nível.',
    cta_copy: 'Avaliar Meu Sorriso no WhatsApp',
    structure: [
      'Hero com Antes e Depois impressionantes',
      'Tratamentos (Lentes de Contato Dental, Implantes, Alinhadores Invisíveis)',
      'Tecnologia Utilizada (Escaneamento 3D sem molduras desconfortáveis)',
      'Depoimentos em Vídeo de Pacientes Sorridentes',
      'Condições Especiais de Financiamento do Tratamento',
      'Agendamento rápido da primeira avaliação'
    ],
    suggested_images: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&auto=format&fit=crop'
    ],
    sample_problems: [
      'Dificuldade de atrair pacientes para tratamentos de alto ticket (lentes e implantes)',
      'Instagram com fotos técnicas de boca aberta que assustam pacientes em vez de vender',
      'Sem landing page específica para captação de pacientes particulares'
    ]
  },
  {
    id: 'imobiliaria',
    segment: 'Imobiliária & Corretores',
    title: 'Imóveis & Lançamentos Exclusivos',
    style: 'Moderno corporativo, confiável e sofisticado',
    colors: ['#0A2540', '#D97706', '#F8FAFC', '#1E293B'],
    hero_copy: 'Encontre o imóvel perfeito para morar ou investir na região mais valorizada de João Pinheiro e Noroeste de Minas.',
    cta_copy: 'Falar com Corretor Especialista',
    structure: [
      'Buscador Rápido por Bairro, Faixa de Preço e Tipo de Imóvel',
      'Imóveis em Destaque com Galeria HD e Vídeo Tour',
      'Lançamentos & Loteamentos com Condições de Lançamento',
      'Simulador de Financiamento Caixa e Bancos',
      'Área "Quer Vender ou Alugar seu Imóvel? Cadastre Aqui"',
      'Botão flutuante para atendimento imediato'
    ],
    suggested_images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'
    ],
    sample_problems: [
      'Imóveis espalhados no feed do Instagram sem busca filtrada',
      'Leads qualificados compram na concorrência que possui site com tour virtual',
      'Lentidão no envio de fichas técnicas para clientes interessados'
    ]
  },
  {
    id: 'construcao',
    segment: 'Construção Civil & Reformas',
    title: 'Engenharia, Construção & Reformas',
    style: 'Sólido, industrial e arrojado',
    colors: ['#EA580C', '#0F172A', '#F1F5F9', '#334155'],
    hero_copy: 'Sua obra do projeto ao acabamento com pontualidade, rigor técnico e transparência total de custos.',
    cta_copy: 'Solicitar Orçamento de Obra',
    structure: [
      'Portfólio de Obras Entregues (Residenciais, Comerciais e Rurais)',
      'Nossos Serviços (Projetos 3D, Execução de Obra, Laudos, Regularização)',
      'Diferenciais: Cronograma rígido, zero surpresa no orçamento',
      'Equipe de Engenheiros e Mestres de Obra Certificados',
      'Depoimentos de Proprietários Satisfeitos',
      'Formulário inteligente para orçamento prévio'
    ],
    suggested_images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop'
    ],
    sample_problems: [
      'Cliente tem medo de contratar por receio de atraso e estouro de orçamento',
      'Falta de portfólio digital profissional para concorrer a licitações e obras grandes',
      'Dependência exclusiva de indicação boca a boca'
    ]
  },
  {
    id: 'moveis',
    segment: 'Móveis Planejados & Decoração',
    title: 'Studio de Ambientes & Móveis Sob Medida',
    style: 'Design contemporâneo, aconchegante e refinado',
    colors: ['#78350F', '#1C1917', '#FDE68A', '#FEF3C7'],
    hero_copy: 'Transformamos cada cômodo no espaço dos seus sonhos com marcenaria de alto padrão e design inteligente.',
    cta_copy: 'Solicitar Projeto 3D Sem Custo',
    structure: [
      'Galeria de Ambientes (Cozinhas Gourmet, Closets, Suítes, Escritórios)',
      'Materiais Nobres (MDF naval, ferragens alemãs amortecidas, led embutido)',
      'Passo a Passo: Da medição na sua casa à instalação impecável',
      'Garantia de 5 anos documentada',
      'Feed de Projetos Recentes com fotos reais',
      'Chamada para visita técnica e medição'
    ],
    suggested_images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop'
    ],
    sample_problems: [
      'Projetos caros não transmitem valor apenas em fotos soltas no WhatsApp',
      'Falta de um catálogo visual de ferragens e acabamentos premium',
      'Dificuldade de fechar contratos com ticket acima de R$ 25.000 sem autoridade digital'
    ]
  },
  {
    id: 'academia',
    segment: 'Academia & Fitness',
    title: 'Centro de Treinamento & Saúde Funcional',
    style: 'Energético, moderno, dinâmico e motivador',
    colors: ['#16A34A', '#09090B', '#22C55E', '#18181B'],
    hero_copy: 'Supere seus limites com estrutura moderna, acompanhamento personalizado e ambiente motivador todos os dias.',
    cta_copy: 'Ganhar 1 Aula Experimental Grátis',
    structure: [
      'Modalidades (Musculação, Cross, Funcional, Spinning, Lutas)',
      'Tour pelos Equipamentos Importados e Espaço Climatizado',
      'Quadro de Horários e Aulas Coletivas da Semana',
      'Planos & Vantagens (Sem taxa de adesão, cancelamento facilitado)',
      'Antes e Depois de Alunos com Histórias Reais',
      'Agendamento rápido da aula experimental'
    ],
    suggested_images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop'
    ],
    sample_problems: [
      'Pessoas com vergonha de começar desistem por falta de informação sobre os treinos',
      'Perde novas matrículas por não ter botão de inscrição direta com pagamento online',
      'Competição acirrada com academias de rede'
    ]
  },
  {
    id: 'servicos',
    segment: 'Serviços & Especialistas Locais',
    title: 'Assessoria, Advocacia & Contabilidade',
    style: 'Institucional sóbrio, executivo e seguro',
    colors: ['#1E3A8A', '#0F172A', '#60A5FA', '#F8FAFC'],
    hero_copy: 'Segurança jurídica, financeira e estratégica para impulsionar e blindar o seu patrimônio e a sua empresa.',
    cta_copy: 'Falar com um Especialista Agora',
    structure: [
      'Áreas de Atuação e Especialidades Detalhadas',
      'Quem Somos: Trajetória, Credenciais e Sócios',
      'Artigos & Notícias com Orientações para Empresários de JP',
      'Perguntas Frequentes (FAQ) que tiram dúvidas preliminares',
      'Canal de Atendimento Seguro e Sigiloso',
      'Mapa de Acesso com rota GPS direta'
    ],
    suggested_images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop'
    ],
    sample_problems: [
      'Clientes buscam no Google e contratam profissionais de outras cidades por falta de site local',
      'Horas gastas tirando dúvidas básicas que poderiam estar explicadas no site',
      'Falta de posicionamento como autoridade máxima no município'
    ]
  }
];
