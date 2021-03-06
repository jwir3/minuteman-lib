import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'dist/tricorne.js',
  format: 'cjs',
  external: [ "moment" ],
  plugins: [
   babel({
     exclude: 'node_modules/**',
     babelrc: false,
     presets: ["es2015-rollup"]
   })
 ]
};
