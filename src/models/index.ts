/**
 * Barrel export for all Keystone lists.
 * 
 * This allows `keystone.ts` to import `lists` in one line.
 * As we add more lists (Customer, Order, etc.), we just add them here.
 */
import { User } from './User';

export const lists = {
  User,
};