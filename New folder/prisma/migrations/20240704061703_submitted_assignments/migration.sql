-- AlterTable
ALTER TABLE "SubmittedAssignments" ADD COLUMN     "class_performance_marks" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "homework_marks" DOUBLE PRECISION NOT NULL DEFAULT 0;
