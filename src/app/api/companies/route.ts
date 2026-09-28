import { NextResponse } from 'next/server';
import { getDb, isDbConfigured } from '@/lib/db';

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ success: true, companies: [] });
  }

  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, name, segment, city, instagram, google_maps_link, whatsapp, current_site, description, stage, created_at 
      FROM companies 
      ORDER BY created_at DESC;
    `;
    return NextResponse.json({ success: true, companies: rows });
  } catch (err: any) {
    console.error('Error fetching companies from Neon DB:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ success: true });
  }

  try {
    const company = await req.json();
    const sql = getDb();

    await sql`
      INSERT INTO companies (
        id, name, segment, city, instagram, google_maps_link, whatsapp, current_site, description, stage
      ) VALUES (
        ${company.id},
        ${company.name},
        ${company.segment || ''},
        ${company.city || ''},
        ${company.instagram || ''},
        ${company.google_maps_link || ''},
        ${company.whatsapp || ''},
        ${company.current_site || ''},
        ${company.description || ''},
        ${company.stage || 'NOVO_LEAD'}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        segment = EXCLUDED.segment,
        city = EXCLUDED.city,
        instagram = EXCLUDED.instagram,
        google_maps_link = EXCLUDED.google_maps_link,
        whatsapp = EXCLUDED.whatsapp,
        current_site = EXCLUDED.current_site,
        description = EXCLUDED.description,
        stage = EXCLUDED.stage;
    `;

    return NextResponse.json({ success: true, company });
  } catch (err: any) {
    console.error('Error saving company in Neon DB:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
