/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `rooms_availability` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "rooms_availability_userId_hotelId_key";

-- CreateIndex
CREATE UNIQUE INDEX "rooms_availability_userId_key" ON "rooms_availability"("userId");
