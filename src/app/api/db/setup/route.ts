import { NextResponse } from 'next/server';
import { getDb, isDbConfigured } from '@/lib/db';
import { DEFAULT_APP_SETTINGS } from '@/types';

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ 
      success: false, 
      message: 'DATABASE_URL não configurada no ambiente.' 
    }, { status: 400 });
  }

  try {
    const sql = getDb();

    // 1. Tabela de Usuários (com Marcos Antonio como admin inicial)
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Inserir ou atualizar Marcos Antonio
    await sql`
      INSERT INTO users (id, email, password_hash, name, role)
      VALUES (
        'usr-marcos-01',
        'marcos220896antonio@gmail.com',
        'MAR9115COS',
        'Marcos Antonio',
        'admin'
      )
      ON CONFLICT (email) DO UPDATE 
      SET password_hash = EXCLUDED.password_hash, name = EXCLUDED.name, role = EXCLUDED.role;
    `;

    // 3. Tabela de Empresas
    await sql`
      CREATE TABLE IF NOT EXISTS companies (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        segment VARCHAR(255),
        city VARCHAR(255),
        instagram VARCHAR(255),
        google_maps_link TEXT,
        whatsapp VARCHAR(50),
        current_site TEXT,
        description TEXT,
        stage VARCHAR(50) DEFAULT 'NOVO_LEAD',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 4. Tabela de Conceitos de Site (Website Concepts)
    await sql`
      CREATE TABLE IF NOT EXISTS website_concepts (
        id VARCHAR(64) PRIMARY KEY,
        company_id VARCHAR(64) REFERENCES companies(id) ON DELETE CASCADE,
        layout_type VARCHAR(50),
        variant_title VARCHAR(255),
        custom_badge VARCHAR(100),
        style TEXT,
        color_palette JSONB,
        site_structure JSONB,
        active_sections JSONB,
        image_suggestions JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 5. Tabela de Propostas Comerciais
    await sql`
      CREATE TABLE IF NOT EXISTS proposals (
        id VARCHAR(64) PRIMARY KEY,
        company_id VARCHAR(64) REFERENCES companies(id) ON DELETE CASCADE,
        company_name VARCHAR(255),
        cover_title TEXT,
        tiers JSONB,
        deliverables JSONB,
        timeline TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 6. Tabela de Configurações Globais
    await sql`
      CREATE TABLE IF NOT EXISTS system_settings (
        id VARCHAR(64) PRIMARY KEY,
        config JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Inserir configurações padrão se não existir
    await sql`
      INSERT INTO system_settings (id, config)
      VALUES ('global', ${JSON.stringify(DEFAULT_APP_SETTINGS)})
      ON CONFLICT (id) DO NOTHING;
    `;

    // Testar contagem de usuários
    const userCount = await sql`SELECT count(*) FROM users;`;
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `;

    return NextResponse.json({
      success: true,
      message: 'Banco de dados Neon PostgreSQL configurado e inicializado com sucesso!',
      tables: tables.map(t => t.table_name),
      user_count: userCount[0].count,
      admin_user: 'marcos220896antonio@gmail.com'
    });
  } catch (err: any) {
    console.error('Database setup error:', err);
    return NextResponse.json({
      success: false,
      error: err.message || 'Erro ao conectar ou criar tabelas no Neon'
    }, { status: 500 });
  }
}
