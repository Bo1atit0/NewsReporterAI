import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended, // ESLint recommended rules
  react.configs.flat.recommended, // React recommended rules
  prettier, // Disable ESLint rules that conflict with Prettier
  {
    // Disable ESLint rules that conflict with Prettier
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // enables JSX parsing
        },
      },
    },
    plugins: {
      react,
    },
    rules: {
      // React specific rules (optional)
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    },
    settings: {
      react: {
        version: 'detect', // auto-detect React version
      },
    },
  },
]);
