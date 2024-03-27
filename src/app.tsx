import { Newline, Text } from "ink";
import type { FormFieldSelect } from "ink-form";
import React, { useEffect, useState } from "react";
import type { RaceIndex } from "types/dnd.js";
import { CharacterForm } from "./components/CharacterForm.js";
import { getDB } from "./db.js";
import DndInfoClient from "./services/dnd5e.js";

export default function App() {
	const db = getDB();
	const dndClient = DndInfoClient.getInstance();
	const [didLoadRaces, setDidLoadRaces] = useState(false);
	const [raceOpts, setRaceOpts] = useState<FormFieldSelect["options"]>([]);
	const [subraceOpts, setSubraceOpts] = useState<
		Record<RaceIndex, FormFieldSelect["options"]>
	>({} as Record<RaceIndex, FormFieldSelect["options"]>);

	const loadRaces = async () => {
		const [races] = await dndClient.getRaces();

		if (races) {
			races.forEach((r) => {
				setRaceOpts((prev) => [...prev, { label: r.name, value: r.index }]);
				setSubraceOpts((prev) => ({
					...prev,
					[r.index]:
						r.subraces.length > 0
							? [...r.subraces.map((s) => ({ label: s.name, value: s.index }))]
							: [{ label: r.name, value: r.index }],
				}));
			});
			setDidLoadRaces(true);
		}
	};

	useEffect(() => {
		loadRaces();
	}, []);

	return (
		<>
			<Text>Welcome to Adventure Game!</Text>
			<Text>characters: {db.data.characters.length}</Text>
			<Newline />
			{didLoadRaces && (
				<CharacterForm races={raceOpts} subraces={subraceOpts} />
			)}
		</>
	);
}
