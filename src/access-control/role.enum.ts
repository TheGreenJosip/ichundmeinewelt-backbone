/**
 * Role definitions for the application.
 * 
 * Keeping this in a separate file allows us to:
 * - Add new roles later without touching multiple files.
 * - Use a single source of truth for role values.
 */
export enum Roles {
  Admin = 'admin',
  User = 'user',
}

/**
 * Keystone's `select` field expects an array of { label, value } objects.
 * This allows us to reuse the enum values in the schema definition.
 */
export const RolesValues = [
  { label: 'Admin', value: Roles.Admin },
  { label: 'User', value: Roles.User },
];