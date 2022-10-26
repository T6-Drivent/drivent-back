/*
  Warnings:

  - You are about to drop the `rooms_availablity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "rooms_availablity" DROP CONSTRAINT "rooms_availablity_roomId_fkey";

-- DropTable
DROP TABLE "rooms_availablity";

-- CreateTable
CREATE TABLE "rooms_availability" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_availability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rooms_availability" ADD CONSTRAINT "rooms_availability_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
