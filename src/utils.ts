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

export const SUBRACE_INDICES = {
  HIGH_ELF: "high-elf",
  HILL_DWARF: "hill-dwarf",
  LIGHTFOOT_HALFLING: "lightfoot-halfling",
  ROCK_GNOME: "rock-gnome",
} as const;

export const defaultDict = <T>(defaultValue: T) =>
  new Proxy({} as Record<string, T>, {
    get(target, property) {
      if (target[property as keyof typeof target] !== undefined) {
        return target[property as keyof typeof target];
      }

      switch (typeof defaultValue) {
        case "undefined":
        case "boolean":
        case "number":
        case "string":
        case "symbol":
          target[property as keyof typeof target] = defaultValue;
          break;
        case "function":
          target[property as keyof typeof target] = defaultValue(property);
          break;
        case "object":
          if (defaultValue === null) {
            target[property as keyof typeof target] = null as T;
            break;
          }
          if (Array.isArray(defaultValue)) {
            target[property as keyof typeof target] = [...defaultValue] as T;
            break;
          }
          target[property as keyof typeof target] = { ...defaultValue };
          break;
        default:
          throw new TypeError(`Unnkown type ${typeof defaultValue}`);
      }

      return target[property as keyof typeof target];
    },
  });
