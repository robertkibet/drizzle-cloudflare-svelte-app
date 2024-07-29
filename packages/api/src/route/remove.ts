import {Hono} from "hono";
import {AppContext} from "../utils";
import {drizzle} from "drizzle-orm/d1";
import {tasks} from "../db/schema";
import {eq} from "drizzle-orm";

export const remove = new Hono<AppContext>();

// Remove a task by ID
remove.delete("/", async (c) => {
  const db = drizzle(c.env.DB);

  const body = await c.req.json();
  console.log("remove data", body);

  const promises = body.map(async (id: string) => {
    console.log("removing task with id", id);
    await db.delete(tasks).where(eq(tasks.id, id)).run();
  });

  await Promise.all(promises);

  return c.json({
    success: true,
    message: `Task with ids "${JSON.stringify(body)}" removed successfully`,
  });
});
