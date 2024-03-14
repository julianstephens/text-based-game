import bunyan from "bunyan";

export const logger = bunyan.createLogger({
	name: "tbg",
	streams: [
		{
			level: "info",
			path: "./tbg.log",
		},
		{
			level: "error",
			path: "./tbg-error.log",
		},
	],
});
