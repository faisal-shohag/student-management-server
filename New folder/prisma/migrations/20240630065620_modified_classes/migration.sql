/*
  Warnings:

  - You are about to drop the column `instructorId` on the `Classes` table. All the data in the column will be lost.
  - Added the required column `batch` to the `Classes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_instructorId_fkey";

-- AlterTable
ALTER TABLE "Classes" DROP COLUMN "instructorId",
ADD COLUMN     "batch" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Ongoing';

-- AlterTable
ALTER TABLE "Instructors" ADD COLUMN     "additional_info" JSONB,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "SubmittedAssignments" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
