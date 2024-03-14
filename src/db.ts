import fs from "fs";
import type { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";
import type { Data } from "../types/index.js";
import { config } from "./config.js";
import { logger } from "./logger.js";

let DB: Low<Data> | null = null;

export const initDB = async () => {
	if (!fs.existsSync(config.OUT_DIR)) {
		logger.info("out dir does not exist, creating");
		fs.mkdirSync(config.OUT_DIR, { recursive: true });
	}

	const defaultData = { characters: [] };
	DB = await JSONFilePreset<Data>(config.DB_SAVE_LOC, defaultData);
	logger.info("db created/loaded: %s", config.DB_SAVE_LOC);
};

export const getDB = () => {
	if (!DB) {
		logger.error("unable to create/load db");
		throw Error("db has not been initialized");
	}

	DB.read().catch(() => {
		logger.error("could not read from db");
	});

	return DB;
};
