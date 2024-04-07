import { z } from "zod";

const resource = z.object({
  index: z.string(),
  name: z.string(),
});

const ability_bonuses = z
  .object({
    bonus: z.number(),
    ability_score: resource,
  })
  .array();

const option = z.object({
  option_type: z.string(),
  item: resource,
});

export const RaceSchema = resource.extend({
  ability_bonuses: ability_bonuses,
  speed: z.number(),
  age: z.string(),
  ageRange: z.tuple([z.number(), z.number()]).optional(),
  subraces: resource.array(),
});

export const SubraceSchema = resource.extend({
  desc: z.string(),
  ability_bonuses: ability_bonuses,
  starting_proficiencies: resource.array(),
  language_options: z
    .object({
      choose: z.number(),
      from: z.object({
        option_set_type: z.string(),
        options: option.array(),
      }),
    })
    .optional(),
  racial_traits: resource.array(),
});
