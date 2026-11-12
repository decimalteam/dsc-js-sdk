const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = ({ development }) => ({
    entry: './src/index.ts',
    devtool: development ? 'inline-source-map' : false,
    mode: development ? 'development' : 'production',
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        library: {
            name: 'decimal',
            type: 'umd',
            umdNamedDefine: true,
        },
        globalObject: 'typeof self === \'undefined\' ? this : self',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },
    externals: [nodeExternals()],
});
