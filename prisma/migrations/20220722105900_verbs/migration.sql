-- CreateTable
CREATE TABLE "Users" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "VerbsOnUsers" (
    "verbId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "VerbsOnUsers_pkey" PRIMARY KEY ("verbId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "VerbsOnUsers" ADD CONSTRAINT "VerbsOnUsers_verbId_fkey" FOREIGN KEY ("verbId") REFERENCES "Verbs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerbsOnUsers" ADD CONSTRAINT "VerbsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
