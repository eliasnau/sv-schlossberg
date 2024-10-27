/*
  Warnings:

  - Made the column `sportId` on table `AgeGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AgeGroup" DROP CONSTRAINT "AgeGroup_sportId_fkey";

-- AlterTable
ALTER TABLE "AgeGroup" ALTER COLUMN "sportId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "AgeGroup" ADD CONSTRAINT "AgeGroup_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
