var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prod = process.argv.indexOf("production") != -1;
const outDir = prod ? "wwwroot/release" : "wwwroot/debug";
console.log(outDir);


const ASSET_PATH = process.env.ASSET_PATH || '';


var plugins = [
    new CleanWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
        template: './app/index.html'
    }),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
];

module.exports = {
    devServer: {
        port: 3001,
        host: "0.0.0.0",
        devMiddleware: {
            stats: {
                children: false, // Hide children information            
                maxModules: 0 // Set the maximum number of modules to be shown
            },
        }
    },
    cache: true,
    stats: { children: false },
    entry: {
        bundle: "./app/app.tsx"
    },
    output: {
        publicPath: ASSET_PATH,
        path: path.resolve(outDir),
        filename: '[name].js'
    },
    plugins: plugins,
    resolve: {
        modules: [path.resolve(__dirname, ''), 'node_modules'],
        extensions: [
            ".ts", ".tsx", ".js"
        ],
        alias: {
            'assets': path.resolve('./app/assets')
        }
    },

    devtool: prod ? "" : "source-map",
    optimization: {
        concatenateModules: true,
        providedExports: false,
        usedExports: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: true,
                        esModule: false
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {

                        },
                    },
                    'css-loader',
                ],
            },
        ]
    }
}

