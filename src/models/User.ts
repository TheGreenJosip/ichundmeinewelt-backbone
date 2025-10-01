/**
 * User list definition.
 *
 * This is the core authentication entity for Keystone.
 * We keep it minimal but extend it to support:
 * - name, email, password
 * - role (admin/user)
 * - relationship to authored blog posts
 * - createdAt, updatedAt timestamps
 *
 * Access control:
 * - Only admins can create/update/delete users.
 * - All signed-in users can read user data (can be restricted later).
 *
 * Relationships:
 * - `posts` → links this user to any blog posts they have authored.
 *   This is the inverse side of `Post.author`.
 */
import { list } from '@keystone-6/core';
import { text, password, select, relationship } from '@keystone-6/core/fields';
import { Roles, RolesValues } from '../access-control/role.enum';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../utils/timestampFields';

export const User = list({
  access: {
    operation: {
      /**
       * Here we explicitly cast each access control function to:
       *   ({ session }: ListAccessArgs) => boolean
       *
       * Why?
       * - Keystone's `operation` property expects a function that returns a boolean
       *   (or a filter object for item-level access).
       * - Our `accessRules` functions (`canRead`, `canManage`) already return a boolean,
       *   but TypeScript can't always infer the exact function signature from our generic type.
       * - By casting, we tell TypeScript:
       *     "Yes, this function takes a `ListAccessArgs` object and returns a boolean."
       *
       * Boolean check pattern:
       * - `!!session` → returns `true` if `session` is truthy (user is signed in), else `false`.
       * - `session?.data.role === Roles.Admin` → returns `true` if the role is exactly 'admin', else `false`.
       */
      query: accessRules.canRead as ({ session }: ListAccessArgs) => boolean,
      create: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      update: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      delete: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
    },
  },
  ui: {
    listView: {
      initialColumns: ['name', 'email', 'role', 'posts', 'createdAt'],
      initialSort: { field: 'createdAt', direction: 'DESC' },
    },
  },
  fields: {
    /** Display name — required */
    name: text({ validation: { isRequired: true } }),

    /** Email address — unique login identifier */
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),

    /** Password — hashed automatically */
    password: password({ validation: { isRequired: true } }),

    /** Role — for RBAC */
    role: select({
      type: 'enum',
      options: RolesValues,
      defaultValue: Roles.User,
      validation: { isRequired: true },
    }),

    /**
     * Relationship to authored blog posts.
     * - Inverse side of `Post.author`.
     * - Allows assigning this user as the author of one or more posts.
     */
    posts: relationship({
      ref: 'Post.author',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['title', 'status', 'publishedAt'],
        inlineCreate: { fields: ['title', 'status', 'publishedAt'] },
        inlineEdit: { fields: ['title', 'status', 'publishedAt'] },
      },
    }),

    // Inject reusable timestamps
    ...timestampFields,
  },
});