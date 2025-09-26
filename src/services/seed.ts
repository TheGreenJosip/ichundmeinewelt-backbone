/**
 * Prisma seed script for Keystone.js
 * Creates an initial admin user if none exists.
 *
 * Security:
 * - Reads credentials from .env (never hardcode in code)
 * - Only runs on empty DB or missing admin
 * - Password is hashed via Keystone's built-in auth logic
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

    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (existingAdmin) {
        console.log(`✅ Admin user already exists: ${adminEmail}`);
        return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin
    await prisma.user.create({
        data: {
            email: adminEmail,
            password: hashedPassword,
            name: adminName,
            role: Roles.Admin, // ✅ use enum value
        },
    });

    console.log(`✨ Admin user created: ${adminEmail}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });