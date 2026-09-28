import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

export const isDbConfigured = () => {
  return Boolean(databaseUrl && databaseUrl.trim() !== '' && !databaseUrl.includes('user:password'));
};

export const getDb = () => {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured in environment variables.');
  }
  return neon(databaseUrl);
};
