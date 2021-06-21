import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-import-css';
// import resolve from '@rollup/plugin-node-resolve';
// import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    name: '@nytramr/web-storybook',
    file: './build/index.js',
    format: 'umd',
    // banner: '#! /usr/bin/env node\n',
    plugins: [
      terser({
        mangle: { properties: { keep_quoted: true } },
      }),
    ],
  },
  context: 'this',
  plugins: [
    css(),
    // resolve(), babel({ babelHelpers: 'bundled' })
  ],
};
