const tsc = require('typescript');
const tsconfig = require('./tsconfig.json');

module.exports = {
    process(src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx') || path.endsWith('.js')) {
            return tsc.transpile(src, tsconfig.compilerOptions, path, []);
        }
        return src;
    }
}