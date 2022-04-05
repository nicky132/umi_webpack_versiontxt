// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join ,resolve } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  define: {
    // dvl 环境的请求基础地址
    // 'process.env.baseUrl': 'http://10.100.218.95:8088'
  },
  devtool: 'source-map',//生成map文件
  // devtool: 'eval',//最快类型
  history: {
    type: 'browser',
  },
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
    '@antv/f2': 'window.F2',
    // '@antv/g2plot': 'window.G2',
    'antd':'window.antd',
  },
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
    'https://gw.alipayobjects.com/os/antv/assets/f2/3.4.2/f2.min.js',
    // 'https://unpkg.com/@antv/g2plot@2.4.5/dist/g2plot.min.js',
    'https://lib.baomitu.com/antd/4.17.0-alpha.3/antd-with-locales.min.js',
  ],
  publicPath: '/',
  hash: true,
  chainWebpack(config, { webpack }) {
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less|scss|sass)$/,
          chunks: 'async',
          minChunks: 1,
          minSize: 0,
        }
      },
    });
    config.devServer.hot(true);
    config.devtool('eval');
    new webpack.HotModuleReplacementPlugin();
    config.module
    .rule('otf')
    .test(/.otf$/)
    .use('file-loader')
    .loader('file-loader');
    if (process.env.NODE_ENV === 'development') {
      config.module
        .rule('js-in-node_modules')
        .exclude.add(/node_modules/)
        .end()
      config.module
        .rule('ts-in-node_modules')
        .exclude.add(/node_modules/)
        .end()
    }
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  fastRefresh: true,
});
