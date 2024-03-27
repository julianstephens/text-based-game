import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/**/*.ts?(x)"],
	sourcemap: true,
	clean: true,
	outDir: "dist",
	bundle: false,
	format: ["esm"],
	esbuildOptions(options, context) {
		options.outbase = "./src";
	},
});
