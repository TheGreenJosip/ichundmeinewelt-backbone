import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../utils/timestampFields';

/**
 * Tag list definition.
 *
 * Purpose:
 * - Provides a reusable tagging system for multiple content types.
 * - Currently used by:
 *   - Post (blog/news)
 *   - KnowledgeBase (internal knowledge entries)
 *
 * Access:
 * - Public read access.
 * - Only admins can create/update/delete.
 */
export const Tag = list({
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
      initialColumns: ['name', 'posts', 'knowledgeBaseEntries'],
    },
  },
  fields: {
    /** Tag name — required and unique */
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),

    /** Relationship to blog posts */
    posts: relationship({ ref: 'Post.tags', many: true }),

    /** Relationship to knowledge base entries */
    knowledgeBaseEntries: relationship({ ref: 'KnowledgeBase.tags', many: true }),

    // Reusable timestamps
    ...timestampFields,
  },
});