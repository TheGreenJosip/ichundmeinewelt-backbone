/**
 * @fileoverview Pure resolver logic for `createKnowledgeBaseEntry`.
 *
 * Responsibilities:
 * - API key authentication.
 * - Basic validation of required fields.
 * - Store entry in Keystone `KnowledgeBase` list.
 * - Associate tags if provided.
 *
 * Typing:
 * - Matches Keystone GraphQL arg types (optional args can be `string | null | undefined`).
 */

import type { Context } from '.keystone/types';

export type CreateKnowledgeBaseEntryArgs = {
    title: string;
    content?: any | null;
    sourceType?: string | null;
    sourceUrl?: string | null;
    tags?: (string | null)[] | null;
    status?: string | null;
};

export async function createKnowledgeBaseEntryResolver(
    { title, content, sourceType, sourceUrl, tags, status }: CreateKnowledgeBaseEntryArgs,
    context: Context
): Promise<string> {
    // API key check
    const apiKey = context.req?.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.KB_API_KEY) {
        throw new Error('Unauthorized: Invalid API key');
    }

    // Basic validation
    if (!title || title.trim() === '') {
        throw new Error('Title is required');
    }

    // Create KB entry
    await context.db.KnowledgeBase.createOne({
        data: {
            title,
            content: content ?? undefined,
            sourceType: sourceType ?? 'original',
            sourceUrl: sourceUrl ?? undefined,
            status: status ?? 'draft',
            tags: tags
                ? { connect: tags.filter(Boolean).map((id) => ({ id: String(id) })) }
                : undefined,
        },
    });

    return 'KnowledgeBase entry created';
}