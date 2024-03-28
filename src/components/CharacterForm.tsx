import { getDB } from "@/db.js";
import { logger } from "@/logger.js";
import type { Character, NewCharacter, RaceIndex } from "@/types/index.js";
import dayjs from "dayjs";
import { Form, type FormFieldSelect, type FormProps } from "ink-form";
import { nanoid } from "nanoid";
import React, { useState } from "react";

interface Props {
  races: FormFieldSelect["options"];
  subraces: Record<RaceIndex, FormFieldSelect["options"]>;
}

export const CharacterForm = ({ races, subraces }: Props) => {
  const [db] = useState(() => getDB());
  const [curSubraces, setCurSubraces] = useState<FormFieldSelect["options"]>(
    Object.values(subraces)[0],
  );
  const [form] = useState<FormProps>(() => ({
    form: {
      title: "Create a New Character",
      sections: [
        {
          title: "Physical Features",
          fields: [
            { type: "string", name: "name", label: "Name", required: true },
            { type: "string", name: "gender", label: "Gender", required: true },
            { type: "integer", name: "age", label: "Age", required: true },
            {
              type: "select",
              name: "race",
              label: "Race",
              required: true,
              options: races,
              onChange: (value: string) => {
                console.log(value);
                setCurSubraces(subraces[value as RaceIndex]);
              },
            },
            {
              type: "select",
              name: "subrace",
              label: "Subrace",
              required: true,
              options: curSubraces,
            },
          ],
        },
        {
          title: "Attributes",
          fields: [
            { type: "integer", name: "level", initialValue: 0, required: true },
            { type: "string", name: "class", required: true },
            {
              type: "integer",
              name: "constitution",
              initialValue: 0,
              required: true,
            },
            {
              type: "integer",
              name: "strength",
              initialValue: 0,
              required: true,
            },
            {
              type: "integer",
              name: "dexterity",
              initialValue: 0,
              required: true,
            },
            {
              type: "integer",
              name: "intelligence",
              initialValue: 0,
              required: true,
            },
            {
              type: "integer",
              name: "wisdom",
              initialValue: 0,
              required: true,
            },
            {
              type: "integer",
              name: "charisma",
              initialValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  }));

  const onSubmit = async (res: object) => {
    const char: Character = {
      ...(res as NewCharacter),
      inventory: [],
      background: "",
    };
    const record = {
      id: nanoid(),
      data: char,
      created: dayjs().unix(),
      updated: dayjs().unix(),
    };
    logger.info({ data: record }, "committing db record");
    await db.update(({ characters }) => characters.push(record));
  };

  return <Form {...form} onSubmit={onSubmit} />;
};
