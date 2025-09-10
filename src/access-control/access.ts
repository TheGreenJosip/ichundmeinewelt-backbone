/**
 * Centralised access control functions.
 * 
 * For now, we keep it minimal:
 * - Admins can do everything.
 * - Users can only read.
 * 
 * This file will grow as we add more lists and fine-grained permissions.
 */
import { Roles } from './role.enum';
import { ListAccessArgs } from '../types';

/**
 * Check if the current session exists (user is signed in) and return a boolean.
 */
export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

/**
 * Check if the current user is an admin and return a boolean.
 */
export function isAdmin({ session }: ListAccessArgs): boolean {
  return session?.data.role === Roles.Admin;
}

/**
 * Simple access rules for list operations.
 * - Admin: full access
 * - User: read-only
 */
export const accessRules = {
  canRead: isSignedIn, // both admin and user can read
  canManage: isAdmin,  // only admin can create/update/delete
};