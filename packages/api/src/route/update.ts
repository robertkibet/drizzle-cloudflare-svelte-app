import {Hono} from "hono";
import {AppContext} from "../utils";
import {drizzle} from "drizzle-orm/d1";
import {tasks} from "../db/schema";
import {eq} from "drizzle-orm";
// import {assert} from "superstruct";

export const update = new Hono<AppContext>();

// Update a task by ID
update.put("/", async (c) => {
  const db = drizzle(c.env.DB);
  const body = await c.req.json();

  const {title, content, completed, id} = body;

  await db
    .update(tasks)
    .set({
      title,
      content,
      completed,
    })
    .where(eq(tasks.id, id))
    .run();

  return c.json({
    success: true,
    message: `Task with id ${id} updated successfully`,
  });
});
