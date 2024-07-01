/*
  Warnings:

  - You are about to drop the `StudentCourse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_studentId_fkey";

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "courseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "StudentCourse";

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
