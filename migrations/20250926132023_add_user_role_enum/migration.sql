/*
  Warnings:

  - The `content` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRoleType" NOT NULL DEFAULT 'user';
