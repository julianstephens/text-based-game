import os from "os";
import path from "path";

export const config = {
	IS_PROD: process.env.NODE_ENV === "production",
	OUT_DIR: path.join(os.homedir(), ".tbg"),
	DB_SAVE_LOC: path.join(os.homedir(), ".tbg/db.json"),
} as const;
