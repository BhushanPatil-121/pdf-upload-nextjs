/*
  Warnings:

  - You are about to drop the column `size` on the `pdfTable` table. All the data in the column will be lost.
  - Added the required column `fileSize` to the `pdfTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pdfTable" DROP COLUMN "size",
ADD COLUMN     "fileSize" TEXT NOT NULL;
