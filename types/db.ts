import type { Character } from "./character.js";

export interface Data {
	characters: Record<Character>[];
}

export interface Record<T> {
	id: string;
	data: T;
	created: number;
	updated: number;
}
