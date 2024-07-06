/*
  Warnings:

  - A unique constraint covering the columns `[studentId,moduleId]` on the table `SubmittedAssignments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SubmittedAssignments_studentId_moduleId_assignmentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "SubmittedAssignments_studentId_moduleId_key" ON "SubmittedAssignments"("studentId", "moduleId");
