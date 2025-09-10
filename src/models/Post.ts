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
 */
import { list } from '@keystone-6/core';
import { text, relationship, timestamp, select } from '@keystone-6/core/fields';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../fields/timestampFields';

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
      initialColumns: ['title', 'status', 'publishedAt'],
      initialSort: { field: 'publishedAt', direction: 'DESC' },
    },
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({
      validation: { isRequired: true },
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