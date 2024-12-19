/*
  Warnings:

  - You are about to drop the column `endDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `storyPoints` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "endDate",
DROP COLUMN "priority",
DROP COLUMN "startDate",
DROP COLUMN "storyPoints";
