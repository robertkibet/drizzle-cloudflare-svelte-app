import {Hono} from "hono";
import {AppContext} from "../utils";
// import {assert} from "superstruct";
import {drizzle} from "drizzle-orm/d1";
import {tasks} from "../db/schema";

export const add = new Hono<AppContext>();

add.post("/", async (c) => {
  const db = drizzle(c.env.DB);

  const body = await c.req.json();
  console.log("add data", body);

  // Validate the body data here as needed
  const {id, title, content, completed} = body;

  await db
    .insert(tasks)
    .values({
      id,
      title,
      content,
      completed,
    })
    .run();

  return c.json({success: true, message: "Task added successfully"});
});
