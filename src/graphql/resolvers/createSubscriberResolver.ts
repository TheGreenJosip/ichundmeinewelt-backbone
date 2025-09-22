/**
 * @fileoverview Pure resolver logic for `createSubscriber`.
 *
 * Responsibilities:
 * - Honeypot spam detection.
 * - Email format validation.
 * - Store subscriber in Keystone `Subscriber` list.
 * - Optionally trigger external sync (e.g., Brevo, MailerLite).
 *
 * Typing:
 * - Uses `Context` from `.keystone/types` for full type safety on `context.db`.
 * - Defines a dedicated `CreateSubscriberArgs` type for resolver arguments.
 *
 * This function contains no GraphQL-specific code, making it easy to unit test.
 */

import type { Context } from '.keystone/types';

/**
 * Arguments accepted by the `createSubscriber` mutation.
 * - `name`, `source`, and `honeypot` are optional and may be `null` if omitted in GraphQL.
 */
export type CreateSubscriberArgs = {
    email: string;
    name?: string | null;
    source?: string | null;
    honeypot?: string | null;
};

export async function createSubscriberResolver(
    { email, name, source, honeypot }: CreateSubscriberArgs,
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

    // Store subscriber in Keystone
    await context.db.Subscriber.createOne({
        data: {
            email,
            name: name ?? undefined, // Convert null to undefined for Keystone
            source: source ?? undefined,
            status: 'active',
            consentGiven: true,
        },
    });

    // Optional: external sync (commented out)
    // await syncToEmailProvider(email, name ?? undefined);

    return 'Subscription successful';
}