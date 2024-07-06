/*
  Warnings:

  - You are about to drop the column `batch` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `photoURL` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Modules` table. All the data in the column will be lost.
  - Added the required column `moduleId` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Modules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Modules" DROP CONSTRAINT "Modules_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentClass" DROP CONSTRAINT "StudentClass_classId_fkey";

-- AlterTable
ALTER TABLE "Classes" DROP COLUMN "batch",
DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "photoURL",
DROP COLUMN "status",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "moduleId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Modules" DROP COLUMN "classId",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "photoURL" TEXT,
    "description" TEXT,
    "batch" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Ongoing',

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentClass" ADD CONSTRAINT "StudentClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
