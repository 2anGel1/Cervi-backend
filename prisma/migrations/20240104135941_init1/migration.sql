/*
  Warnings:

  - You are about to drop the column `emailCandidat` on the `Candidat` table. All the data in the column will be lost.
  - You are about to drop the column `nomCandidat` on the `Candidat` table. All the data in the column will be lost.
  - You are about to drop the column `prenomCandidat` on the `Candidat` table. All the data in the column will be lost.
  - You are about to drop the column `telCandidat` on the `Candidat` table. All the data in the column will be lost.
  - You are about to drop the column `emailEntreprise` on the `Entreprise` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Candidat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Entreprise` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Candidat_emailCandidat_key` ON `Candidat`;

-- AlterTable
ALTER TABLE `AccountVerification` ADD COLUMN `accountType` VARCHAR(191) NOT NULL DEFAULT 'CANDIDAT';

-- AlterTable
ALTER TABLE `Candidat` DROP COLUMN `emailCandidat`,
    DROP COLUMN `nomCandidat`,
    DROP COLUMN `prenomCandidat`,
    DROP COLUMN `telCandidat`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `adresCandidat` VARCHAR(191) NULL,
    MODIFY `experienceCandidat` VARCHAR(191) NULL,
    MODIFY `nivEtudesCandidat` VARCHAR(191) NULL,
    MODIFY `competencesCandidat` VARCHAR(191) NULL,
    MODIFY `cVCandidat` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Entreprise` DROP COLUMN `emailEntreprise`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `nomEntreprise` VARCHAR(191) NULL,
    MODIFY `adresEntreprise` VARCHAR(191) NULL,
    MODIFY `contactEntreprise` VARCHAR(191) NULL,
    MODIFY `sectActivEntreprise` VARCHAR(191) NULL,
    MODIFY `tailleEntreprise` VARCHAR(191) NULL,
    MODIFY `logoEntreprise` VARCHAR(191) NULL,
    MODIFY `descripEntreprise` VARCHAR(191) NULL,
    MODIFY `siteWebEntreprise` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Candidat` ADD CONSTRAINT `Candidat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entreprise` ADD CONSTRAINT `Entreprise_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
