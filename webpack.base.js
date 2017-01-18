const {resolve} = require("path");
const webpack = require("webpack");
const {CheckerPlugin} = require("awesome-typescript-loader");
const CopyPlugin = require("copy-webpack-plugin");

const base = {
	output: {
		path: resolve("output"),
		filename: "scripts/[name].js",
		publicPath: "/"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loaders: [
					"react-hot-loader/webpack",
					"awesome-typescript-loader"
				]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader"
			},
			// TODO: react-toolbox v2/postcss?
			{
				test: /index\.scss$/,
				loaders: [
					"style-loader",
					"css-loader",
					"resolve-url-loader",
					"sass-loader?sourceMap"
				]
			},
			{
				test: /\.scss$/,
				exclude: /index\.scss$/g,
				loaders: [
					"style-loader",
					"css-loader?modules&camelCase",
					"typed-css-modules-loader?camelCase",
					"sass-loader?sourceMap"
				]
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},
	plugins: [
		new CopyPlugin([
			{from: "src/public"}
		]),
		new CheckerPlugin(),
		new webpack.IgnorePlugin(/lib-cov/),
		new webpack.ExternalsPlugin("commonjs", [
			"electron-devtools-installer"
		])
	],
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	}
};

module.exports = base;
