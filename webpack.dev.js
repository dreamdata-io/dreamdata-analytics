const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '/lib'),
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.js$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [
                        { search: 'api.dreamdata.cloud/v1', replace: 'localhost:8080/v1' },
                        { search: `'https://'`, replace: `'https://'` }
                    ]
                }
            }
        ]
    },
    output: {
        library: 'dreamdata',
        libraryTarget: 'umd',
        filename: 'dreamdata.js'
    }
};
