/*
  Warnings:

  - You are about to drop the column `sportId` on the `TrainingPlan` table. All the data in the column will be lost.
  - You are about to drop the column `sportId` on the `TrainingTime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainingPlan" DROP CONSTRAINT "TrainingPlan_sportId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingTime" DROP CONSTRAINT "TrainingTime_sportId_fkey";

-- AlterTable
ALTER TABLE "TrainingPlan" DROP COLUMN "sportId";

-- AlterTable
ALTER TABLE "TrainingTime" DROP COLUMN "sportId";
