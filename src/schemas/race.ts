import { z } from "zod";

const resource = z.object({
	index: z.string(),
	name: z.string(),
});

export const RaceSchema = resource.extend({
	speed: z.number(),
	ability_bonuses: z
		.object({
			bonus: z.number(),
			ability_score: resource,
		})
		.array(),
	age: z.string(),
	ageRange: z.tuple([z.number(), z.number()]).optional(),
	subraces: resource.array(),
});

export type Race = z.infer<typeof RaceSchema>;
