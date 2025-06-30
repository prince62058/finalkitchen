import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket for serverless environments
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// Only require DATABASE_URL when it's actually needed (not for fallback storage)
// Allow production to run without DATABASE_URL using in-memory storage

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
