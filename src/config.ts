import dotenv from "dotenv";
import os from "os";
import path from "path";
import { z } from "zod";

dotenv.config({
	path: new URL(path.join("..", ".env"), import.meta.url).pathname,
});

const DEFAULT_OUT_DIR = ".tbg";

const configSchema = z.object({
	IS_PROD: z.boolean().default(false),
	OUT_DIR: z.string().default(path.join(os.homedir(), DEFAULT_OUT_DIR)),
	DB_SAVE_LOC: z
		.string()
		.default(path.join(os.homedir(), DEFAULT_OUT_DIR, "db.json")),
	OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY must be set"),
});

export const config = configSchema.parse(process.env);
