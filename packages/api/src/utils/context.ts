import type * as Hono from "hono";

export type AppContext = {
  Bindings: {
    ENVIRONMENT: "development" | "production";

    DB: D1Database;
  };

  Variables: {
    user_id: string;
    dev: boolean;
  };
};

export type Context = Hono.Context<AppContext>;
export type Handler = Hono.Handler<AppContext>;
export type MiddlewareHandler = Hono.MiddlewareHandler<AppContext>;
