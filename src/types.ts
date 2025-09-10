/**
 * Shared type definitions for the Keystone.js application.
 *
 * This is a slimmed-down version of the PIM application's types.ts,
 * adapted for the new minimal backbone.
 *
 * It keeps `session` optional to match Keystone's internal access control types,
 * so we don't get type errors when using our access rules in list definitions.
 */

import { KeystoneGraphQLAPI, KeystoneListsAPI } from '@keystone-6/core/types';
import { Roles } from './access-control/role.enum';

/**
 * Shape of the session object Keystone stores in cookies.
 * Extend this as needed when you add more fields to `sessionData` in auth.ts.
 */
export type Session = {
  itemId: string;
  listKey: string;
  data: {
    name: string;
    email: string;
    role: Roles;
  };
};

/**
 * Keystone's generated Lists API type.
 * We keep it generic for now — can be replaced with generated types later.
 */
export type ListsAPI = KeystoneListsAPI<any>;
export type GraphqlAPI = KeystoneGraphQLAPI;

/**
 * Arguments passed to list-level access control functions.
 * - `session` is optional because access control can run without a logged-in user.
 * - `item` is only present for item-level checks (update/delete filters).
 * - `context` is the Keystone context object.
 */
export type ListAccessArgs = {
  session?: Session;
  item?: any;
  context?: any;
};