/**
 * User list definition.
 *
 * This is the core authentication entity for Keystone.
 * We keep it minimal for now:
 * - name, email, password
 * - role (admin/user)
 * - createdAt, updatedAt timestamps
 *
 * Access control:
 * - Only admins can create/update/delete users.
 * - All signed-in users can read user data (can be restricted later).
 */
import { list } from '@keystone-6/core';
import { text, password, select, timestamp } from '@keystone-6/core/fields';
import { Roles, RolesValues } from '../access-control/role.enum';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../fields/timestampFields';


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
      initialColumns: ['name', 'email', 'role', 'createdAt'],
      initialSort: { field: 'createdAt', direction: 'DESC' },
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    password: password({ validation: { isRequired: true } }),
    role: select({
      type: 'enum',
      options: RolesValues,
      defaultValue: Roles.User,
      validation: { isRequired: true },
    }),

    // Inject reusable timestamps
    ...timestampFields,
  },
});