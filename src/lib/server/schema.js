import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const roomsTable = sqliteTable("rooms", {
	id: text("id").primaryKey().notNull().unique().$defaultFn(nanoid),
	name: text("name").notNull(),
	description: text("description"),
	created: text("created").default(sql`CURRENT_TIMESTAMP`),
	updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
	// participants:text("participants")
	// host: text("host").notNull(),
	// topic:text("topic").notNull(),
});

export const roomsRelations = relations(roomsTable, ({ many }) => ({
	messages: many(messagesTable),
}));

export const messagesTable = sqliteTable("messages", {
	id: text("id").primaryKey().notNull().unique().$defaultFn(nanoid),
	body: text("body").notNull(),
	created: text("created").default(sql`CURRENT_TIMESTAMP`),
	updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
	roomId: text("room_id").references(() => roomsTable.id, { onDelete: "cascade" }),
});

export const messagesRelations = relations(messagesTable, ({ one }) => ({
	room: one(roomsTable, {
		fields: [messagesTable.roomId],
		references: [roomsTable.id],
	}),
}));
