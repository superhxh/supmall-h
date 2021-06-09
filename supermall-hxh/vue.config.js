const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('@/assets'))
      .set('components', resolve('@/components'))
      .set('views', resolve('@/views'));
    //排除icons目录中svg文件处理
  },
}