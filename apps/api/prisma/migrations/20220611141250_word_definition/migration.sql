-- AlterTable
ALTER TABLE "Word" DROP COLUMN "definition";

-- CreateTable
CREATE TABLE "WordDefinition" (
    "id" VARCHAR(36) NOT NULL,
    "wordId" VARCHAR(36) NOT NULL,
    "definition" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WordDefinition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WordDefinition" ADD CONSTRAINT "WordDefinition_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
