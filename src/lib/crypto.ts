
'use server';

import { createHash } from 'crypto';

/**
 * Hashes a password using SHA-256.
 * @param password The password to hash.
 * @returns The hexadecimal representation of the hash.
 */
export function hashPassword(password: string): string {
  const sha256 = createHash('sha256');
  sha256.update(password);
  return sha256.digest('hex');
}
