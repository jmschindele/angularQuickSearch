const fs = require('fs-extra');
const concat = require('concat');


console.log('build script running...');

(async function build() {

const files = [
    './dist/inline.bundle.js',
    './dist/polfyfills.bundle.js',
    './dist/main.bundle.js'
]

await fs.ensureDir('elements');

await concat(files, 'elements/quick-search.js');


})