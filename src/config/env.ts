/**
 * @fileoverview Centralised environment variable loader.
 * - Loads .env variables once using dotenv.
 * - Chooses file based on NODE_ENV.
 * - Exports typed constants for use across the backbone.
 */

import dotenv from 'dotenv';
import path from 'path';

// Decide which env file to load
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.prod' : '.env';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  ASSET_BASE_URL: process.env.ASSET_BASE_URL || 'http://localhost:3000',

  DATABASE_URL: process.env.DATABASE_URL || '',
  BACKEND_PORT: Number(process.env.BACKEND_PORT) || 3000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4000',

  // Optional S3 config
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || '',
  S3_REGION: process.env.S3_REGION || '',
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || '',
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || '',
  S3_ENDPOINT: process.env.S3_ENDPOINT || '',
};