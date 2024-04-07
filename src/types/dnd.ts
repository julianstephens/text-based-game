import type { RaceSchema, SubraceSchema } from "@/schemas/race.js";
import type { RACE_INDICES, SUBRACE_INDICES } from "@/utils.js";
import type { z } from "zod";

export type RaceIndex = (typeof RACE_INDICES)[keyof typeof RACE_INDICES];
export type SubraceIndex =
  (typeof SUBRACE_INDICES)[keyof typeof SUBRACE_INDICES];

export type Race = z.infer<typeof RaceSchema>;
export type Subrace = z.infer<typeof SubraceSchema>;
export type Resource = Pick<Race, "index" | "name">;
