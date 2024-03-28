import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  sourcemap: true,
  clean: true,
  outDir: "dist",
  bundle: true,
  format: ["esm"],
});
