-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountVerification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `attempt` INTEGER NULL,
    `ip` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL,
    `verifiedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordReset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `attempt` INTEGER NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL,
    `codeVerified` BOOLEAN NOT NULL DEFAULT false,
    `codeVerifiedAt` DATETIME(3) NULL,
    `reset` BOOLEAN NOT NULL DEFAULT false,
    `resetAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NULL,
    `active` BOOLEAN NULL,
    `createdAt` DATETIME(3) NULL,
    `verifiedAt` DATETIME(3) NULL,
    `signupMethod` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidat` (
    `idCandidat` INTEGER NOT NULL AUTO_INCREMENT,
    `nomCandidat` VARCHAR(191) NOT NULL,
    `prenomCandidat` VARCHAR(191) NOT NULL,
    `adresCandidat` VARCHAR(191) NOT NULL,
    `telCandidat` VARCHAR(191) NOT NULL,
    `emailCandidat` VARCHAR(191) NOT NULL,
    `experienceCandidat` VARCHAR(191) NOT NULL,
    `nivEtudesCandidat` VARCHAR(191) NOT NULL,
    `competencesCandidat` VARCHAR(191) NOT NULL,
    `cVCandidat` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Candidat_emailCandidat_key`(`emailCandidat`),
    PRIMARY KEY (`idCandidat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrat` (
    `idContrat` INTEGER NOT NULL AUTO_INCREMENT,
    `entrepriseId` INTEGER NOT NULL,
    `freelancerId` INTEGER NOT NULL,
    `titreProjContrat` VARCHAR(191) NOT NULL,
    `datDebConrat` DATETIME(3) NOT NULL,
    `datFinConrat` DATETIME(3) NOT NULL,
    `coutContrat` INTEGER NOT NULL,
    `descripContrat` VARCHAR(191) NOT NULL,
    `statutContrat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idContrat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entreprise` (
    `idEntreprise` INTEGER NOT NULL AUTO_INCREMENT,
    `nomEntreprise` VARCHAR(191) NOT NULL,
    `adresEntreprise` VARCHAR(191) NOT NULL,
    `contactEntreprise` VARCHAR(191) NOT NULL,
    `emailEntreprise` VARCHAR(191) NOT NULL,
    `sectActivEntreprise` VARCHAR(191) NOT NULL,
    `tailleEntreprise` VARCHAR(191) NOT NULL,
    `logoEntreprise` VARCHAR(191) NOT NULL,
    `descripEntreprise` VARCHAR(191) NOT NULL,
    `siteWebEntreprise` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idEntreprise`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entretien` (
    `idEntretien` INTEGER NOT NULL AUTO_INCREMENT,
    `entrepriseId` INTEGER NOT NULL,
    `candidatId` INTEGER NOT NULL,
    `dateEntretien` DATETIME(3) NOT NULL,
    `adresEntretien` VARCHAR(191) NOT NULL,
    `recruEntretien` VARCHAR(191) NOT NULL,
    `typeEntretien` VARCHAR(191) NOT NULL,
    `descripEntreprise` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idEntretien`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Freelancer` (
    `idFreelancer` INTEGER NOT NULL AUTO_INCREMENT,
    `nomFreelancer` VARCHAR(191) NOT NULL,
    `prenomFreelancer` VARCHAR(191) NOT NULL,
    `adresFreelancer` VARCHAR(191) NOT NULL,
    `TelFreelancer` VARCHAR(191) NOT NULL,
    `emailFreelancer` VARCHAR(191) NOT NULL,
    `competencesFreelancer` VARCHAR(191) NOT NULL,
    `experienceFreelancer` VARCHAR(191) NOT NULL,
    `portfolioFreelancer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idFreelancer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `idNote` INTEGER NOT NULL AUTO_INCREMENT,
    `entrepriseId` INTEGER NOT NULL,
    `candidatId` INTEGER NOT NULL,
    `Note` DECIMAL(65, 30) NOT NULL,
    `commentNote` VARCHAR(191) NOT NULL,
    `dateNote` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idNote`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OffreEmploi` (
    `idOffreEmploi` INTEGER NOT NULL AUTO_INCREMENT,
    `entrepriseId` INTEGER NOT NULL,
    `titreOffreEmploi` VARCHAR(191) NOT NULL,
    `descripOffreEmploi` VARCHAR(191) NOT NULL,
    `localiOffreEmploi` VARCHAR(191) NOT NULL,
    `datePubliOffreEmploi` DATETIME(3) NOT NULL,
    `datelimitOffreEmploi` DATETIME(3) NOT NULL,
    `salaireOffreEmploi` INTEGER NOT NULL,
    `typeContOffreEmploi` VARCHAR(191) NOT NULL,
    `experienceOffreEmploi` VARCHAR(191) NOT NULL,
    `nivEtuOffreEmploi` VARCHAR(191) NOT NULL,
    `competencesOffreEmploi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idOffreEmploi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projet` (
    `idProjet` INTEGER NOT NULL AUTO_INCREMENT,
    `entrepriseId` INTEGER NOT NULL,
    `titreProjet` VARCHAR(191) NOT NULL,
    `descripProjet` VARCHAR(191) NOT NULL,
    `BudgetProjet` INTEGER NOT NULL,
    `DelaiProjet` INTEGER NOT NULL,

    PRIMARY KEY (`idProjet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proposition` (
    `idProposition` INTEGER NOT NULL AUTO_INCREMENT,
    `projetId` INTEGER NOT NULL,
    `freelancerId` INTEGER NOT NULL,
    `delaiProposition` INTEGER NOT NULL,
    `descripProposition` VARCHAR(191) NOT NULL,
    `coutProposition` INTEGER NOT NULL,
    `competenceProposition` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idProposition`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat` ADD CONSTRAINT `Contrat_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `Entreprise`(`idEntreprise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat` ADD CONSTRAINT `Contrat_freelancerId_fkey` FOREIGN KEY (`freelancerId`) REFERENCES `Freelancer`(`idFreelancer`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretien` ADD CONSTRAINT `Entretien_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `Entreprise`(`idEntreprise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entretien` ADD CONSTRAINT `Entretien_candidatId_fkey` FOREIGN KEY (`candidatId`) REFERENCES `Candidat`(`idCandidat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `Entreprise`(`idEntreprise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_candidatId_fkey` FOREIGN KEY (`candidatId`) REFERENCES `Candidat`(`idCandidat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OffreEmploi` ADD CONSTRAINT `OffreEmploi_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `Entreprise`(`idEntreprise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projet` ADD CONSTRAINT `Projet_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `Entreprise`(`idEntreprise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposition` ADD CONSTRAINT `Proposition_projetId_fkey` FOREIGN KEY (`projetId`) REFERENCES `Projet`(`idProjet`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposition` ADD CONSTRAINT `Proposition_freelancerId_fkey` FOREIGN KEY (`freelancerId`) REFERENCES `Freelancer`(`idFreelancer`) ON DELETE RESTRICT ON UPDATE CASCADE;
