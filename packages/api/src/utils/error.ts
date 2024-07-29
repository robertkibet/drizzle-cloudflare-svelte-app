import {type StatusCode} from "hono/utils/http-status";
import {is_string} from "./guards";

export class HttpError extends Error {
  constructor(public readonly status: StatusCode, message?: string) {
    super(message);
    this.name = "HttpError";
  }
}

/**
 * @returns An error response
 * @param status
 * @param err
 * @param fallback
 */
export const error = (status: number, err?: unknown) => {
  const error =
    err instanceof Error
      ? err
      : new Error(is_string(err) ? err : statuses[status]);

  return new HttpError(status as StatusCode, error.message);
};

/**
 * @returns A {@link HttpError} object from an Error.
 * If there isn't an explicit error status defined, it falls back to 500.
 * @param err
 */
export const parse_http_error = (err: Error) =>
  is_http_error(err) ? err : error(500, err.message);

/**
 * Determines if an object is an {@link HttpError} instance.
 * @param err
 */
export const is_http_error = (err: unknown): err is HttpError =>
  err instanceof HttpError;

const statuses: Record<StatusCode | number, string> = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  206: "Partial Content",
  301: "Moved Permanently",
  302: "Moved Temporarily",
  303: "See Other",
  304: "Not Modified",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Not Allowed",
  406: "Not Acceptable",
  408: "Request Time-out",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Large",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  421: "Misdirected Request",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Temporarily Unavailable",
  504: "Gateway Time-out",
  505: "HTTP Version Not Supported",
  507: "Insufficient Storage",
};
