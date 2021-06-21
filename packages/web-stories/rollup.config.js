// import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default [
  {
    input: 'src/playground-bundle.js',
    output: {
      file: 'server/js/playground-bundle.js',
      format: 'iife',
      // plugins: [
      //   terser({
      //     mangle: { properties: { keep_quoted: true } },
      //   }),
      // ],
    },
    plugins: [resolve(), babel({ babelHelpers: 'bundled' })],
  },
  {
    input: 'src/sandbox-bundle.js',
    output: {
      file: 'server/js/sandbox-bundle.js',
      format: 'iife',
      // plugins: [
      //   terser({
      //     mangle: { properties: { keep_quoted: true } },
      //   }),
      // ],
    },
    plugins: [resolve(), babel({ babelHelpers: 'bundled' })],
  },
];
