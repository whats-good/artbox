-- Enable CITEXT
CREATE EXTENSION IF NOT EXISTS citext;

-- CreateTable
CREATE TABLE "ChainAccount" (
    "address" CITEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChainAccount_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "SmartContract" (
    "address" CITEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "symbol" TEXT,
    "decimals" INTEGER,
    "description" TEXT,

    CONSTRAINT "SmartContract_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tokenId" CITEXT NOT NULL,
    "contractAddress" CITEXT NOT NULL,
    "ownerAddress" CITEXT NOT NULL,
    "imageURL" TEXT,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_tokenId_contractAddress_key" ON "Token"("tokenId", "contractAddress");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_contractAddress_fkey" FOREIGN KEY ("contractAddress") REFERENCES "SmartContract"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_ownerAddress_fkey" FOREIGN KEY ("ownerAddress") REFERENCES "ChainAccount"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
