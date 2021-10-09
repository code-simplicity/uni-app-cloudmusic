const path = require('path')
//最新版本copy-webpack-plugin插件暂不兼容，推荐v5.0.0
const CopyWebpackPlugin = require('copy-webpack-plugin')

const TransformPages = require('uni-read-pages')
const {
	webpack
} = new TransformPages()
module.exports = {
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(__dirname, 'src/static'),
				to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' :
					'dev',
					process.env.UNI_PLATFORM, 'static')
			}]),
			// 配置uni-read-pages路由
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		]
	},
	// 配置网络请求
	transpileDependencies: ['luch-request']
}
