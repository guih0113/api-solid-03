import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    extends: ['js/recommended'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    rules: {
      'array-bracket-spacing': ['error', 'never'], // Sem espaço dentro de colchetes
      'comma-spacing': ['error', { 'after': true, 'before': false }], // Espaço após vírgulas
      'indent': ['error', 2], // Indentação de 2 espaços
      'max-len': ['error', { 'code': 120 }], // Limite de 120 caracteres por linha
      'newline-before-return': 'error', // Quebra de linha antes de return
      'object-curly-spacing': ['error', 'always'], // Espaçamento dentro de chaves
      'quotes': ['error', 'single'], // Uso de aspas simples
      'semi': ['error', 'never'], // Sem ponto e vírgula
      'space-before-blocks': ['error', 'always'], // Espaço antes de chaves
      'space-in-parens': ['error', 'never'], // Sem espaço dentro de parênteses
      'space-infix-ops': 'error', // Espaço em operações infixas
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node }
  },
  tseslint.configs.recommended,
])
