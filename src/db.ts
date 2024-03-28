import { Storage } from "@google-cloud/storage";
import dayjs from "dayjs";
import fs from "fs";
import type { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";
import { nanoid } from "nanoid";
import { config } from "./config.js";
import { logger } from "./logger.js";
import type { Data } from "./types/index.js";

let DB: Low<Data> | null = null;

export const initDB = async () => {
  if (!fs.existsSync(config.OUT_DIR)) {
    logger.info("out dir does not exist, creating");
    fs.mkdirSync(config.OUT_DIR, { recursive: true });
  }

  const defaultData: Data = { characters: [], examples: [] };
  DB = await JSONFilePreset<Data>(config.DB_SAVE_LOC, defaultData);
  logger.info("db created/loaded: %s", config.DB_SAVE_LOC);

  if (DB.data.examples.length === 0) await seedExampleBackstories();
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
  const storage = new Storage();
  const contents = await storage
    .bucket(config.GCP_BUCKET_NAME)
    .file(config.GCP_EXAMPLE_FILE)
    .download();

  const db = getDB();
  const jsonData = JSON.parse(contents[0].toString());
  if (Array.isArray(jsonData)) {
    const records = jsonData.map((e) => ({
      id: nanoid(),
      data: e,
      created: dayjs().unix(),
      updated: dayjs().unix(),
    }));
    db.data.examples.push(...records);
    await db.write();
  }
};
