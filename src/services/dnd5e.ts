import { logger } from "@/logger.js";
import { RaceSchema, type Race } from "@/schemas/race.js";
import type { RaceIndex } from "@/types/dnd.js";
import { RACE_INDICES } from "@/utils.js";
import axios, { type Axios, type AxiosError } from "axios";
import Singleton from "./singleton.js";

export default class DndInfoClient extends Singleton<DndInfoClient>() {
  private client: Axios;
  private races: Race[];

  private constructor() {
    super();
    this.client = axios.create({
      baseURL: "https://www.dnd5eapi.co/api",
      timeout: 30_000,
      headers: { Accept: "application/json" },
    });
    this.races = [];
  }

  public getRaces = async (): Promise<[Race[] | null, AxiosError | null]> => {
    if (this.races.length > 0) return [this.races, null];

    for (const r of Object.values(RACE_INDICES)) {
      const [data, err] = await this.getRace(r);
      if (err) return [null, err];

      if (data) this.races.push(data);
    }

    return [this.races, null];
  };

  public getRace = async (
    index: RaceIndex,
  ): Promise<[Race | null, AxiosError | null]> => {
    try {
      const res = await this.client.get(`/races/${index}`);
      return [RaceSchema.parse(res.data), null];
    } catch (err) {
      logger.error(err, "unable to fetch dnd races");
      return [null, err as AxiosError];
    }
  };
}
