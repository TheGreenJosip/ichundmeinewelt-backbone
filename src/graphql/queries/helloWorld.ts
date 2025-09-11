// src/graphql/queries/helloWorld.ts

/**
 * @fileoverview Simple PoC query to return a static message.
 *
 * Usage in GraphQL Playground:
 * query {
 *   helloWorld
 * }
 */
import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';

export const helloWorld = graphql.field({
  type: graphql.String,
  resolve: async (source, args, context: Context) => {
    return 'Hello World from Keystone custom GraphQL!';
  },
});