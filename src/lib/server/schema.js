import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const usersTable = sqliteTable("users", {
	id: text("id").primaryKey().notNull().unique().$defaultFn(nanoid),
	name: text("name").notNull(),
	username: text("username").notNull().unique(),
	email: text("email"),
	password: text("password").notNull(),
	created: text("created").default(sql`CURRENT_TIMESTAMP`),
	updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
	messages: many(messagesTable),
}));

export const topicsTable = sqliteTable("topics", {
	id: text("id").primaryKey().notNull().unique().$defaultFn(nanoid),
	name: text("name").notNull(),
	created: text("created").default(sql`CURRENT_TIMESTAMP`),
	updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
});

export const topicsRelations = relations(topicsTable, ({ many }) => ({
	rooms: many(roomsTable),
}));

export const roomsTable = sqliteTable("rooms", {
	id: text("id").primaryKey().notNull().unique().$defaultFn(nanoid),
	name: text("name").notNull(),
	description: text("description"),
	created: text("created").default(sql`CURRENT_TIMESTAMP`),
	updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
	// participants:text("participants")
	host: text("host").references(() => usersTable.id, { onDelete: "set null" }),
	topicId: text("topic_id").references(() => topicsTable.id, { onDelete: "set null" }),
});

export const roomsRelations = relations(roomsTable, ({ many, one }) => ({
	messages: many(messagesTable),
	topic: one(topicsTable, {
		fields: [roomsTable.topicId],
		references: [topicsTable.id],
	}),
}));

export const messagesTable = sqliteTable("messages", {
	id: text("id").primaryKey().notNull().unique().$defaultFn(nanoid),
	body: text("body").notNull(),
	created: text("created").default(sql`CURRENT_TIMESTAMP`),
	updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
	roomId: text("room_id").references(() => roomsTable.id, { onDelete: "cascade" }),
	userId: text("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
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
