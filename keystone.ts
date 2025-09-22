// keystone.ts

/**
 * Keystone entry point.
 * 
 * - Configures SQLite DB for local development.
 * - Wires in authentication and session handling.
 * - Loads all lists from `src/models`.
 * - Restricts AdminUI access to signed-in users.
 */
import { config } from '@keystone-6/core';
import { lists } from './src/models';
import { withAuth, session } from './src/auth';
import { extendGraphqlSchema } from './src/graphql';
import { storage } from './src/config/storage';

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    storage,
    lists,
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    graphql: {
      extendGraphqlSchema,
    },
  })
);