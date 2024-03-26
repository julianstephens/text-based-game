import dayjs from "dayjs";
import { Form, type FormProps } from "ink-form";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import type { Character, NewCharacter } from "../../types/index.js";
import { getDB } from "../db.js";
import { logger } from "../logger.js";

export const CharacterForm = () => {
	const [title] = useState("Create a New Character");
	const [db] = useState(() => getDB());
	const [form] = useState<FormProps>(() => ({
		form: {
			title: title,
			sections: [
				{
					title: "Physical Features",
					fields: [
						{ type: "string", name: "name", required: true },
						{ type: "string", name: "gender", required: true },
						{ type: "integer", name: "age", required: true },
						{ type: "string", name: "race", required: true },
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

	return (
		<Form
			{...form}
			onSubmit={async (res) => {
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
			}}
		/>
	);
};
