import { logger } from "@/logger.js";
import { RaceSchema, SubraceSchema } from "@/schemas/race.js";
import type { Race, RaceIndex, Subrace, SubraceIndex } from "@/types/dnd.js";
import { RACE_INDICES, SUBRACE_INDICES } from "@/utils.js";
import axios, { type Axios, type AxiosError } from "axios";
import { setupCache } from "axios-cache-interceptor";
import Singleton from "./singleton.js";

export default class DndInfoClient extends Singleton<DndInfoClient>() {
  private client: Axios;
  private races: Race[];
  private subraces: Subrace[];

  private constructor() {
    super();
    const instance = axios.create({
      baseURL: "https://www.dnd5eapi.co/api",
      timeout: 30_000,
      headers: { Accept: "application/json" },
    });
    this.client = setupCache(instance);
    this.races = [];
    this.subraces = [];
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
      logger.error(err, "unable to fetch dnd race");
      return [null, err as AxiosError];
    }
  };

  public getSubraces = async (): Promise<
    [Subrace[] | null, AxiosError | null]
  > => {
    for (const r of Object.values(SUBRACE_INDICES)) {
      const [data, err] = await this.getSubrace(r);
      if (err) return [null, err];

      if (data) {
        try {
          const parsed = SubraceSchema.parse(data);
          this.subraces.push(parsed);
        } catch (err) {
          logger.error(err, "unable to parse subrace");
        }
      }
    }

    return [this.subraces, null];
  };

  public getSubrace = async (
    index: SubraceIndex,
  ): Promise<[Subrace | null, AxiosError | null]> => {
    try {
      const res = await this.client.get(`/subraces/${index}`);
      return [SubraceSchema.parse(res.data), null];
    } catch (err) {
      logger.error(err, "unable to fetch dnd subrace");
      return [null, err as AxiosError];
    }
  };
}
