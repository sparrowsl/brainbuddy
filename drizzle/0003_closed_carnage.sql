CREATE INDEX `room_id_idx` ON `messages` (`room_id`);--> statement-breakpoint
CREATE INDEX `host_idx` ON `rooms` (`host`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `users` (`username`);