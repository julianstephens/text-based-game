import { getDB } from "@/db.js";
import { logger } from "@/logger.js";
import type { Character, NewCharacter, RaceIndex } from "@/types/index.js";
import dayjs from "dayjs";
import { Box } from "ink";
import {
  Form,
  type AbstractFormField,
  type FormFieldRendererProps,
  type FormFieldSelect,
  type FormFieldValueRendererProps,
  type FormProps,
} from "ink-form";
import SelectInput from "ink-select-input";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

interface Props {
  races: FormFieldSelect["options"];
  subraces: Record<RaceIndex, FormFieldSelect["options"]>;
}

type SelectOption = FormFieldSelect["options"][0];

type CustomSelect = AbstractFormField<"custom-select", string> & {
  options: SelectOption[];
};

export const CharacterForm = ({ races, subraces }: Props) => {
  const [db] = useState(() => getDB());
  const [curSubraces, setCurSubraces] = useState<FormFieldSelect["options"]>(
    Object.values(subraces)[0],
  );

  const [form, setForm] = useState<FormProps>(() => ({
    customManagers: [
      {
        type: "custom-select",
        renderValue: (props: FormFieldValueRendererProps<FormFieldSelect>) =>
          props.field.options.find(
            (option: SelectOption) => option.value === props.value,
          )?.label ??
          props.value ??
          "No value",
        renderField: (props: FormFieldRendererProps<FormFieldSelect>) => (
          <Box borderStyle="round" width="100%">
            <SelectInput
              {...props}
              items={props.field.options.map((option: SelectOption) => ({
                value: option.value,
                label: option.label ?? option.value,
              }))}
              onHighlight={(option) => props.onChange(option.value)}
              initialIndex={
                props.field.options.findIndex(
                  (option: SelectOption) => option.value === props.value,
                ) ?? 0
              }
              onSelect={({ value }) => {
                setCurSubraces(subraces[value as RaceIndex]);
              }}
            />
          </Box>
        ),
      } as unknown as CustomSelect as any,
    ],
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
              type: "custom-select",
              name: "race",
              label: "Race",
              required: true,
              options: races,
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

  useEffect(() => {
    setForm(() => ({
      customManagers: [
        {
          type: "custom-select",
          renderValue: (props: FormFieldValueRendererProps<FormFieldSelect>) =>
            props.field.options.find(
              (option: SelectOption) => option.value === props.value,
            )?.label ??
            props.value ??
            "No value",
          renderField: (props: FormFieldRendererProps<FormFieldSelect>) => (
            <Box borderStyle="round" width="100%">
              <SelectInput
                {...props}
                items={props.field.options.map((option: SelectOption) => ({
                  value: option.value,
                  label: option.label ?? option.value,
                }))}
                onHighlight={(option) => props.onChange(option.value)}
                initialIndex={
                  props.field.options.findIndex(
                    (option: SelectOption) => option.value === props.value,
                  ) ?? 0
                }
                onSelect={({ value }) => {
                  setCurSubraces(subraces[value as RaceIndex]);
                }}
              />
            </Box>
          ),
        } as unknown as CustomSelect as any,
      ],
      form: {
        title: "Create a New Character",
        sections: [
          {
            title: "Physical Features",
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              {
                type: "string",
                name: "gender",
                label: "Gender",
                required: true,
              },
              { type: "integer", name: "age", label: "Age", required: true },
              {
                type: "custom-select",
                name: "race",
                label: "Race",
                required: true,
                options: races,
              },
              {
                type: "select",
                name: "subrace",
                label: "Subrace",
                required: true,
                options: curSubraces,
                initialValue: curSubraces[0],
              },
            ],
          },
          {
            title: "Attributes",
            fields: [
              {
                type: "integer",
                name: "level",
                initialValue: 0,
                required: true,
              },
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
  }, [curSubraces]);

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
