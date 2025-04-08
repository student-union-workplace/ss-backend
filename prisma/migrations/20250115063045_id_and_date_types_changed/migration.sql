-- CreateTable
CREATE TABLE `departments` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(190) NULL,
    `head_user_id` VARCHAR(190) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `fk_dep_headuser_idx`(`head_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `deadline` DATETIME(0) NULL,
    `type` ENUM('deadline', 'event', 'activity', 'task') NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,
    `event_id` VARCHAR(190) NULL,
    `task_id` VARCHAR(190) NULL,
    `activity_id` VARCHAR(190) NULL,
    `user_id` VARCHAR(190) NULL,

    INDEX `fk_event_id_idx`(`event_id`),
    INDEX `fk_notact_idx`(`activity_id`),
    INDEX `fk_nottask_idx`(`task_id`),
    INDEX `fk_notuser_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(190) NULL,
    `phone_number` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,
    `vk_link` VARCHAR(255) NULL,
    `tg_link` VARCHAR(255) NULL,
    `avatar_path` VARCHAR(255) NULL,
    `role` ENUM('admin', 'member', 'old') NULL DEFAULT 'old',
    `password` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,
    `department_id` VARCHAR(190) NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `department_id_idx`(`department_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activities` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `is_completed` BOOLEAN NULL DEFAULT false,
    `date` DATETIME(0) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,
    `location_id` VARCHAR(190) NULL,
    `created_by_user_id` VARCHAR(190) NULL,

    INDEX `FK_ACTIVITY_CREATED_BY_USER`(`created_by_user_id`),
    INDEX `FK_ACTIVITY_LOCATION`(`location_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(190) NULL,
    `description` VARCHAR(255) NULL,
    `date` DATETIME(0) NULL,
    `is_archived` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,
    `past _event_id` VARCHAR(190) NULL,
    `theme_id` VARCHAR(190) NULL,

    INDEX `fk_past _event_id_idx`(`past _event_id`),
    INDEX `fk_theme_id_idx`(`theme_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events_locations` (
    `id` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(190) NULL,
    `location_id` VARCHAR(190) NULL,

    INDEX `fk_evloc_idx`(`event_id`),
    INDEX `fk_locev_idx`(`location_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events_managers` (
    `id` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(190) NULL,
    `user_id` VARCHAR(190) NULL,

    INDEX `fk_evman_idx`(`event_id`),
    INDEX `fk_manev_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events_users` (
    `id` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(190) NULL,
    `user_id` VARCHAR(190) NULL,

    INDEX `fk_evuser_idx`(`event_id`),
    INDEX `fk_userev_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_users` (
    `id` VARCHAR(191) NOT NULL,
    `activity_id` VARCHAR(190) NULL,
    `user_id` VARCHAR(190) NULL,

    INDEX `FK_ACTIVITY_USER_CONNECTION`(`activity_id`),
    INDEX `FK_USER_ACTIVITY_CONNECTION`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `files` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(190) NULL,
    `path` VARCHAR(250) NULL,
    `size` INTEGER NULL,
    `date` DATETIME(0) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,
    `created_by_user_id` VARCHAR(190) NULL,
    `event_id` VARCHAR(190) NULL,

    INDEX `fk_created_by_user_id_idx`(`created_by_user_id`),
    INDEX `fk_event_id_idx`(`event_id`),
    INDEX `fk_eventfile_id_idx`(`event_id`),
    INDEX `fk_user_id_idx`(`created_by_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `id` VARCHAR(191) NOT NULL,
    `priority` TINYINT NULL DEFAULT 3,
    `description` VARCHAR(255) NULL,
    `deadline` DATETIME(0) NULL,
    `status` ENUM('open', 'at_work', 'review', 'closed') NULL DEFAULT 'open',
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,
    `event_id` VARCHAR(190) NULL,
    `user_id` VARCHAR(190) NULL,

    INDEX `FK_EVENT_TASK`(`event_id`),
    INDEX `FK_USER_TASK`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `themes` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `FK_HEAD_USER_DEPARTMENT` FOREIGN KEY (`head_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `FK_ACTIVITY_NOTIFICATION` FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `FK_EVENT_NOTIFICATION` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `FK_TASK_NOTIFICATION` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `FK_USER_NOTIFICATION` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `FK_USER_DEPARTMENT` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `FK_ACTIVITY_CREATED_BY_USER` FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `FK_ACTIVITY_LOCATION` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `FK_EVENT_THEME` FOREIGN KEY (`theme_id`) REFERENCES `themes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `FK_PREVIOUS_EVENT` FOREIGN KEY (`past _event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events_locations` ADD CONSTRAINT `FK_EVENT_LOCATION` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events_locations` ADD CONSTRAINT `FK_LOCATION_EVENT` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events_managers` ADD CONSTRAINT `FK_EVENT_MANAGER` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events_managers` ADD CONSTRAINT `FK_MANAGER_EVENT` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events_users` ADD CONSTRAINT `FK_EVENT_USER_CONNECTION` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events_users` ADD CONSTRAINT `FK_USER_EVENT_CONNECTION` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `activity_users` ADD CONSTRAINT `fk_activuser` FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `activity_users` ADD CONSTRAINT `fk_useractiv` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `FK_EVENT_FILE` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `FK_FILE_CREATED_BY_USER` FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `FK_EVENT_TASK` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `FK_USER_TASK` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
