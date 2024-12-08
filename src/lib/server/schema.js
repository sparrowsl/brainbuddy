import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const usersTable = sqliteTable("users", {
	id: text().primaryKey().unique().$defaultFn(nanoid),
	name: text().notNull(),
	username: text().notNull().unique(),
	email: text().unique(),
	password: text().notNull(),
	created: text()
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updated: text().default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
	messages: many(messagesTable),
}));

export const topicsTable = sqliteTable("topics", {
	id: text().primaryKey().unique().$defaultFn(nanoid),
	name: text().notNull(),
	created: text()
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updated: text().default(sql`CURRENT_TIMESTAMP`),
});

export const topicsRelations = relations(topicsTable, ({ many }) => ({
	rooms: many(roomsTable),
}));

export const roomsTable = sqliteTable("rooms", {
	id: text().primaryKey().unique().$defaultFn(nanoid),
	name: text().notNull(),
	description: text(),
	created: text().default(sql`CURRENT_TIMESTAMP`),
	updated: text().default(sql`CURRENT_TIMESTAMP`),
	// participants:text("participants")
	host: text().references(() => usersTable.id, { onDelete: "set null" }),
	topicId: text("topic_id").references(() => topicsTable.id, {
		onDelete: "set null",
	}),
});

export const roomsRelations = relations(roomsTable, ({ many, one }) => ({
	messages: many(messagesTable),

	topic: one(topicsTable, {
		fields: [roomsTable.topicId],
		references: [topicsTable.id],
	}),

	host: one(usersTable, {
		fields: [roomsTable.host],
		references: [usersTable.id],
	}),
}));

export const messagesTable = sqliteTable("messages", {
	id: text().primaryKey().notNull().unique().$defaultFn(nanoid),
	body: text().notNull(),
	created: text().default(sql`CURRENT_TIMESTAMP`),
	updated: text().default(sql`CURRENT_TIMESTAMP`),
	roomId: text("room_id").references(() => roomsTable.id, {
		onDelete: "cascade",
	}),
	userId: text("user_id").references(() => usersTable.id, {
		onDelete: "cascade",
	}),
});

export const messagesRelations = relations(messagesTable, ({ one }) => ({
	room: one(roomsTable, {
		fields: [messagesTable.roomId],
		references: [roomsTable.id],
	}),

	user: one(usersTable, {
		fields: [messagesTable.userId],
		references: [usersTable.id],
	}),
}));
