const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports ={
    publicPath:'./',
    configureWebpack: config => {
        if (isProduction) {
          config.plugins.push(new CompressionWebpackPlugin({
            algorithm: 'gzip',// 使用gzip压缩
            test: new RegExp(
                '\\.(js|css)$' // 压缩 js 与 css
            ),
            threshold: 5000,// 资源文件大于10240B=10kB时会被压缩
            minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
          })),
          config.externals = {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': "ELEMENT",
            'axios':'axios',
          }
        }
      },
      
}