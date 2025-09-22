/**
 * Subscriber list definition.
 *
 * Stores newsletter signups from the landing page and blog.
 * - email, name, source, status, consent
 *
 * Access:
 * - Public can create (signup form)
 * - Only admin can read/manage
 */
import { list } from '@keystone-6/core';
import { text, timestamp, select, checkbox } from '@keystone-6/core/fields';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../utils/timestampFields';

export const Subscriber = list({
  access: {
    operation: {
      query: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      create: () => true, // public signup
      update: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      delete: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
    },
  },
  ui: {
    listView: {
      initialColumns: ['email', 'name', 'status', 'subscribedAt'],
      initialSort: { field: 'subscribedAt', direction: 'DESC' },
    },
  },
  fields: {
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    name: text(),
    source: text({
      ui: { description: 'Where the signup happened (e.g., landing-page, blog-footer)' },
    }),
    status: select({
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      defaultValue: 'active',
      ui: { displayMode: 'segmented-control' },
    }),
    consentGiven: checkbox({
      defaultValue: true,
      ui: { description: 'Whether the subscriber gave explicit consent' },
    }),
    subscribedAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),

    // Inject reusable timestamps
    ...timestampFields,
  },
});