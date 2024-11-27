/*
  Warnings:

  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `phone_number` VARCHAR(20) NULL,
    ADD COLUMN `role` ENUM('admin', 'member', 'old') NOT NULL,
    ADD COLUMN `tg_link` VARCHAR(255) NULL,
    ADD COLUMN `vk_link` VARCHAR(255) NULL;
