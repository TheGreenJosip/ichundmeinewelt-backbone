/**
 * @fileoverview Central GraphQL schema extension entry point.
 *
 * This file collects all custom queries and mutations and registers them
 * with Keystone's `extendGraphqlSchema` API.
 *
 * ## Codegen Notes:
 * - All imported queries/mutations should have `description` set in their definitions.
 * - Keystone will merge these into the introspected schema, enabling tools like
 *   GraphQL Code Generator and Insomnia to display rich API documentation.
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