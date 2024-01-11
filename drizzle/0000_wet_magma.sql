CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created` text DEFAULT CURRENT_TIMESTAMP,
	`updated` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_id_unique` ON `rooms` (`id`);