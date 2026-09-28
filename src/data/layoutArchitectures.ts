import { ConceptLayoutType } from '@/types';

export interface LayoutArchitecture {
  id: ConceptLayoutType;
  title: string;
  badge: string;
  bestFor: string;
  description: string;
  features: string[];
  sampleThumbnail: string;
}

export const PRESET_LAYOUTS: LayoutArchitecture[] = [
  {
    id: 'luxury',
    title: 'Layout 1 — Luxury Showcase & Editorial VIP',
    badge: 'Sofisticado & Luxo',
    bestFor: 'Boutiques, Moda Feminina, Clínicas Estéticas, Móveis Planejados',
    description: 'Design imponente com tipografia clássica, detalhes dourados, lookbook em destaque e ambientação de alto padrão.',
    features: [
      'Hero com moldura refinada e tipografia elegante',
      'Lookbook com fotos ampliadas e detalhes de acabamento',
      'Citações de depoimentos com tipografia serifada',
      'Botão de atendimento VIP com acabamento dourado'
    ],
    sampleThumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop'
  },
  {
    id: 'dark_tech',
    title: 'Layout 2 — Dark High-Tech & Conversão Máxima',
    badge: 'Neon & Alta Conversão',
    bestFor: 'Tech, Academias, Crossfit, Hamburguerias Noturnas, Startups',
    description: 'Modo escuro imersivo, cartões translúcidos com bordas brilhantes, contadores de impacto e chamada para ação pulsante.',
    features: [
      'Visual dark futurista com bordas elétricas',
      'Cards de serviços com efeito vidro (glassmorphism)',
      'Contadores estatísticos de autoridade em tempo real',
      'Botão flutuante de WhatsApp com pulso neon'
    ],
    sampleThumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop'
  },
  {
    id: 'minimal',
    title: 'Layout 3 — Minimalista Clean & Magazine Contemporâneo',
    badge: 'Design Clean Puro',
    bestFor: 'Arquitetura, Consultorias, Design, Fotografia, Clínicas Médicas',
    description: 'Espaço em branco moderno, linhas finas e precisas, foco absoluto no conteúdo sem ruídos visuais.',
    features: [
      'Espaçamento generoso e respiração visual',
      'Tipografia geométrica ultra legível',
      'Grade minimalista de serviços sem bordas pesadas',
      'Contatos diretos com links limpos e diretos'
    ],
    sampleThumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop'
  },
  {
    id: 'catalog',
    title: 'Layout 4 — Catálogo Comercial & Delivery Interativo',
    badge: 'Comércio & Vendas Diretas',
    bestFor: 'Restaurantes, Pizzarias, Lojas de Produtos, Pet Shops, Materiais',
    description: 'Grade de produtos com fotos chamativas, filtro de categorias, botões "Pedir pelo WhatsApp" e selos promocionais.',
    features: [
      'Barra de categorias horizontais (Mais Pedidos, Novidades)',
      'Cards de produtos com fotos em destaque e botão de compra',
      'Banner promocional com aviso de entrega rápida',
      'Carrinho/botão direto integrado ao WhatsApp'
    ],
    sampleThumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop'
  },
  {
    id: 'authority',
    title: 'Layout 5 — Corporativo, Autoridade & Agendamento',
    badge: 'Institucional & Confiança',
    bestFor: 'Odontologia, Imobiliárias, Advocacia, Engenharia, Centros de Saúde',
    description: 'Hero dividido com formulário de pré-agendamento rápido, avaliações Google 5 estrelas e selos de credibilidade profissional.',
    features: [
      'Formulário inteligente de agendamento na primeira dobra',
      'Barra de credenciais e registros de classe (CRM, CRO, CREA)',
      'Avaliações no formato oficial de reviews do Google',
      'Mapa interativo de localização com rota traçada'
    ],
    sampleThumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&auto=format&fit=crop'
  }
];
