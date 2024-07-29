import {Hono} from "hono";
import {AppContext} from "../utils";
import {drizzle} from "drizzle-orm/d1";
import {tasks} from "../db/schema";

export const all = new Hono<AppContext>();

all.get("/", async (c) => {
  const db = drizzle(c.env.DB);
  const results = await db.select().from(tasks).all();
  return c.json(results);
});
