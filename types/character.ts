export interface Character {
	name: string;
	gender: string;
	age: number;
	race: string;
	level: number;
	class: string;
	constitution: number;
	strength: number;
	dexterity: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	inventory: string[];
	background: string;
}

export type NewCharacter = Omit<Character, "inventory" | "background">;
