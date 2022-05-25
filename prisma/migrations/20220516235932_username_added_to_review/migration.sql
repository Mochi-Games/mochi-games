-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "username" TEXT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
