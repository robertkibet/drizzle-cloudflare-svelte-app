import {Hono} from "hono";
import {cors} from "hono/cors";
import {AppContext, parse_http_error} from "./utils";
import {environment} from "./utils/environment";
import {controller} from "./route";

const app = new Hono<AppContext>();

// Global Middleware
app.use("*", cors({origin: "*", maxAge: 3600 * 6, credentials: true}));
app.use("*", environment);

// Error handling
app.onError((err, c) => {
  console.error(err);

  const {status, message} = parse_http_error(err);
  return c.json({error: message}, status);
});

// Routes
app.route("/v1", controller);
app.get("/", (c) => c.text(c.env.ENVIRONMENT));

export default app;
