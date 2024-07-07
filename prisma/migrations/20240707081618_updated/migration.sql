-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
