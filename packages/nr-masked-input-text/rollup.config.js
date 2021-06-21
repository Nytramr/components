import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-import-css';
// import resolve from '@rollup/plugin-node-resolve';
// import babel from '@rollup/plugin-babel';

export default {
  input: './index.js',
  output: {
    // name: '@nytramr/nr-masked-input-text',
    file: './lib/nr-masked-input-text.js',
    // format: 'umd',
    format: 'es',
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
