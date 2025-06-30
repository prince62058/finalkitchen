import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket for serverless environments
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// Only require DATABASE_URL in production or when explicitly using database storage
if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
  throw new Error(
    "DATABASE_URL must be set for production. Did you forget to provision a database?",
  );
}

// Only create database connection if DATABASE_URL is available
export let pool: Pool | null = null;
export let db: any = null;

if (process.env.DATABASE_URL) {
  // Optimize for serverless with connection pooling
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    max: 1, // Limit connections for serverless
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 5000,
  });
  
  db = drizzle({ client: pool, schema });
} else {
  console.log('DATABASE_URL not set, using in-memory storage for development');
}
