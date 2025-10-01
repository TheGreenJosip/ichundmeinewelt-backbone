import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../utils/timestampFields';

/**
 * Category list definition.
 *
 * Purpose:
 * - Provides a single-select category for grouping blog posts.
 * - Improves content organization and navigation in the blog area.
 * - Complements the Tag list (which is many-to-many and more granular).
 *
 * Usage:
 * - Each Post can have one Category.
 * - Categories can be used for filtering, navigation menus, and SEO.
 *
 * Access:
 * - Public read access for all categories.
 * - Only admins can create/update/delete categories.
 *
 * UI:
 * - Displays category name and related posts in the AdminUI.
 * - Sorted alphabetically by default.
 */

export const Category = list({
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
            initialColumns: ['name', 'posts'],
            initialSort: { field: 'name', direction: 'ASC' },
        },
    },
    fields: {
        /** Category name — required and unique */
        name: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
            ui: { description: 'Name of the category (e.g., "Tech", "Guides", "News")' },
        }),

        /** Relationship to blog posts */
        posts: relationship({
            ref: 'Post.category',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['title', 'status', 'publishedAt'],
                inlineCreate: { fields: ['title', 'status', 'publishedAt'] },
                inlineEdit: { fields: ['title', 'status', 'publishedAt'] },
            },
        }),

        // Reusable timestamps (createdAt, updatedAt)
        ...timestampFields,
    },
});