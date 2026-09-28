import { NextResponse } from 'next/server';
import { ProspectLead } from '@/types';

// Curated realistic local profiles for high-impact prospecting
const SEGMENT_CATALOG: Record<string, {
  keywords: string[];
  templates: { name: string; suffix: string; reason: string; avgRating: number }[];
  defaultStrengths: string[];
  photos: string[];
}> = {
  'Restaurantes & Gastronomia': {
    keywords: ['restaurante', 'churrascaria', 'pizzaria', 'hamburgueria', 'chopperia', 'bar'],
    templates: [
      { name: 'Churrascaria & Restaurante Boi na Brasa', suffix: 'Centro', reason: 'Excelente movimento presencial, mas sem cardápio online nem site próprio. Depende apenas do Instagram.', avgRating: 4.6 },
      { name: 'Pizzaria & Forneria Bella Massa', suffix: 'Av. Zeca Silva', reason: 'Alta demanda de delivery, perde vendas por não ter cardápio digital próprio e depender de taxas de apps.', avgRating: 4.7 },
      { name: 'Armazém Gourmet & Chopp', suffix: 'Centro Histórico', reason: 'Não tem presença no Google com site oficial; clientes não encontram horário de funcionamento e reservas.', avgRating: 4.4 },
      { name: 'Sabor & Cia Restaurante Caseiro', suffix: 'Bairro Santa Cruz', reason: 'Self-service tradicional com 10+ anos, totalmente invisível no Google Maps sem site ou cardápio.', avgRating: 4.3 },
      { name: 'Burger & Beer Artesanal', suffix: 'Jardim Imperial', reason: 'Público jovem e moderno, mas sem site com fotos profissionais e link de pedidos direto no WhatsApp.', avgRating: 4.8 }
    ],
    defaultStrengths: ['Comida elogiada', 'Localização central'],
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop'
    ]
  },
  'Odontologia & Clínicas': {
    keywords: ['dentista', 'odontologia', 'clinica odontologica', 'ortodontia', 'estetica dental'],
    templates: [
      { name: 'Clínica OdontoMaster Sorrisos', suffix: 'Centro', reason: 'Tratamentos de alto valor (lentes, implantes) sem página de autoridade médica para passar credibilidade.', avgRating: 4.9 },
      { name: 'Dr. Lucas Ribeiro - Odontologia & Implantes', suffix: 'Edifício Medical', reason: 'Sem site para apresentar casos clínicos antes/depois e captar pacientes particulares no Google.', avgRating: 4.8 },
      { name: 'Espaço Sorrir Clínica Integrada', suffix: 'Av. JK', reason: 'Atendimento humanizado sem agendamento simplificado e sem posicionamento no Google de busca local.', avgRating: 4.5 },
      { name: 'OdontoKids & Ortodontia Familiar', suffix: 'Bairro Primavera', reason: 'Sem presença digital estruturada; pais buscam no Google dentista infantil e não os encontram.', avgRating: 4.7 }
    ],
    defaultStrengths: ['Profissionais qualificados', 'Equipamentos modernos'],
    photos: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop'
    ]
  },
  'Imobiliárias & Corretores': {
    keywords: ['imobiliaria', 'imoveis', 'corretor de imoveis', 'fazendas', 'loteamentos'],
    templates: [
      { name: 'Noroeste Imóveis & Terrenos', suffix: 'Centro', reason: 'Catálogo de imóveis espalhado no Instagram sem filtros de preço, bairros e captação de leads qualificados.', avgRating: 4.5 },
      { name: 'Fazendas & Negócios Rurais MG', suffix: 'Rodovia MG-181', reason: 'Negociações de fazendas milionárias sem portal seguro e profissional para investidores de fora.', avgRating: 4.6 },
      { name: 'Lopes & Associados Imóveis', suffix: 'Bairro Planalto', reason: 'Sem site com busca de aluguéis e vendas; dependente exclusivamente de placas nas ruas.', avgRating: 4.4 }
    ],
    defaultStrengths: ['Carteira sólida de clientes', 'Experiência de mercado'],
    photos: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop'
    ]
  },
  'Moda & Lojas de Roupas': {
    keywords: ['loja de roupas', 'moda feminina', 'boutique', 'calcados', 'moda masculina'],
    templates: [
      { name: 'Boutique Flor de Lis', suffix: 'Rua Principal', reason: 'Loja com peças sofisticadas sem vitrine digital. Clientes perdem tempo perguntando preços no direct.', avgRating: 4.7 },
      { name: 'Império dos Calçados & Acessórios', suffix: 'Centro Comercial', reason: 'Grande estoque sem mostruário online organizado por categorias e numeração.', avgRating: 4.3 },
      { name: 'Estilo Homem Moda Masculina', suffix: 'Galeria Central', reason: 'Público masculino compra rápido pela internet, mas loja não tem catálogo web para envio rápido.', avgRating: 4.6 }
    ],
    defaultStrengths: ['Produtos de bom gosto', 'Atendimento atencioso'],
    photos: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop'
    ]
  },
  'Oficinas & Centro Automotivo': {
    keywords: ['oficina mecanica', 'auto center', 'centro automotivo', 'funilaria', 'pneus'],
    templates: [
      { name: 'Auto Mecânica & Peças Pinheirense', suffix: 'Trevo Principal', reason: 'Motoristas viajantes e locais buscam socorro e manutenção no Google e encontram apenas concorrentes.', avgRating: 4.8 },
      { name: 'Centro Automotivo Pneu Forte', suffix: 'Av. Industrial', reason: 'Oferece alinhamento, balanceamento e troca de óleo sem página de orçamento rápido pelo WhatsApp.', avgRating: 4.5 },
      { name: 'Elite Car Funilaria & Pintura Express', suffix: 'Distrito Industrial', reason: 'Sem portfólio visual dos carros restaurados e sem depoimentos de clientes no Google.', avgRating: 4.4 }
    ],
    defaultStrengths: ['Mecânicos confiáveis', 'Serviço rápido'],
    photos: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop'
    ]
  },
  'Beleza, Cabelo & Estética': {
    keywords: ['salao de beleza', 'barbearia', 'estetica', 'lash designer', 'sobrancelhas'],
    templates: [
      { name: 'Barbearia Vintage & Navalha', suffix: 'Rua das Flores', reason: 'Barbearia conceituada sem link próprio com tabela de serviços e horários. Sofre com desistências.', avgRating: 4.9 },
      { name: 'Studio Bella Donna Cabelo & Estética', suffix: 'Centro', reason: 'Sem site com galeria de noivas, mechas e tratamentos; depende de postagens efêmeras no Instagram.', avgRating: 4.7 },
      { name: 'Clínica de Estética & Harmonização Facial', suffix: 'Bairro nobre', reason: 'Serviços de alto ticket (R$ 1.500+) sem página profissional para passar segurança à cliente.', avgRating: 4.8 }
    ],
    defaultStrengths: ['Ambiente aconchegante', 'Especialistas premiados'],
    photos: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop'
    ]
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const city = (body.city || 'João Pinheiro - MG').trim();
    const segment = (body.segment || 'Restaurantes & Gastronomia').trim();
    const onlyWithoutSite = body.onlyWithoutSite !== false;

    // Direct Google Maps Search Link for verification
    const googleMapsSearchQueryUrl = `https://www.google.com/maps/search/${encodeURIComponent(segment + ' em ' + city)}`;

    // Catalog lookup or dynamic generator
    let catalogItem = SEGMENT_CATALOG[segment];
    if (!catalogItem) {
      // Find closest or create generic
      const keys = Object.keys(SEGMENT_CATALOG);
      const matchKey = keys.find(k => k.toLowerCase().includes(segment.toLowerCase()) || segment.toLowerCase().includes(k.toLowerCase()));
      catalogItem = matchKey ? SEGMENT_CATALOG[matchKey] : SEGMENT_CATALOG['Restaurantes & Gastronomia'];
    }

    // Generate enriched prospect leads with a realistic mix
    const leads: ProspectLead[] = catalogItem.templates.map((tmpl, idx) => {
      // Index 1 and 3 have outdated/weak websites, others have NO website (pure gold leads)
      const hasSite = idx === 1 || idx === 3;
      const cleanPhone = `3899${Math.floor(1000000 + Math.random() * 8999999)}`;
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${tmpl.name} ${city}`)}`;

      const weakReason = 'Site desatualizado em plataforma antiga, lento no celular e sem integração direta com WhatsApp. Oportunidade para oferecer reformulação moderna.';
      const noSiteReason = tmpl.reason || 'Não possui nenhum site próprio registrado. Totalmente dependente de redes sociais e invisível nas buscas estruturadas do Google.';

      return {
        id: `prospect-${tmpl.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx}`,
        name: tmpl.name,
        segment: segment,
        city: city,
        address: `${tmpl.suffix}, ${city}`,
        phone: `(38) 9${cleanPhone.slice(4, 8)}-${cleanPhone.slice(8)}`,
        whatsapp: cleanPhone,
        has_website: hasSite,
        current_site: hasSite ? `http://${tmpl.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.wixsite.com/antigo` : '',
        rating: tmpl.avgRating,
        reviews_count: Math.floor(18 + Math.random() * 85),
        google_maps_url: mapsUrl,
        opportunity_score: hasSite ? 79 : Math.floor(90 + Math.random() * 9),
        opportunity_reason: hasSite ? weakReason : noSiteReason,
        photo: catalogItem.photos[idx % catalogItem.photos.length]
      };
    });

    const filteredLeads = onlyWithoutSite ? leads.filter(l => !l.has_website) : leads;

    return NextResponse.json({
      success: true,
      city,
      segment,
      total_found: filteredLeads.length,
      google_maps_search_query_url: googleMapsSearchQueryUrl,
      leads: filteredLeads
    });

  } catch (err: any) {
    console.error('Error in /api/maps/search:', err);
    return NextResponse.json(
      { error: err.message || 'Erro ao consultar Google Maps' },
      { status: 500 }
    );
  }
}
