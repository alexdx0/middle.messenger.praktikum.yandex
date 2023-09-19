import { resolve } from "path";

import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
// import handlebars from "vite-plugin-handlebars";

import tsconfig from "./tsconfig.paths.json";
import handlebars from "./src/core/vite-plugin-handlebars-precompile";

export default defineConfig({
  server: {
    host: "localhost",
    port: 3000,
  },
  resolve: {
    alias: {
      ...Object.fromEntries(
        // Отсекаем "/*" с конца путей из tsconfig'а
        Object.entries(tsconfig.compilerOptions.paths || []).map(([alias, [folder]]) => [
          alias.replace(/(.*)(\/\*)$/, "$1").toString(),
          resolve(__dirname, folder.replace(/(.*)(\/\*)$/, "$1")),
        ])
      ),
    },
  },
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint \"./src/**/*.{ts,js}\"",
      },
    }),
    handlebars(),
  ],
  build: {
    emptyOutDir: true,
  },
});

// TODO
/**
 * - сбор данных из формы
 * - валидация полей на все формы
 * - класс для работы с запросами
 */
