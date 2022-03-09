import commonjs from '@rollup/plugin-commonjs';
import multi from "@rollup/plugin-multi-entry";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
    // bundle all scripts together
    input: [ "src/_ts/**/*.ts" ],
    output: {
        file: "_site/bundle.min.js",
        format: "iife"
    },
    // import node_modules (transpile any w/ cjs exports), bundle all entry points, compile typescript, minify
    plugins: [nodeResolve(), commonjs({ include: "node_modules/**", requireReturnsDefault: true }), multi(), typescript(), terser()]
};

// https://github.com/rollup/rollup-plugin-commonjs/issues/137#issuecomment-268806541