#!/usr/bin/env node
import { render } from "ink";
import meow from "meow";
import React from "react";
import App from "./app.js";
import { initDB } from "./db.js";

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
