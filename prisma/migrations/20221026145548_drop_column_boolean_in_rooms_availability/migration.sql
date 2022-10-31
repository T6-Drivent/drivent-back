/*
  Warnings:

  - You are about to drop the column `status` on the `rooms_availability` table. All the data in the column will be lost.
  - Added the required column `commodations` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `size` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `rooms_availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "commodations" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "size",
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rooms_availability" DROP COLUMN "status",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "rooms_availability" ADD CONSTRAINT "rooms_availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
