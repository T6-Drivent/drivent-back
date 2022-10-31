/*
  Warnings:

  - A unique constraint covering the columns `[userId,hotelId]` on the table `rooms_availability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hotelId` to the `rooms_availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms_availability" ADD COLUMN     "hotelId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rooms_availability_userId_hotelId_key" ON "rooms_availability"("userId", "hotelId");

-- AddForeignKey
ALTER TABLE "rooms_availability" ADD CONSTRAINT "rooms_availability_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
