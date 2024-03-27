import dayjs from "dayjs";
import fs from "fs";
import type { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";
import { nanoid } from "nanoid";
import path from "path";
import type { Data } from "../types/index.js";
import { config } from "./config.js";
import { logger } from "./logger.js";
import { loadJSON } from "./utils.js";

let DB: Low<Data> | null = null;

export const initDB = async () => {
  if (!fs.existsSync(config.OUT_DIR)) {
    logger.info("out dir does not exist, creating");
    fs.mkdirSync(config.OUT_DIR, { recursive: true });
  }

  const defaultData: Data = { characters: [], examples: [] };
  DB = await JSONFilePreset<Data>(config.DB_SAVE_LOC, defaultData);
  logger.info("db created/loaded: %s", config.DB_SAVE_LOC);

  await seedExampleBackstories();
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

export const seedExampleBackstories = async () => {
  const examples = await loadJSON(
    path.join(
      new URL(path.join("..", "example_backstories.json"), import.meta.url)
        .pathname,
    ),
  );
  const db = getDB();
  if (Array.isArray(examples)) {
    const records = examples.map((e) => ({
      id: nanoid(),
      data: e,
      created: dayjs().unix(),
      updated: dayjs().unix(),
    }));
    db.data.examples.push(...records);
    await db.write();
  }
};
