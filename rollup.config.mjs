import { readPackageSync } from 'read-pkg';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import postCss from 'rollup-plugin-postcss';
import cssnanoPlugin from 'cssnano';

const pkg = readPackageSync();

const input = 'src/index.tsx';
const external = Object.keys({ ...pkg.peerDependencies });
const sourcemap = true;
const exports = 'named';
const out = 'dist/index';

/** @type import('rollup').RollupOptions[] */
export default [
  {
    input,
    external,
    plugins: [
      postCss({
        use: ['sass'],
        extract: true,
        minimize: true,
        modules: {
          generateScopedName: '[local]_[hash:base64:5]',
        },
        // plugins: [cssnanoPlugin()],
      }),
      esbuild({
        sourceMap: sourcemap,
      }),
    ],
    output: [
      {
        file: `${out}.js`,
        format: 'esm',
        sourcemap,
        exports,
      },
      {
        file: `${out}.cjs`,
        format: 'cjs',
        sourcemap,
        exports,
        name: pkg.name,
      },
    ],
  },
  {
    input,
    output: [{ file: `${out}.d.ts`, format: 'es' }],
    plugins: [dts()],
  },
];
