-- CreateTable
CREATE TABLE "Recordings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "class_type" TEXT NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "Recordings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recordings" ADD CONSTRAINT "Recordings_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
