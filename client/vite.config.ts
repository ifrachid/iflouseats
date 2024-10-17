import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { keycloakify } from "keycloakify/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    keycloakify({
      accountThemeImplementation: "none",
      startKeycloakOptions: {
        realmJsonFilePath: "./realm-export.json",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
