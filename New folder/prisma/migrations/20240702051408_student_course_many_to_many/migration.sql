/*
  Warnings:

  - You are about to drop the column `instructorId` on the `SubmittedAssignments` table. All the data in the column will be lost.
  - Added the required column `moduleId` to the `SubmittedAssignments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubmittedAssignments" DROP CONSTRAINT "SubmittedAssignments_instructorId_fkey";

-- AlterTable
ALTER TABLE "SubmittedAssignments" DROP COLUMN "instructorId",
ADD COLUMN     "moduleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SubmittedAssignments" ADD CONSTRAINT "SubmittedAssignments_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
