import { config } from '@keystone-6/core';
import { lists } from './src/models';
import { extendGraphqlSchema } from './src/graphql';
import { withAuth, session } from './src/auth';
import { storage } from './src/config/storage';
import { ENV } from './src/config/env'; // <-- import centralised env

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: ENV.DATABASE_URL,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    graphql: {
      path: '/api/graphql',
      extendGraphqlSchema,
      debug: ENV.NODE_ENV !== 'production',
    },
    server: {
      port: ENV.BACKEND_PORT,
      cors: {
        origin:
          ENV.NODE_ENV === 'production'
            ? [ENV.FRONTEND_URL]
            : [
              'http://localhost:4000',
              'http://localhost:3001',
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