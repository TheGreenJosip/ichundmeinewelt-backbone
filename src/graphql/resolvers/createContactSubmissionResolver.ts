/**
 * @fileoverview Pure resolver logic for `createContactSubmission`.
 *
 * Responsibilities:
 * - Honeypot spam detection.
 * - Email format validation.
 * - Store message in Keystone `ContactSubmission` list.
 * - Optionally send email notification to admin.
 *
 * Typing:
 * - Uses `Context` from `.keystone/types` for full type safety on `context.db`.
 * - Defines a dedicated `CreateContactSubmissionArgs` type for resolver arguments.
 *
 * This function contains no GraphQL-specific code, making it easy to unit test.
 */

import type { Context } from '.keystone/types';

/**
 * Arguments accepted by the `createContactSubmission` mutation.
 * - `honeypot` is optional and may be `null` if omitted in GraphQL.
 */
export type CreateContactSubmissionArgs = {
    name: string;
    email: string;
    message: string;
    honeypot?: string | null;
};

export async function createContactSubmissionResolver(
    { name, email, message, honeypot }: CreateContactSubmissionArgs,
    context: Context
): Promise<string> {
    // Honeypot check — if filled, it's a bot
    if (honeypot && honeypot.trim() !== '') {
        throw new Error('Spam detected');
    }

    // Basic email format validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error('Invalid email address');
    }

    // Store contact message in Keystone
    await context.db.ContactSubmission.createOne({
        data: {
            name,
            email,
            message,
        },
    });

    // Optional: send email notification (commented out)
    // await sendAdminNotification(name, email, message);

    return 'Message received';
}