import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-import-css';
import multiInput from 'rollup-plugin-multi-input';
// import resolve from '@rollup/plugin-node-resolve';
// import babel from '@rollup/plugin-babel';

export default {
  input: './src/*.js',
  output: {
    // name: '@nytramr/nr-tabs',
    dir: './lib',
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
    multiInput(),
    css(),
    // resolve(), babel({ babelHelpers: 'bundled' })
  ],
};
