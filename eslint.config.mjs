import stylistic from '@stylistic/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import noUnusedImportsPlugin from 'eslint-plugin-unused-imports';

/** @type {import('eslint').Linter.Config} */
export default [
  stylistic.configs.customize({
    commaDangle: 'always-multiline',
    semi: true,
  }),
  {
    languageOptions: {
      parser: parserTs,
    },
    plugins: {
      'import': importPlugin,
      'react-hooks': reactHooksPlugin,
      'unused-imports': noUnusedImportsPlugin,
    },
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
    rules: {
      'import/order': ['error', {
        'newlines-between': 'always',
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'alphabetize': {
          order: 'asc',
          orderImportKind: 'asc',
          caseInsensitive: true,
        },
        'pathGroups': [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
      }],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'object-shorthand': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      '@stylistic/jsx-one-expression-per-line': 'off',
    },
  },
  {
    ignores: ['node_modules/**/*', 'dist/**/*'],
  },
];
