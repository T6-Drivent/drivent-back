/*
  Warnings:

  - Changed the type of `size` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL;

-- DropEnum
DROP TYPE "RoomSize";
