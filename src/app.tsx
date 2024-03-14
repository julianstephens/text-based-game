import { Newline, Text } from "ink";
import React from "react";
import { CharacterForm } from "./components/CharacterForm.js";
import { getDB } from "./db.js";

export default function App() {
	const db = getDB();
	return (
		<>
			<Text>Welcome to Adventure Game!</Text>
			<Text>characters: {db.data.characters.length}</Text>
			<Newline />
			<CharacterForm />
		</>
	);
}
