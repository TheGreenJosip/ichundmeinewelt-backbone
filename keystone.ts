import { config } from '@keystone-6/core';
import { lists } from './src/models';
import { extendGraphqlSchema } from './src/graphql';
import { withAuth, session } from './src/auth';
import { storage } from './src/config/storage';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.prod for local/dev builds
// In Docker Swarm, env vars are injected via env_file in the stack
dotenv.config({ path: path.resolve(process.cwd(), '.env.prod') });

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL!,
    },
    ui: {
      // Only allow access to AdminUI if a session exists
      isAccessAllowed: (context) => !!context.session?.data,
    },
    graphql: {
      path: '/api/graphql',
      extendGraphqlSchema,
      // Enable debug mode only outside production
      debug: process.env.NODE_ENV !== 'production',
    },
    server: {
      // Use BACKEND_PORT from env, fallback to 3000
      port: Number(process.env.BACKEND_PORT) || 3000,
      cors: {
        // In production, restrict CORS to the configured frontend URL
        origin:
          process.env.NODE_ENV === 'production'
            ? [process.env.FRONTEND_URL]
            : [
              'http://localhost:4000', // Next.js dev port
              'http://localhost:3001', // Alternate dev port
            ],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      },
      extendExpressApp: (app, createContext) => {
        // Simple request logging middleware
        app.use((req, res, next) => {
          console.log(`Incoming request: ${req.method} ${req.url}`);
          next();
        });

        // Healthcheck endpoint for Docker/Traefik/Swarm
        app.get('/status', async (req, res) => {
          res.status(200).json({ status: 'up' });
        });
      },
    },
    session,
    storage,
    lists,
  })
);