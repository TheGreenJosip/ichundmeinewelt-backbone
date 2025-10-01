/**
 * Prisma seed script for Keystone.js
 *
 * Purpose:
 * - Creates an initial admin user if none exists.
 * - Seeds default categories for the blog.
 * - Seeds some default tags for filtering.
 * - Seeds a template post linked to the admin user, a category, and tags.
 *
 * Security:
 * - Reads credentials from .env (never hardcode in code)
 * - Only runs on empty DB or missing admin
 * - Password is hashed via bcrypt
 *
 * Notes:
 * - Uses `upsert` for categories/tags to avoid duplicates if run multiple times.
 * - Uses `create` + `update` for posts to allow relationship connections
 *   (Prisma `createMany` does not support nested writes).
 */

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { Roles } from '../access-control/role.enum';

dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.INIT_ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.INIT_ADMIN_PASSWORD || 'change-me';
    const adminName = process.env.INIT_ADMIN_NAME || 'Admin';

    // 1️⃣ Ensure admin user exists
    let adminUser = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!adminUser) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        adminUser = await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: adminName,
                role: Roles.Admin,
            },
        });
        console.log(`✨ Admin user created: ${adminEmail}`);
    } else {
        console.log(`✅ Admin user already exists: ${adminEmail}`);
    }

    // 2️⃣ Seed default categories
    const categoryNames = ['Tech', 'Guides', 'News'];
    const categories = [];
    for (const name of categoryNames) {
        const category = await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        categories.push(category);
    }
    console.log(`📂 Categories seeded: ${categories.map(c => c.name).join(', ')}`);

    // 3️⃣ Seed some tags
    const tagNames = ['Next.js', 'Keystone', 'Productivity', 'Smarthome'];
    const tags = [];
    for (const name of tagNames) {
        const tag = await prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        tags.push(tag);
    }
    console.log(`🏷️ Tags seeded: ${tags.map(t => t.name).join(', ')}`);

    // 4️⃣ Seed a template post if none exist
    const existingPosts = await prisma.post.count();
    if (existingPosts === 0) {
        // Create base post without relationships
        const createdPost = await prisma.post.create({
            data: {
                title: 'Welcome to My Blog',
                slug: 'welcome-to-my-blog',
                excerpt:
                    'This is the first post on my new blog powered by Keystone.js and Next.js.',
                status: 'published',
                publishedAt: new Date(),
                featured: true,
                isPinned: true,
                coverImageAlt: 'Laptop on desk with code editor open',
            },
        });

        // Connect relationships in a second step
        await prisma.post.update({
            where: { id: createdPost.id },
            data: {
                author: { connect: { id: adminUser.id } },
                category: { connect: { id: categories[0].id } }, // "Tech"
                tags: { connect: tags.slice(0, 2).map(t => ({ id: t.id })) }, // First two tags
            },
        });

        console.log(`📝 Template post created: Welcome to My Blog`);
    } else {
        console.log(`✅ Posts already exist, skipping template creation`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });