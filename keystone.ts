import { config } from '@keystone-6/core';
import { lists } from './src/models';
import { extendGraphqlSchema } from './src/graphql';
import { withAuth, session } from './src/auth';
import { storage } from './src/config/storage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.prod') });

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL!,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    graphql: {
      path: '/api/graphql',
      extendGraphqlSchema,
      debug: process.env.NODE_ENV !== 'production',
    },
    server: {
      port: Number(process.env.BACKEND_PORT) || 3000,
      cors: {
        origin: process.env.NODE_ENV === 'production'
          ? [process.env.FRONTEND_URL] // e.g. https://ichundmeinewelt.com
          : [
            'http://localhost:4000', // your Next.js dev port
            'http://localhost:3001', // if Next picks a free port
          ],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      },
      extendExpressApp: (app, createContext) => {
        app.use((req, res, next) => {
          console.log(`Incoming request: ${req.method} ${req.url}`);
          next();
        });

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