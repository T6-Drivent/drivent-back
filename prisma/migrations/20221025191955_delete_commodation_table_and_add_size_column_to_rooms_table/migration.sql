/*
  Warnings:

  - You are about to drop the column `commodationId` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the `commodations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `size` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomSize" AS ENUM ('Single', 'Double', 'Triple');

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_commodationId_fkey";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "commodationId",
ADD COLUMN     "size" "RoomSize" NOT NULL;

-- DropTable
DROP TABLE "commodations";

-- DropEnum
DROP TYPE "CommodationType";
