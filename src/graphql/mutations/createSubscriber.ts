/**
 * @fileoverview Custom GraphQL mutation: `createSubscriber`
 *
 * Purpose:
 * - Handles newsletter signup submissions from the landing page or blog.
 * - Validates input, applies spam protection, and stores the subscriber in Keystone.
 *
 * Access Control:
 * - Publicly accessible (no session required) — but includes honeypot spam check.
 *
 * Typing:
 * - Uses `Context` from `.keystone/types` for full type safety on `context`.
 * - Imports `CreateSubscriberArgs` from the resolver to keep mutation and resolver in sync.
 *
 * Usage in GraphQL Playground / Insomnia:
 * ```graphql
 * mutation {
 *   createSubscriber(
 *     email: "user@example.com",
 *     name: "John Doe",
 *     source: "landing-page",
 *     honeypot: ""
 *   )
 * }
 * ```
 *
 * Expected Response:
 * ```json
 * {
 *   "data": {
 *     "createSubscriber": "Subscription successful"
 *   }
 * }
 * ```
 */

import { graphql } from '@keystone-6/core';
import type { Context } from '.keystone/types';
import { createSubscriberResolver, CreateSubscriberArgs } from '../resolvers/createSubscriberResolver';

export const submitNewsletterSignup = graphql.field({
    type: graphql.String,
    description: 'Creates a new newsletter subscriber.',
    args: {
        email: graphql.arg({
            type: graphql.nonNull(graphql.String),
            description: 'Subscriber email address.',
        }),
        name: graphql.arg({
            type: graphql.String,
            description: 'Optional subscriber name.',
        }),
        source: graphql.arg({
            type: graphql.String,
            description: 'Where the signup happened (e.g., landing-page, blog-footer).',
        }),
        honeypot: graphql.arg({
            type: graphql.String,
            description: 'Hidden anti-spam field — should be empty for real users.',
        }),
    },
    resolve: async (
        source,
        args: CreateSubscriberArgs,
        context: Context
    ): Promise<string> => {
        return createSubscriberResolver(args, context);
    },
});