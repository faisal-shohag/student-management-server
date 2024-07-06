-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "batch" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
