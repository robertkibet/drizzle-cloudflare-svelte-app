import {Hono} from "hono";
import {AppContext} from "../utils";
import {drizzle} from "drizzle-orm/d1";
import {tasks} from "../db/schema";
import {eq, or, sql} from "drizzle-orm";

export const search = new Hono<AppContext>();

// Search tasks by any column entry using regex
search.get("/", async (c) => {
  const db = drizzle(c.env.DB);
  const body = await c.req.json();
  const {query} = body;

  const likeQuery = `%${query}%`;

  // Execute the raw SQL query
  const {results} = await db.run(sql`
      SELECT * FROM ${tasks}
      WHERE ${tasks.id} LIKE ${likeQuery}
      OR ${tasks.title} LIKE ${likeQuery}
      OR ${tasks.content} LIKE ${likeQuery}
      OR ${tasks.completed} LIKE ${likeQuery}
    `);

  return c.json(results);
});
