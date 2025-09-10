/**
 * Tag list definition.
 *
 * Used to categorise posts.
 * Publicly readable.
 */
import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../fields/timestampFields';

export const Tag = list({
  access: {
    operation: {
      query: () => true, // public read
      create: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      update: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      delete: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
    },
  },
  ui: {
    isHidden: false,
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.tags', many: true }),
    
      // Inject reusable timestamps
      ...timestampFields,
  },
});