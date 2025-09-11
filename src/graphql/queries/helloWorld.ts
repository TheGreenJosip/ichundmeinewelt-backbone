/**
 * @fileoverview Custom GraphQL query: `helloWorld`
 *
 * Returns a static greeting message.
 *
 * ## Usage in GraphQL Playground / Insomnia:
 * ```graphql
 * query {
 *   helloWorld
 * }
 * ```
 *
 * ## Expected Response:
 * ```json
 * {
 *   "data": {
 *     "helloWorld": "Hello World from Keystone custom GraphQL!"
 *   }
 * }
 * ```
 *
 * This query is Codegen‑ready:
 * - `description` is provided for the query itself.
 * - Keystone will include this in the introspected schema for API documentation.
 */
import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';

export const helloWorld = graphql.field({
  type: graphql.String,
  description: 'Returns a static greeting message for testing the API connection.',
  resolve: async (source, args, context: Context) => {
    return 'Hello World from Keystone custom GraphQL!';
  },
});