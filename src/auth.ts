/**
 * Keystone authentication configuration.
 * 
 * - Uses stateless sessions (cookie-based).
 * - Includes `role` in session data for access control.
 * - Creates the first user as an admin if no users exist.
 */
import { randomBytes } from 'crypto';
import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
import { Roles } from './access-control/role.enum';

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== 'production') {
  sessionSecret = randomBytes(32).toString('hex');
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'id name role',
  initFirstItem: {
    fields: ['name', 'email', 'password', 'role'],
    itemData: { role: Roles.Admin },
  },
});

const session = statelessSessions({
  maxAge: 60 * 60 * 24 * 30, // 30 days
  secret: sessionSecret!,
});

export { withAuth, session };