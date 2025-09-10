/**
 * Post list definition.
 *
 * Public-facing blog/news posts for the landing page.
 * - title, slug, content, status, publishedAt
 * - tags relationship
 *
 * Access:
 * - Public can read only published posts
 * - Admin can manage all posts
 *
 * Hooks:
 * - Slug auto-generation moved to src/hooks/postHooks.ts
 */
import { list } from '@keystone-6/core';
import { text, relationship, timestamp, select } from '@keystone-6/core/fields';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../utils/timestampFields';
import { generateSlug } from '../hooks/postHooks';

export const Post = list({
  access: {
    operation: {
      query: () => true, // public read
      create: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      update: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      delete: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
    },
  },
  ui: {
    listView: {
      initialColumns: ['title', 'slug', 'status', 'publishedAt'],
      initialSort: { field: 'publishedAt', direction: 'DESC' },
    },
    },
  /**
   * Hooks:
   * - Auto-generate slug from title if not provided.
   * - We could also add logic to ensure uniqueness, etc.
   */
  hooks: {
    resolveInput: generateSlug,
  },
  fields: {
    title: text({ validation: { isRequired: true } }),

    /**
     * Slug:
     * - Not required at input level (hook will generate if missing).
     * - Unique index for fast lookups.
     * - AdminUI description for clarity.
     */
    slug: text({
      isIndexed: 'unique',
      ui: { description: 'URL-friendly identifier for the post' },
    }),

    content: text({
      ui: { displayMode: 'textarea' },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      ui: { displayMode: 'segmented-control' },
    }),
    publishedAt: timestamp(),
    tags: relationship({ ref: 'Tag.posts', many: true }),

    // Inject reusable timestamps
    ...timestampFields,
  },
});