import { list } from '@keystone-6/core';
import { text, relationship, select, virtual } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { graphql } from '@keystone-6/core';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../utils/timestampFields';
import { serializeRichText } from '../utils/richTextSerializer';

/**
 * Utility: Extract plain text from Keystone document JSON.
 * This is useful for:
 * - Search indexing
 * - AI embeddings
 * - Summarization
 */
function extractPlainText(nodes: any[]): string {
    return nodes
        .map((node) => {
            if (node.text) return node.text;
            if (node.children) return extractPlainText(node.children);
            return '';
        })
        .join(' ')
        .trim();
}

/**
 * KnowledgeBase list definition (MVP version).
 *
 * Purpose:
 * - Stores internal knowledge entries, ideas, and imported articles.
 * - Supports rich content, metadata, tagging, and review status.
 *
 * MVP Features:
 * - Rich text content storage.
 * - Auto-generated plain text for search/AI.
 * - Source type and optional URL.
 * - Tagging system integration.
 * - Status tracking for review workflow.
 *
 * Excluded for MVP (can be added later):
 * - Self-referencing relationships (related entries)
 * - Evaluation scores (priority, feasibility, impact, personal interest)
 * - Raw source preservation (sourceRaw)
 * - Source metadata (sourceMeta)
 * - AI/graph fields (embedding, graphNodeId)
 * - Public voting fields
 *
 * Access:
 * - Admins can manage all entries.
 * - Signed-in users can read entries.
 */
export const KnowledgeBase = list({
    access: {
        operation: {
            query: accessRules.canRead as ({ session }: ListAccessArgs) => boolean,
            create: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
            update: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
            delete: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
        },
    },
    ui: {
        listView: {
            initialColumns: ['title', 'sourceType', 'status', 'createdAt'],
            initialSort: { field: 'createdAt', direction: 'DESC' },
        },
    },
    hooks: {
        /**
         * On create/update:
         * - Extract plain text from content.document for search/AI.
         */
        resolveInput: async ({ resolvedData }) => {
            if (resolvedData.content?.document) {
                resolvedData.plainText = extractPlainText(resolvedData.content.document);
            }
            return resolvedData;
        },
    },
    fields: {
        /** Title — required for all KB entries */
        title: text({ validation: { isRequired: true } }),

        /** Slug — unique URL-friendly identifier */
        slug: text({
            isIndexed: 'unique',
            ui: { description: 'URL-friendly identifier for the KB entry' },
        }),

        /** Main content — rich text document */
        content: document({
            formatting: {
                inlineMarks: {
                    bold: true,
                    italic: true,
                    underline: true,
                    strikethrough: true,
                    code: true,
                },
                listTypes: { ordered: true, unordered: true },
                alignment: { center: true, end: true },
                headingLevels: [1, 2, 3, 4, 5, 6],
                blockTypes: { blockquote: true, code: true },
                softBreaks: true,
            },
            links: true,
            dividers: true,
        }),

        /** Extracted plain text — auto-generated from content */
        plainText: text({
            ui: { description: 'Auto-generated plain text for search/AI' },
        }),

        /** Source type — original note, imported article, or web capture */
        sourceType: select({
            options: [
                { label: 'Original', value: 'original' },
                { label: 'Imported', value: 'imported' },
                { label: 'Web', value: 'web' },
            ],
            defaultValue: 'original',
            ui: { displayMode: 'segmented-control' },
        }),

        /** Optional source URL */
        sourceUrl: text({
            validation: { match: { regex: /^https?:\/\/\S+$/, explanation: 'Must be a valid URL' } },
            ui: { description: 'Optional source URL' },
        }),

        /** Tags — many-to-many relationship to Tag list */
        tags: relationship({ ref: 'Tag.knowledgeBaseEntries', many: true }),

        /** Status — draft, pending-ingest, ready-for-review */
        status: select({
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Pending Ingest', value: 'pending-ingest' },
                { label: 'Ready for Review', value: 'ready-for-review' },
            ],
            defaultValue: 'draft',
            ui: { displayMode: 'segmented-control' },
        }),

        /** HTML rendering of content — for SEO or non-React consumers */
        contentHtml: virtual({
            field: graphql.field({
                type: graphql.String,
                async resolve(item: any, args, context) {
                    const entry = await context.query.KnowledgeBase.findOne({
                        where: { id: String(item.id) },
                        query: `content { document }`,
                    });
                    if (!entry?.content?.document) return '';
                    return serializeRichText(entry.content.document);
                },
            }),
        }),

        // Reusable timestamps
        ...timestampFields,
    },
});