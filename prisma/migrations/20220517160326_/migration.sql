/*
  Warnings:

  - You are about to drop the `UserReviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserReviews" DROP CONSTRAINT "UserReviews_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "UserReviews" DROP CONSTRAINT "UserReviews_userId_fkey";

-- DropTable
DROP TABLE "UserReviews";
