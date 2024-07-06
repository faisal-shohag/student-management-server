/*
  Warnings:

  - Added the required column `courseId` to the `Assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignments" ADD COLUMN     "courseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
