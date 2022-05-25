/*
  Warnings:

  - You are about to drop the `UserReviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ReviewToUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserReviews" DROP CONSTRAINT "UserReviews_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "UserReviews" DROP CONSTRAINT "UserReviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ReviewToUser" DROP CONSTRAINT "_ReviewToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReviewToUser" DROP CONSTRAINT "_ReviewToUser_B_fkey";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "UserReviews";

-- DropTable
DROP TABLE "_ReviewToUser";
