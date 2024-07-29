import {Hono} from "hono";

import {add} from "./add";
import {update} from "./update";
import {remove} from "./remove";
import {AppContext} from "../utils";
import {all} from "./all";
import {search} from "./search";

export const controller = new Hono<AppContext>();

controller.route("/", all);
controller.route("/add", add);
controller.route("/update", update);
controller.route("/remove", remove);
controller.route("/search", search);
