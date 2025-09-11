// src/graphql/index.ts

/**
 * @fileoverview Central GraphQL schema extension entry point.
 *
 * This collects all custom queries and mutations and registers them
 * with Keystone's `extendGraphqlSchema` API.
 */
import { graphql } from '@keystone-6/core';

// Import mutations
import { logMessage } from './mutations/logMessage';

// Import queries
import { helloWorld } from './queries/helloWorld';

export const extendGraphqlSchema = graphql.extend((base) => ({
  mutation: {
    logMessage,
  },
  query: {
    helloWorld,
  },
}));