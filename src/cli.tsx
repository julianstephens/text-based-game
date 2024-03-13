#!/usr/bin/env node
import { render } from 'ink';
import meow from 'meow';
import React from 'react';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ text-based-game

	Options
		--name  Your name

	Examples
	  $ text-based-game --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
			age: {
				type: 'number',
			},
		},
	},
);

render(<App name={cli.flags.name} age={cli.flags.age} />);
