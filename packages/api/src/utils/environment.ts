import {MiddlewareHandler} from "./context";

/**
 * Defines the current environment.
 * @param c
 * @param next
 */
export const environment: MiddlewareHandler = async (c, next) => {
  c.set("dev", c.env.ENVIRONMENT === "development");
  await next();
};
