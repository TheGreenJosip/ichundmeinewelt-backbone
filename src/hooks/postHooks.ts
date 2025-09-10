/**
 * @fileoverview Lifecycle hooks for the Post list.
 *
 * This file contains all Post-specific business logic that should run
 * during Keystone's list lifecycle events (create, update, delete).
 *
 * Benefits of extracting hooks:
 * - Keeps list definitions clean and focused on schema.
 * - Makes hooks easier to test and maintain.
 * - Encourages reuse if similar logic is needed elsewhere.
 */

import { KeystoneContext } from '@keystone-6/core/types';
import { slugify } from '../utils/slugify';

/**
 * Hook: generateSlug
 *
 * Runs before create/update mutations are applied to the database.
 * - Automatically generates a slug from the title if none is provided.
 * - Ensures slug is lowercase and URL-friendly.
 * - Leaves manually provided slugs untouched.
 *
 * @param {Object} params - Hook parameters
 * @param {string} params.operation - The type of operation ("create" or "update")
 * @param {Record<string, any>} params.resolvedData - The data Keystone will save
 * @param {Record<string, any>} [params.item] - The existing item (on update)
 * @param {KeystoneContext} params.context - Keystone context
 * @returns {Promise<Record<string, any>>} - The modified resolvedData
 */
export const generateSlug = async ({
  operation,
  resolvedData,
  item,
  context, // not used now, but kept for future DB uniqueness checks
}: {
  operation: 'create' | 'update' | string;
  resolvedData: Record<string, any>;
  item?: Record<string, any>;
  context: KeystoneContext;
}): Promise<Record<string, any>> => {
  // Only run on create or update
  if (operation === 'create' || operation === 'update') {
    // If no slug provided but title exists, generate one
    if (resolvedData.title && !resolvedData.slug) {
      resolvedData.slug = slugify(resolvedData.title);
    }

    // Normalize slug to lowercase if it exists
    if (resolvedData.slug) {
      resolvedData.slug = resolvedData.slug.toLowerCase();
    }
  }

  return resolvedData;
};