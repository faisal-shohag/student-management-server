/*
  Warnings:

  - Added the required column `study_plan` to the `Modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "status" SET DEFAULT 'ongoing';

-- AlterTable
ALTER TABLE "Modules" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ongoing',
ADD COLUMN     "study_plan" TEXT NOT NULL,
ALTER COLUMN "days" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
