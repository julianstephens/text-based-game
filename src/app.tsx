import { Text } from 'ink';
import React from 'react';

interface Props {
	name?: string;
	age?: number;
}

export default function App({name = 'Stranger', age = 21}: Props) {
	return (
		<Text>
			Hello, <Text color="green">{name}</Text> {age}
		</Text>
	);
}
