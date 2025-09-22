/**
 * @fileoverview Custom GraphQL mutation: `createContactSubmission`
 *
 * Purpose:
 * - Handles contact form submissions from the landing page.
 * - Validates input, applies spam protection, and stores the message in Keystone.
 * - Optionally sends an email notification to the admin.
 *
 * Access Control:
 * - Publicly accessible (no session required) — but includes honeypot spam check.
 *
 * Typing:
 * - Uses `Context` from `.keystone/types` for full type safety on `context`.
 * - Imports `CreateContactSubmissionArgs` from the resolver to keep mutation and resolver in sync.
 *
 * Usage in GraphQL Playground / Insomnia:
 * ```graphql
 * mutation {
 *   createContactSubmission(
 *     name: "Jane Doe",
 *     email: "jane@example.com",
 *     message: "Hello, I am interested in your services.",
 *     honeypot: ""
 *   )
 * }
 * ```
 *
 * Expected Response:
 * ```json
 * {
 *   "data": {
 *     "createContactSubmission": "Message received"
 *   }
 * }
 * ```
 */

import { graphql } from '@keystone-6/core';
import type { Context } from '.keystone/types';
import {
    createContactSubmissionResolver,
    CreateContactSubmissionArgs,
} from '../resolvers/createContactSubmissionResolver';

export const submitContactForm = graphql.field({
    type: graphql.String,
    description: 'Creates a new contact form submission.',
    args: {
        name: graphql.arg({
            type: graphql.nonNull(graphql.String),
            description: 'Name of the person submitting the form.',
        }),
        email: graphql.arg({
            type: graphql.nonNull(graphql.String),
            description: 'Email address of the person submitting the form.',
        }),
        message: graphql.arg({
            type: graphql.nonNull(graphql.String),
            description: 'Message content.',
        }),
        honeypot: graphql.arg({
            type: graphql.String,
            description: 'Hidden anti-spam field — should be empty for real users.',
        }),
    },
    resolve: async (
        source,
        args: CreateContactSubmissionArgs,
        context: Context
    ): Promise<string> => {
        return createContactSubmissionResolver(args, context);
    },
});