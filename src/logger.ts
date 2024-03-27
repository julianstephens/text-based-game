import bunyan from "bunyan";
import path from "path";
import { config } from "./config.js";

export const logger = bunyan.createLogger({
  name: "tbg",
  streams: [
    {
      level: "info",
      ...(config.NODE_ENV === "production"
        ? { path: path.join(config.OUT_DIR, "tbg.log") }
        : { stream: process.stdout }),
    },
    {
      level: "error",
      ...(config.NODE_ENV === "production"
        ? { path: path.join(config.OUT_DIR, "tbg-error.log") }
        : { stream: process.stderr }),
    },
  ],
});
