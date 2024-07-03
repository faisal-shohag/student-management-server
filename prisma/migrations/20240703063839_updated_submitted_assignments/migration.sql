/*
  Warnings:

  - Added the required column `assignmentId` to the `SubmittedAssignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubmittedAssignments" ADD COLUMN     "assignmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SubmittedAssignments" ADD CONSTRAINT "SubmittedAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
