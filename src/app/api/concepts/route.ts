import { NextResponse } from 'next/server';
import { getDb, isDbConfigured } from '@/lib/db';

export async function GET(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ success: true, concepts: [] });
  }

  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId');
    const sql = getDb();

    let rows;
    if (companyId) {
      rows = await sql`
        SELECT * FROM website_concepts 
        WHERE company_id = ${companyId} 
        ORDER BY created_at DESC;
      `;
    } else {
      rows = await sql`
        SELECT * FROM website_concepts 
        ORDER BY created_at DESC;
      `;
    }

    return NextResponse.json({ success: true, concepts: rows });
  } catch (err: any) {
    console.error('Error fetching concepts from Neon DB:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ success: true });
  }

  try {
    const concept = await req.json();
    const sql = getDb();

    await sql`
      INSERT INTO website_concepts (
        id, company_id, layout_type, variant_title, custom_badge, style, color_palette, site_structure, active_sections, image_suggestions
      ) VALUES (
        ${concept.id},
        ${concept.company_id},
        ${concept.layout_type || 'luxury'},
        ${concept.variant_title || ''},
        ${concept.custom_badge || ''},
        ${concept.style || ''},
        ${JSON.stringify(concept.color_palette || {})},
        ${JSON.stringify(concept.site_structure || {})},
        ${JSON.stringify(concept.active_sections || [])},
        ${JSON.stringify(concept.image_suggestions || [])}
      )
      ON CONFLICT (id) DO UPDATE SET
        layout_type = EXCLUDED.layout_type,
        variant_title = EXCLUDED.variant_title,
        custom_badge = EXCLUDED.custom_badge,
        style = EXCLUDED.style,
        color_palette = EXCLUDED.color_palette,
        site_structure = EXCLUDED.site_structure,
        active_sections = EXCLUDED.active_sections,
        image_suggestions = EXCLUDED.image_suggestions;
    `;

    return NextResponse.json({ success: true, concept });
  } catch (err: any) {
    console.error('Error saving concept in Neon DB:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
