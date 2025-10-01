import { graphql } from '@keystone-6/core';
import type { Context } from '.keystone/types';
import {
    createKnowledgeBaseEntryResolver,
    CreateKnowledgeBaseEntryArgs,
} from '../resolvers/createKnowledgeBaseEntryResolver';

export const createKnowledgeBaseEntry = graphql.field({
    type: graphql.String,
    description: 'Creates a new KnowledgeBase entry (API key protected).',
    args: {
        title: graphql.arg({
            type: graphql.nonNull(graphql.String),
            description: 'Title of the knowledge entry.',
        }),
        content: graphql.arg({
            type: graphql.JSON,
            description: 'Optional rich text content (Keystone document JSON).',
        }),
        sourceType: graphql.arg({
            type: graphql.String,
            description: 'Source type: original, imported, or web.',
        }),
        sourceUrl: graphql.arg({
            type: graphql.String,
            description: 'Optional source URL.',
        }),
        tags: graphql.arg({
            type: graphql.list(graphql.String),
            description: 'List of Tag IDs to associate.',
        }),
        status: graphql.arg({
            type: graphql.String,
            description: 'Status: draft, pending-ingest, ready-for-review.',
        }),
    },
    resolve: async (
        source,
        args: CreateKnowledgeBaseEntryArgs,
        context: Context
    ): Promise<string> => {
        return createKnowledgeBaseEntryResolver(args, context);
    },
});