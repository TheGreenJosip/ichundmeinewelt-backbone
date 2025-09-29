/**
 * @fileoverview Keystone storage configuration.
 * - Defines all asset storage adapters (local, S3, etc.).
 * - Keys here must match the `storage` property used in list fields.
 */

import path from 'path';
import { ENV } from './env';

export const storage = {
  /**
   * Local image storage
   * - Stores images in /public/images
   * - Serves them at `${ASSET_BASE_URL}/images/...`
   */
  local_images: {
    kind: 'local' as const,
    type: 'image' as const,
    generateUrl: (filePath: string) =>
      `${ENV.ASSET_BASE_URL}/images${filePath}`,
    serverRoute: {
      path: '/images',
    },
    storagePath: path.join(process.cwd(), 'public', 'images'),
  },

  /**
   * Example S3 storage (disabled by default)
   * - Uncomment and configure if you want to store files in S3 or compatible provider
   */
  // s3_files: {
  //   kind: 's3' as const,
  //   type: 'file' as const,
  //   bucketName: ENV.S3_BUCKET_NAME,
  //   region: ENV.S3_REGION,
  //   accessKeyId: ENV.S3_ACCESS_KEY_ID,
  //   secretAccessKey: ENV.S3_SECRET_ACCESS_KEY,
  //   endpoint: ENV.S3_ENDPOINT || undefined,
  //   signed: { expiry: 3600 }, // 1 hour signed URLs
  // },
};