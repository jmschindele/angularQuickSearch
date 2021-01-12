const fs = require('fs-extra');
const concat = require('concat');

console.log('compiling element to /Users/joshschindele/workspace/web/arms-web/src/main/webapp/js/quick-search/quick-search.js ...');

// fs.ensureDir('elements', err => {
// if (err) {
//     console.log(err)
// };

fs.emptyDir('/Users/joshschindele/workspace/web/arms-web/src/main/webapp/js/quick-search', err => {
    if (err) {
        console.log(err)
    };

const files = [
    './dist/quickSearch/runtime-es2015.js',
    './dist/quickSearch/polyfills-es2015.js',
    './dist/quickSearch/main-es2015.js'
]

// concat(files, 'elements/quick-search.js')
concat(files, '/Users/joshschindele/workspace/web/arms-web/src/main/webapp/js/quick-search/quick-search.js')


})