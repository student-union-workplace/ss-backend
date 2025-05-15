-- AlterTable
ALTER TABLE `files` ADD COLUMN `user_id` VARCHAR(190) NULL;

-- CreateIndex
CREATE INDEX `fk_files_user_id_idx` ON `files`(`user_id`);

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `FK_FILE_USER` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
