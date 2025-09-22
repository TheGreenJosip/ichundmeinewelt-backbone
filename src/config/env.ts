/**
 * @fileoverview Centralised environment variable loader.
 * - Loads .env variables once using dotenv.
 * - Provides typed constants with sensible defaults.
 */

import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  ASSET_BASE_URL: process.env.ASSET_BASE_URL || 'http://localhost:3000',

  // Optional S3 config
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || '',
  S3_REGION: process.env.S3_REGION || '',
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || '',
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || '',
  S3_ENDPOINT: process.env.S3_ENDPOINT || '',
};