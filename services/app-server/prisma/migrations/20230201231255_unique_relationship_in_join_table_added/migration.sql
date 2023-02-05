/*
  Warnings:

  - A unique constraint covering the columns `[userId,smartContractId]` on the table `UserOnContract` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserOnContract_userId_smartContractId_key" ON "UserOnContract"("userId", "smartContractId");
