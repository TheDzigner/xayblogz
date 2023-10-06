const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
        // filename: '[name].js'
        // filename: '[name].min.js'
    },
    watch : true
}