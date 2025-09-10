/**
 * ContactSubmission list definition.
 *
 * Stores messages from the landing page contact form.
 * - name, email, message, createdAt
 *
 * Access:
 * - Public can create (submit form)
 * - Only admin can read/manage
 */
import { list } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../fields/timestampFields';

export const ContactSubmission = list({
  access: {
    operation: {
      query: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      create: () => true, // public form submission
      update: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      delete: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
    },
  },
  ui: {
    listView: {
      initialColumns: ['name', 'email', 'createdAt'],
      initialSort: { field: 'createdAt', direction: 'DESC' },
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true } }),
    message: text({ ui: { displayMode: 'textarea' } }),
    
    // Inject reusable timestamps
    ...timestampFields,
  },
});