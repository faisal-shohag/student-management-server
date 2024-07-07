-- DropForeignKey
ALTER TABLE "StudentCourses" DROP CONSTRAINT "StudentCourses_studentId_fkey";

-- AddForeignKey
ALTER TABLE "StudentCourses" ADD CONSTRAINT "StudentCourses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
