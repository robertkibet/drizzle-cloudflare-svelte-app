import {text, sqliteTable} from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: text("id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  completed: text("completed").notNull(),
});

export const demo = sqliteTable("demo", {
  title: text("title").notNull(),
  content: text("content").notNull(),
});
