/**
 * Timestamp fields helper.
 *
 * This reusable object contains two common timestamp fields:
 * - createdAt → set automatically when the record is created
 * - updatedAt → updated automatically whenever the record changes
 *
 * Why use a helper?
 * - Avoids repeating the same field definitions in every list.
 * - Ensures consistent behaviour and UI configuration across all lists.
 * - Makes it easy to update timestamp behaviour in one place if needed.
 *
 * Usage:
 *   import { timestampFields } from '../fields/timestampFields';
 *
 *   export const Post = list({
 *     fields: {
 *       title: text(),
 *       ...timestampFields,
 *     }
 *   });
 *
 * Access control:
 * - These fields are read-only in the AdminUI (hidden in create view, read-only in item view).
 * - They are still queryable via GraphQL for display on the frontend.
 */

import { timestamp } from '@keystone-6/core/fields';

export const timestampFields = {
  /**
   * createdAt:
   * - Automatically set to "now" when the record is created.
   * - Hidden in the create form to prevent manual input.
   * - Read-only in the item view to prevent edits.
   */
  createdAt: timestamp({
    defaultValue: { kind: 'now' },
    ui: {
      createView: { fieldMode: 'hidden' },
      itemView: { fieldMode: 'read' },
    },
  }),

  /**
   * updatedAt:
   * - Automatically updated to "now" whenever the record is changed.
   * - Hidden in the create form to prevent manual input.
   * - Read-only in the item view to prevent edits.
   * - Uses Prisma's `updatedAt` feature for automatic updates.
   */
  updatedAt: timestamp({
    db: { updatedAt: true },
    ui: {
      createView: { fieldMode: 'hidden' },
      itemView: { fieldMode: 'read' },
    },
  }),
};