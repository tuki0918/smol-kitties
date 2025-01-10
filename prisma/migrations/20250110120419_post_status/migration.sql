-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('pending', 'published', 'private');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'pending';
