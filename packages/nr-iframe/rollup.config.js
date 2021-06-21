import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-import-css';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// const resolve = require('@rollup/plugin-node-resolve');

export default {
  input: './src/iframe-container.js',
  output: {
    // name: '@nytramr/nr-tabs',
    file: './lib/nr-iframe-container.js',
    // format: 'umd',
    format: 'es',
    // banner: '#! /usr/bin/env node\n',
    plugins: [
      terser({
        mangle: { properties: { keep_quoted: true } },
      }),
    ],
  },
  external: ['@nytramr/utils'],
  plugins: [css(), babel({ babelHelpers: 'bundled' })],
};
