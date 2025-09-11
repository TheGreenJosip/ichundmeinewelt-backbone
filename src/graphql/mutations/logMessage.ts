/**
 * @fileoverview Custom GraphQL mutation: `logMessage`
 *
 * Logs a message to the server console and returns a confirmation string.
 *
 * ## Usage in GraphQL Playground / Insomnia:
 * ```graphql
 * mutation {
 *   logMessage(message: "Hello from custom mutation!")
 * }
 * ```
 *
 * ## Expected Response:
 * ```json
 * {
 *   "data": {
 *     "logMessage": "Logged message: Hello from custom mutation!"
 *   }
 * }
 * ```
 *
 * ## Access Control:
 * - Requires an active session (user must be signed in).
 *
 * This mutation is Codegen‑ready:
 * - `description` is provided for the mutation itself and its arguments.
 * - Keystone will include these descriptions in the introspected schema.
 */
import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';
import { logMessageResolver } from '../resolvers/logMessageResolver';

export const logMessage = graphql.field({
  type: graphql.String,
  description: 'Logs a message to the server console and returns a confirmation string.',
  args: {
    message: graphql.arg({
      type: graphql.nonNull(graphql.String),
      description: 'The message text to log to the server console.',
    }),
  },
  resolve: async (
    source,
    { message }: { message: string },
    context: Context
  ) => {
    if (!context.session) {
      throw new Error('You must be signed in to log messages.');
    }
    return logMessageResolver(message);
  },
});