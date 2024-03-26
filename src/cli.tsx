#!/usr/bin/env node
import dotenv from "dotenv";
import { render } from "ink";
import meow from "meow";
import path from "path";
import React from "react";
import App from "./app.js";
import { initDB } from "./db.js";

dotenv.config({
	debug: true,
	path: new URL(path.join("..", ".env"), import.meta.url).href,
});

const _cli = meow(
	`
	pussy
`,
	{
		importMeta: import.meta,
		flags: {
			// name: {
			// 	type: 'string',
			// },
			// age: {
			// 	type: 'number',
			// },
		},
	},
);

await initDB();

render(<App />);
