module.exports = {
	extends: ["alloy", "alloy/react", "alloy/typescript"],
	env: {
		node: true,
	},
	globals: {},
	rules: {
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			},
		],
		"@typescript-eslint/consistent-type-assertions": "warn",
	},
};
