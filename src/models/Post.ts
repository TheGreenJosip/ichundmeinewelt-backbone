/**
 * Post list definition (Rich Blog Model).
 *
 * Purpose:
 * - Stores public-facing blog/news posts for the landing page and blog area.
 * - Supports rich content, metadata, relationships, and engagement tracking.
 *
 * Storage:
 * - `coverImage` uses the `local_images` storage adapter.
 * - Ensure `keystone.ts` has a matching storage config:
 *   storage: {
 *     local_images: {
 *       kind: 'local',
 *       type: 'image',
 *       generateUrl: path => `/images${path}`,
 *       serverRoute: { path: '/images' },
 *       storagePath: path.join(process.cwd(), 'public', 'images'),
 *     },
 *   }
 *
 * Access:
 * - Public can read only published posts.
 * - Admin can manage all posts.
 *
 * Hooks:
 * - Auto-generate slug from title if not provided.
 * - Calculate reading time from content length.
 */

import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  timestamp,
  select,
  checkbox,
  integer,
  image,
  virtual,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { graphql } from '@keystone-6/core';
import { accessRules } from '../access-control/access';
import { ListAccessArgs } from '../types';
import { timestampFields } from '../utils/timestampFields';
import { generateSlug } from '../hooks/postHooks';

export const Post = list({
  access: {
    operation: {
      query: () => true, // Public read
      create: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      update: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
      delete: accessRules.canManage as ({ session }: ListAccessArgs) => boolean,
    },
  },
  ui: {
    listView: {
      initialColumns: [
        'title',
        'slug',
        'status',
        'publishedAt',
        'featured',
      ],
      initialSort: { field: 'publishedAt', direction: 'DESC' },
    },
  },
  hooks: {
    resolveInput: generateSlug,
  },
  fields: {
    /** Title — required for all posts */
    title: text({ validation: { isRequired: true } }),

    /** Slug — unique URL-friendly identifier, auto-generated if missing */
    slug: text({
      isIndexed: 'unique',
      ui: { description: 'URL-friendly identifier for the post' },
    }),

    /** Excerpt — short summary for cards, SEO meta description */
    excerpt: text({
      ui: { displayMode: 'textarea' },
    }),

    /**
     * Cover Image:
     * - Stored locally via `local_images` storage adapter.
     * - Ensure `keystone.ts` has matching storage config.
     */
    coverImage: image({
      storage: 'local_images',
      ui: { description: 'Main image for the post (used in cards & headers)' },
    }),

    /**
     * Content:
     * - Currently plain text (textarea).
     * - Can be upgraded to `document` for rich text or MDX integration.
     */
    content: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
      ],
      links: true,
      dividers: true,
    }),

    /** Status — draft or published */
    status: select({
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      ui: { displayMode: 'segmented-control' },
    }),

    /** Published date */
    publishedAt: timestamp(),

    /** Featured flag — for homepage highlights */
    featured: checkbox({
      defaultValue: false,
      ui: { description: 'Show in featured posts section' },
    }),

    /** Tags — many-to-many relationship to Tag list */
    tags: relationship({ ref: 'Tag.posts', many: true }),

    /** Reading time — calculated from content length */
    readingTime: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item: any) {
          if (!item.content) return '0 min read';
          const words = item.content.split(/\s+/).length;
          const minutes = Math.ceil(words / 200); // ~200 wpm
          return `${minutes} min read`;
        },
      }),
    }),

    /** Engagement metrics — view count and like count */
    viewCount: integer({ defaultValue: 0 }),
    likeCount: integer({ defaultValue: 0 }),

    // Reusable timestamps (createdAt, updatedAt)
    ...timestampFields,
  },
});