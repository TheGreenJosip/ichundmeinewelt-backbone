// src/graphql/resolvers/logMessageResolver.ts
export function logMessageResolver(message: string): string {
  console.log(`📢 [logMessage] ${message}`);
  return `Logged message: ${message}`;
}