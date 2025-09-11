/**
 * @fileoverview Pure resolver logic for the `logMessage` mutation.
 *
 * This function contains no Keystone context or GraphQL‑specific code,
 * making it easy to unit test and reuse.
 *
 * @param message - The message text to log.
 * @returns A confirmation string indicating the message was logged.
 *
 * ## Example:
 * ```ts
 * logMessageResolver("Hello!");
 * // => "Logged message: Hello!"
 * ```
 */
export function logMessageResolver(message: string): string {
  console.log(`📢 [logMessage] ${message}`);
  return `Logged message: ${message}`;
}