import os from "os";
import path from "path";
import { z } from "zod";

const configSchema = z.object({
	IS_PROD: z.boolean().default(false),
	OUT_DIR: z.string().default(path.join(os.homedir(), ".tbg")),
	DB_SAVE_LOC: z.string().default(path.join(os.homedir(), ".tbg/db.json")),
	OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY must be set"),
});

export const config = configSchema.parse(process.env);
