import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';

const CI = !!process.env.CI;

export default defineConfig([{
  input: ['src/index.tsx', 'src/userScript.tsx'],
  output: {
    dir: 'dist',
    entryFileNames: ({ name }) => {
      return name === 'index' ? 'index.js' : 'webOSUserScripts/userScript.js';
    },
  },
  plugins: [
    nodeResolve({ browser: true }),
    typescript({
      tsconfig: 'tsconfig.json',
      module: 'ESNext',
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    replace({
      'preventAssignment': true,
      'process.env.NODE_ENV': JSON.stringify(CI ? 'production' : 'development'),
    }),
    postcss({
      inject: true,
    }),
    copy({
      targets: [
        { src: 'public/*', dest: 'dist' },
      ],
    }),
    CI && terser(),
    process.argv.includes('--watch') && serve({
      port: 5001,
      contentBase: 'dist',
    }),
  ],
}]);
