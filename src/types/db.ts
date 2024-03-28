import type { Character } from "./character.js";

export interface Data {
  characters: DBRecord<Character>[];
  examples: DBRecord<string>[];
}

export interface DBRecord<T> {
  id: string;
  data: T;
  created: number;
  updated: number;
}
