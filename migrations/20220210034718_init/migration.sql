-- CreateTable
CREATE TABLE "Sound" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "url" TEXT NOT NULL,
    "discordGuildId" INTEGER NOT NULL,

    CONSTRAINT "Sound_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sound_url_key" ON "Sound"("url");
