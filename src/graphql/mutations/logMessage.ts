// src/graphql/mutations/logMessage.ts

/**
 * @fileoverview Simple PoC mutation to log a message on the server.
 *
 * Usage in GraphQL Playground:
 * mutation {
 *   logMessage(message: "Hello from custom mutation!")
 * }
 */
import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';
import { logMessageResolver } from '../resolvers/logMessageResolver';


export const logMessage = graphql.field({
  type: graphql.String,
  args: {
    message: graphql.arg({
      type: graphql.nonNull(graphql.String),
      description: 'The message to log to the server console',
    }),
  },
  resolve: async (source, { message }: { message: string }, context: Context) => {
    if (!context.session) {
      throw new Error('You must be signed in to log messages.');
    }
    return logMessageResolver(message);
  },
});