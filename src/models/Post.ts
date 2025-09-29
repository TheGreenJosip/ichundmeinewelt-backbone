import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  timestamp,
  select,
  checkbox,
  integer,
  image,
  virtual,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { graphql } from '@keystone-6/core';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../utils/timestampFields';
import { generateSlug } from '../hooks/postHooks';
import { serializeRichText } from '../utils/richTextSerializer';

/**
 * Post list definition (Rich Blog Model).
 *
 * Purpose:
 * - Stores public-facing blog/news posts for the landing page and blog area.
 * - Supports rich content, metadata, relationships, and engagement tracking.
 *
 * Storage:
 * - `coverImage` uses the `local_images` storage adapter.
 * - Ensure `keystone.ts` has a matching storage config.
 *
 * Access:
 * - Public can read only published posts.
 * - Admin can manage all posts.
 *
 * Hooks:
 * - Auto-generate slug from title if not provided.
 * - Calculate reading time from content length.
 * - Provide HTML rendering of content for SEO/non-React consumers.
 */

export const Post = list({
  access: {
    operation: {
      query: () => true, // Public read
      create: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      update: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      delete: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
    },
  },
  ui: {
    listView: {
      initialColumns: ['title', 'slug', 'status', 'publishedAt', 'featured'],
      initialSort: { field: 'publishedAt', direction: 'DESC' },
    },
  },
  hooks: {
    resolveInput: generateSlug,
  },
  fields: {
    /** Title — required for all posts */
    title: text({ validation: { isRequired: true } }),

    /** Slug — unique URL-friendly identifier, auto-generated if missing */
    slug: text({
      isIndexed: 'unique',
      ui: { description: 'URL-friendly identifier for the post' },
    }),

    /** Excerpt — short summary for cards, SEO meta description */
    excerpt: text({
      ui: { displayMode: 'textarea' },
    }),

    /**
     * Cover Image:
     * - Stored locally via `local_images` storage adapter.
     * - Ensure `keystone.ts` has matching storage config.
     */
    coverImage: image({
      storage: 'local_images',
      ui: { description: 'Main image for the post (used in cards & headers)' },
    }),

    /**
     * Content:
     * - Rich text document field.
     * - Supports full formatting, layouts, links, and dividers.
     * - This JSON will be rendered in the frontend via DocumentRenderer.
     */
    content: document({
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
          code: true,
          superscript: true,
          subscript: true,
          keyboard: true,
        },
        listTypes: { ordered: true, unordered: true },
        alignment: { center: true, end: true },
        headingLevels: [1, 2, 3, 4, 5, 6],
        blockTypes: { blockquote: true, code: true },
        softBreaks: true,
      },
      layouts: [
        [1, 1],
        [1, 1, 1],
      ],
      links: true,
      dividers: true,
    }),

    /** Status — draft or published */
    status: select({
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      ui: { displayMode: 'segmented-control' },
    }),

    /** Published date */
    publishedAt: timestamp(),

    /** Featured flag — for homepage highlights */
    featured: checkbox({
      defaultValue: false,
      ui: { description: 'Show in featured posts section' },
    }),

    /** Tags — many-to-many relationship to Tag list */
    tags: relationship({ ref: 'Tag.posts', many: true }),

    /**
     * Reading time — calculated from content length.
     * Uses document JSON to count words.
     */
    readingTime: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const post = await context.query.Post.findOne({
            where: { id: item.id.toString() },
            query: `content { document }`,
          });

          if (!post?.content?.document) return '0 min read';

          const extractText = (nodes: any[]): string =>
            nodes
              .map((node) => {
                if (node.text) return node.text;
                if (node.children) return extractText(node.children);
                return '';
              })
              .join(' ');

          const text = extractText(post.content.document);
          const words = text.trim().split(/\s+/).filter(Boolean).length;
          const minutes = Math.ceil(words / 200);
          return `${minutes} min read`;
        },
      }),
    }),

    /**
     * HTML rendering of content — for SEO or non-React consumers.
     * Frontend now uses DocumentRenderer with `content.document` directly.
     */
    contentHtml: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const post = await context.query.Post.findOne({
            where: { id: item.id.toString() },
            query: `content { document }`,
          });

          if (!post?.content?.document) return '';
          return serializeRichText(post.content.document);
        },
      }),
    }),

    /** Engagement metrics — view count and like count */
    viewCount: integer({ defaultValue: 0 }),
    likeCount: integer({ defaultValue: 0 }),

    // Reusable timestamps (createdAt, updatedAt)
    ...timestampFields,
  },
});