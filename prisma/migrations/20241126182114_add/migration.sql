-- CreateTable
CREATE TABLE "Partipant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tournamentId" INTEGER NOT NULL,

    CONSTRAINT "Partipant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Partipant" ADD CONSTRAINT "Partipant_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
