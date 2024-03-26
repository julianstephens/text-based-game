import type { Character } from "./character.js";

export interface Data {
	characters: Record<Character>[];
	examples: Record<string>[];
}

export interface Record<T> {
	id: string;
	data: T;
	created: number;
	updated: number;
}
