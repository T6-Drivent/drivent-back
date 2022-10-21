/*
  Warnings:

  - A unique constraint covering the columns `[pricingId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pricingId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "pricingId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Pricing" (
    "id" SERIAL NOT NULL,
    "online" INTEGER NOT NULL,
    "inPerson" INTEGER NOT NULL,
    "withHotel" INTEGER NOT NULL,
    "withoutHotel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_pricingId_key" ON "Event"("pricingId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "Pricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
