import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 👇 Add your rule overrides here
  {
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
      // add more rules as needed
    },
  },
];

export default eslintConfig;
