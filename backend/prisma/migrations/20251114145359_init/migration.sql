-- CreateTable
CREATE TABLE `Favorites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `recipeId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `cookTime` VARCHAR(191) NOT NULL,
    `servings` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Favorites_userId_recipeId_key`(`userId`, `recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
