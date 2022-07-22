/*
  Warnings:

  - Added the required column `level` to the `Verbs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Verbs" ADD COLUMN     "level" TEXT NOT NULL;
