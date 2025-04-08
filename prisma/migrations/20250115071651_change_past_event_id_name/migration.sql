/*
  Warnings:

  - You are about to drop the column `past _event_id` on the `events` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `FK_PREVIOUS_EVENT`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `past _event_id`,
    ADD COLUMN `past_event_id` VARCHAR(190) NULL;

-- CreateIndex
CREATE INDEX `fk_past_event_id_idx` ON `events`(`past_event_id`);

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `FK_PREVIOUS_EVENT` FOREIGN KEY (`past_event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
