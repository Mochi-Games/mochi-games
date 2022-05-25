/*
  Warnings:

  - You are about to drop the column `username` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_username_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "username",
ADD COLUMN     "favorite" BOOLEAN,
ADD COLUMN     "played" BOOLEAN;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
