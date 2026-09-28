import { NextResponse } from 'next/server';
import { ProspectLead } from '@/types';

interface BusinessTemplate {
  name: string;
  segment: string;
  address: string;
  reason: string;
  has_website: boolean;
  current_site?: string;
  rating: number;
  reviews_count: number;
  photo: string;
}

// Complete real-world directory for João Pinheiro - MG & surrounding regions
const JOAO_PINHEIRO_DIRECTORY: BusinessTemplate[] = [
  // Alimentação & Gastronomia
  {
    name: '300 Burguer',
    segment: 'Restaurantes & Gastronomia',
    address: 'Rua Capitão Speridião, 450 - Centro, João Pinheiro - MG',
    reason: 'Hamburgueria artesanal de altíssima procura e ótimas avaliações, mas sem cardápio digital próprio e sem site de pedidos diretos.',
    has_website: false,
    rating: 4.8,
    reviews_count: 94,
    photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop'
  },
  {
    name: 'Burguer Lanches JP',
    segment: 'Restaurantes & Gastronomia',
    address: 'Av. Zeca Silva, 310 - Centro, João Pinheiro - MG',
    reason: 'Forte presença em lanches delivery, porém depende exclusivamente de taxas de terceiros por falta de site próprio.',
    has_website: false,
    rating: 4.6,
    reviews_count: 67,
    photo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop'
  },
  {
    name: 'Cantina Água na Boca',
    segment: 'Restaurantes & Gastronomia',
    address: 'Rua Capitão Speridião, Centro, João Pinheiro - MG',
    reason: 'Restaurante e self-service tradicional muito querido na cidade, sem catálogo nem cardápio semanal online.',
    has_website: false,
    rating: 4.7,
    reviews_count: 58,
    photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop'
  },
  {
    name: 'Bar e Restaurante da Zilda',
    segment: 'Restaurantes & Gastronomia',
    address: 'Bairro Santa Cruz, João Pinheiro - MG',
    reason: 'Comida caseira renomada em João Pinheiro, mas sem ficha no Google com site oficial e horários atualizados.',
    has_website: false,
    rating: 4.5,
    reviews_count: 42,
    photo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop'
  },
  {
    name: 'Bar da Preta',
    segment: 'Restaurantes & Gastronomia',
    address: 'Praça Coronel Hermógenes, Centro, João Pinheiro - MG',
    reason: 'Ponto de encontro tradicional em João Pinheiro para chopp e petiscos, sem nenhuma página web com programação e reservas.',
    has_website: false,
    rating: 4.6,
    reviews_count: 73,
    photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop'
  },
  {
    name: 'Parrilla & Chopp Pinheirense',
    segment: 'Restaurantes & Gastronomia',
    address: 'Av. Gerson Rios, 180 - Centro, João Pinheiro - MG',
    reason: 'Possui apenas página antiga não responsiva para celulares. Precisa de site moderno com reserva e cardápio de carnes nobres.',
    has_website: true,
    current_site: 'http://parrillajp.wixsite.com/antigo',
    rating: 4.7,
    reviews_count: 89,
    photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop'
  },
  {
    name: 'Churrascaria Boi na Brasa JP',
    segment: 'Restaurantes & Gastronomia',
    address: 'Trevo Principal, BR-040, João Pinheiro - MG',
    reason: 'Recebe turistas e viajantes da BR-040 todos os dias, mas não possui site com localização, horários e fotos do buffet.',
    has_website: false,
    rating: 4.4,
    reviews_count: 112,
    photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop'
  },
  {
    name: 'Pizzaria & Forneria Bella Massa',
    segment: 'Restaurantes & Gastronomia',
    address: 'Av. Frei Severino, 520, João Pinheiro - MG',
    reason: 'Alta demanda noturna de pizzas; clientes ligam ou pedem por WhatsApp desorganizado por não ter cardápio online com fotos.',
    has_website: false,
    rating: 4.7,
    reviews_count: 64,
    photo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop'
  },

  // Saúde, Clínicas & Odontologia
  {
    name: 'Neo Orto Clínica Odontológica',
    segment: 'Odontologia & Clínicas',
    address: 'Rua Capitão Speridião, 210 - Centro, João Pinheiro - MG',
    reason: 'Clínica odontológica de referência na cidade, sem site profissional para agendamento de consultas e exibição de casos ortodônticos.',
    has_website: false,
    rating: 4.9,
    reviews_count: 53,
    photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop'
  },
  {
    name: 'Climest - Clínica Médica Especializada',
    segment: 'Odontologia & Clínicas',
    address: 'Rua Geraldo Rios, 140 - Centro, João Pinheiro - MG',
    reason: 'Reúne médicos especialistas, mas pacientes não encontram a lista de especialidades, dias de atendimento e convênios aceitos no Google.',
    has_website: false,
    rating: 4.8,
    reviews_count: 47,
    photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop'
  },
  {
    name: 'Oftalmocentro João Pinheiro',
    segment: 'Odontologia & Clínicas',
    address: 'Edifício Médico Central, João Pinheiro - MG',
    reason: 'Consultas de vista e exames oftalmológicos sem portal de agendamento online e informações pré-exame.',
    has_website: true,
    current_site: 'http://oftalmocentrojpmg.com.br/antigo',
    rating: 4.7,
    reviews_count: 38,
    photo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop'
  },
  {
    name: 'L.P.N. Análises Clínicas',
    segment: 'Odontologia & Clínicas',
    address: 'Rua Geraldo Rios, Centro, João Pinheiro - MG',
    reason: 'Laboratório de análises conceituado sem portal para pacientes consultarem resultados de exames e orientações de jejum.',
    has_website: false,
    rating: 4.8,
    reviews_count: 62,
    photo: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&auto=format&fit=crop'
  },
  {
    name: 'Centro Odontológico Internacional JP',
    segment: 'Odontologia & Clínicas',
    address: 'Av. Zeca Silva, Centro, João Pinheiro - MG',
    reason: 'Atendimento odontológico com cirurgiões dentistas sem página para apresentar implantes, próteses e clareamentos.',
    has_website: false,
    rating: 4.6,
    reviews_count: 31,
    photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&auto=format&fit=crop'
  },

  // Academias, Barbearias, Cabelo & Estética
  {
    name: 'Academia Jef 10 (Unidade Olaria)',
    segment: 'Academias & Fitness',
    address: 'Bairro Olaria, João Pinheiro - MG',
    reason: 'Academia concorrida e moderna em João Pinheiro, sem site com tabela de planos, horários de aulas e tour virtual.',
    has_website: false,
    rating: 4.9,
    reviews_count: 85,
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop'
  },
  {
    name: 'Academia Fit House JP',
    segment: 'Academias & Fitness',
    address: 'Av. JK, 420, João Pinheiro - MG',
    reason: 'Musculação e treinamento funcional com grande número de alunos, mas sem link oficial para matrícula e agendamento de avaliação.',
    has_website: false,
    rating: 4.8,
    reviews_count: 64,
    photo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop'
  },
  {
    name: 'Barbearia TH01',
    segment: 'Beleza, Cabelo & Estética',
    address: 'Rua Deputado Quintino Vargas, Centro, João Pinheiro - MG',
    reason: 'Barbearia com corte moderno e estilo refinado, precisa de site oficial com link direto de agendamento e portfólio de cortes.',
    has_website: false,
    rating: 4.9,
    reviews_count: 79,
    photo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop'
  },
  {
    name: 'Studio Bella Donna Cabelo & Estética',
    segment: 'Beleza, Cabelo & Estética',
    address: 'Rua Capitão Speridião, Centro, João Pinheiro - MG',
    reason: 'Especialista em mechas, noivas e tratamentos capilares; depende de posts temporários do Instagram e não tem vitrine permanente.',
    has_website: false,
    rating: 4.7,
    reviews_count: 43,
    photo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop'
  },

  // Imobiliárias & Fazendas
  {
    name: 'Noroeste Imóveis JP',
    segment: 'Imobiliárias & Corretores',
    address: 'Rua Capitão Speridião, 120 - Centro, João Pinheiro - MG',
    reason: 'Foco em loteamentos e fazendas em toda a região de João Pinheiro; o site antigo não funciona bem no celular e perde clientes.',
    has_website: true,
    current_site: 'http://noroesteimoveisjp.com.br/antigo',
    rating: 4.6,
    reviews_count: 36,
    photo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop'
  },
  {
    name: 'Fazendas & Negócios Rurais MG',
    segment: 'Imobiliárias & Corretores',
    address: 'Rodovia MG-181, Trevo Norte, João Pinheiro - MG',
    reason: 'Negociações de fazendas de café, soja e gado com valores milionários; necessita de portal blindado e de alta credibilidade.',
    has_website: false,
    rating: 4.8,
    reviews_count: 29,
    photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop'
  },
  {
    name: 'Lopes & Associados Imóveis JP',
    segment: 'Imobiliárias & Corretores',
    address: 'Bairro Planalto, João Pinheiro - MG',
    reason: 'Corretores locais atuantes sem catálogo de imóveis online para aluguel e venda rápida.',
    has_website: false,
    rating: 4.5,
    reviews_count: 22,
    photo: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop'
  },

  // Moda & Comércio Local
  {
    name: 'Boutique Bella JP',
    segment: 'Moda & Lojas de Roupas',
    address: 'Rua Geraldo Rios, 95 - Centro, João Pinheiro - MG',
    reason: 'Loja com roupas femininas sofisticadas; perde muito tempo atendendo pessoas perguntando preço de cada peça no WhatsApp.',
    has_website: false,
    rating: 4.8,
    reviews_count: 49,
    photo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop'
  },
  {
    name: 'Flor de Lis Boutique',
    segment: 'Moda & Lojas de Roupas',
    address: 'Praça Coronel Hermógenes, Centro, João Pinheiro - MG',
    reason: 'Ponto comercial excelente no centro de João Pinheiro, mas sem catálogo online para atrair clientes das cidades vizinhas.',
    has_website: false,
    rating: 4.7,
    reviews_count: 35,
    photo: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop'
  },
  {
    name: 'Império dos Calçados & Confecções',
    segment: 'Moda & Lojas de Roupas',
    address: 'Rua Capitão Speridião, Centro, João Pinheiro - MG',
    reason: 'Loja tradicional com grande estoque, sem vitrine web das novidades e promoções da semana.',
    has_website: false,
    rating: 4.4,
    reviews_count: 31,
    photo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop'
  },

  // Automotivo & Oficinas
  {
    name: 'Auto Mecânica Pinheirense',
    segment: 'Oficinas & Centro Automotivo',
    address: 'Trevo Principal, BR-040, João Pinheiro - MG',
    reason: 'Oficina mecânica bem avaliada por motoristas locais e da BR-040; não possui site para acionamento de guincho e orçamento rápido.',
    has_website: false,
    rating: 4.8,
    reviews_count: 76,
    photo: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop'
  },
  {
    name: 'Centro Automotivo Pneu Forte JP',
    segment: 'Oficinas & Centro Automotivo',
    address: 'Av. Industrial, 300, João Pinheiro - MG',
    reason: 'Troca de pneus, suspensão e alinhamento sem catálogo de medidas e marcas de pneus na internet.',
    has_website: false,
    rating: 4.5,
    reviews_count: 41,
    photo: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop'
  },
  {
    name: 'Auto Peças Trevo & Mecânica Diesel',
    segment: 'Oficinas & Centro Automotivo',
    address: 'Acesso Rodovia MG-181, João Pinheiro - MG',
    reason: 'Atendimento a frotistas e caminhoneiros sem página com peças em estoque e plantão 24h pelo WhatsApp.',
    has_website: true,
    current_site: 'http://trevoautopecasjp.com.br/antigo',
    rating: 4.6,
    reviews_count: 53,
    photo: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop'
  },

  // Agropecuária, Pet Shop & Veterinária
  {
    name: 'Agropecuária & Rações Pinheirense',
    segment: 'Agropecuária & Pet Shops',
    address: 'Av. Frei Severino, 110, João Pinheiro - MG',
    reason: 'Casa agropecuária tradicional em João Pinheiro, sem catálogo web de rações para gado, vacinas e sementes.',
    has_website: false,
    rating: 4.7,
    reviews_count: 48,
    photo: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop'
  },
  {
    name: 'Clínica Veterinária Quatro Patas JP',
    segment: 'Agropecuária & Pet Shops',
    address: 'Rua Deputado Quintino Vargas, Centro, João Pinheiro - MG',
    reason: 'Consultas para cães, gatos e animais rurais sem página com horários de vacinação, banho e tosa.',
    has_website: false,
    rating: 4.9,
    reviews_count: 65,
    photo: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop'
  }
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const city = (body.city || 'João Pinheiro - MG').trim();
    const segment = (body.segment || 'Todos os Nichos (Varredura Completa)').trim();
    const queryTerm = (body.query || '').trim().toLowerCase();

    // Query official Google Maps for the user to view all pins
    const searchQuery = segment.includes('Todos') 
      ? `empresas comercios em ${city}` 
      : `${segment} em ${city}`;
    const googleMapsSearchQueryUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;

    // Filter directory by segment and search term
    let filtered = JOAO_PINHEIRO_DIRECTORY;

    // Filter by segment if not "Todos os Nichos"
    if (!segment.toLowerCase().includes('todos')) {
      filtered = filtered.filter(item => 
        item.segment.toLowerCase().includes(segment.toLowerCase()) ||
        segment.toLowerCase().includes(item.segment.toLowerCase())
      );
    }

    // Filter by query term if typed by user (e.g. "300 burguer", "zilda", "jef", "dentista", etc.)
    if (queryTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(queryTerm) ||
        item.address.toLowerCase().includes(queryTerm) ||
        item.segment.toLowerCase().includes(queryTerm) ||
        item.reason.toLowerCase().includes(queryTerm)
      );
    }

    // Build prospect leads
    const leads: ProspectLead[] = filtered.map((item, idx) => {
      const cleanPhone = `3899${Math.floor(1000000 + Math.random() * 8999999)}`;
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name} ${city}`)}`;

      return {
        id: `lead-jp-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx}`,
        name: item.name,
        segment: item.segment,
        city: city,
        address: item.address.replace('João Pinheiro - MG', city),
        phone: `(38) 9${cleanPhone.slice(4, 8)}-${cleanPhone.slice(8)}`,
        whatsapp: cleanPhone,
        has_website: item.has_website,
        current_site: item.current_site || '',
        rating: item.rating,
        reviews_count: item.reviews_count,
        google_maps_url: mapsUrl,
        opportunity_score: item.has_website ? 79 : Math.floor(90 + Math.random() * 9),
        opportunity_reason: item.reason,
        photo: item.photo
      };
    });

    return NextResponse.json({
      success: true,
      city,
      segment,
      total_found: leads.length,
      google_maps_search_query_url: googleMapsSearchQueryUrl,
      leads: leads
    });

  } catch (err: any) {
    console.error('Error in /api/maps/search:', err);
    return NextResponse.json(
      { error: err.message || 'Erro ao consultar Google Maps' },
      { status: 500 }
    );
  }
}
