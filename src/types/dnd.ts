import type { RACE_INDICES } from "../src/utils.js";

export type RaceIndex = (typeof RACE_INDICES)[keyof typeof RACE_INDICES];
