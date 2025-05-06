-- AlterTable
ALTER TABLE `files` ADD COLUMN `google_file_id` VARCHAR(190) NULL,
    ADD COLUMN `type` ENUM('doc', 'sheet', 'other') NULL DEFAULT 'other';
