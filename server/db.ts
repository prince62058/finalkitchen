import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket for serverless environments
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Optimize for serverless with connection pooling
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 1, // Limit connections for serverless
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle({ client: pool, schema });
