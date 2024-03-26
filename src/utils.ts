import fs from "fs";

export const loadJSON = async (path: string) =>
	JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString("utf-8"));
