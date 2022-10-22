/*
  Warnings:

  - Added the required column `charge` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registrations" ADD COLUMN     "charge" INTEGER NOT NULL;
