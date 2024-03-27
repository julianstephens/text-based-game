import fs from "fs";

export const loadJSON = async (path: string) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString("utf-8"));

export const RACE_INDICES = {
  DRAGONBORN: "dragonborn",
  DWARF: "dwarf",
  ELF: "elf",
  GNOME: "gnome",
  HALF_ELF: "half-elf",
  HALF_ORC: "half-orc",
  HALFLING: "halfling",
  HUMAN: "human",
  TIEFLING: "tiefling",
} as const;
