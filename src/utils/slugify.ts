// File: src/utils/slugify.ts
// This file contains utility functions for generating slugs from strings.
// It is part of the ichundmeinewelt-backbone project.

/**
 * @fileoverview Utility function to generate URL-friendly slugs from strings.
 *
 * Why a separate utility?
 * - Keeps hook code clean and focused on Keystone logic.
 * - Allows reuse across multiple lists (e.g., Post, Tag, Category).
 * - Easier to test in isolation.
 *
 * Implementation details:
 * - Lowercases the string.
 * - Removes non-alphanumeric characters except spaces and hyphens.
 * - Replaces spaces/underscores with hyphens.
 * - Collapses multiple hyphens into one.
 * - Trims leading/trailing hyphens.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
    .replace(/[\s_-]+/g, '-')     // collapse whitespace/underscores to hyphen
    .replace(/^-+|-+$/g, '');     // trim leading/trailing hyphens
}