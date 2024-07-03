/*
  Warnings:

  - A unique constraint covering the columns `[studentId,moduleId,assignmentId]` on the table `SubmittedAssignments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SubmittedAssignments_studentId_moduleId_assignmentId_key" ON "SubmittedAssignments"("studentId", "moduleId", "assignmentId");
