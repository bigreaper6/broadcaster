const webpack = require("webpack");
const ElectronPlugin = require("electron-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const _base = require("./webpack.base.js");

const base = Object.assign(_base, {
	devServer: {
		inline: false,
		hot: true,
		contentBase: "./output"
	},
	plugins: _base.plugins.concat([
		new WriteFilePlugin(),
		new webpack.WatchIgnorePlugin([
			/.*\.scss\.d\.ts/
		]),
		new ElectronPlugin({
			relaunchPathMatch: "./src/scripts/main",
			path: "./output"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]),
	devtool: "source-map"
});

Object.defineProperty(base.devServer, "outputPath", {
	enumerable: false,
	value: "./output"
});

const main = Object.assign({}, base, {
	target: "electron-main",
	entry: {
		"main/index": "./src/scripts/main/index.ts"
	}
});

const renderer = Object.assign({}, base, {
	target: "electron-renderer",
	entry: {
		"renderer/index": [
			"react-hot-loader/patch",
			"webpack-dev-server/client?http://localhost:3000",
			"webpack/hot/only-dev-server",
			"./src/scripts/renderer/index.tsx"
		]
	}
});

module.exports = [main, renderer];
