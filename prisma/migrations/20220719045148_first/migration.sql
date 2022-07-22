-- CreateTable
CREATE TABLE "Verbs" (
    "id" SERIAL NOT NULL,
    "verb" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "regularType" TEXT NOT NULL,
    "eng" TEXT NOT NULL,
    "exp" TEXT NOT NULL,

    CONSTRAINT "Verbs_pkey" PRIMARY KEY ("id")
);
