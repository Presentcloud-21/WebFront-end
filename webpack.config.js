// let path = require('path');
// let webpack = require('webpack');
// module.exports = {
//     entry: './index.js',
//     output: {
//         path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
//         filename: "bundle.js"
//     },
//     module: {
//         rules: [

//         ]
//     }
// };
const path = require('path');
// const globby = require('globby');

module.exports = (env, argv) => {
  const config = {
    mode: "development",
    optimization: {
      minimize: false
    },
    entry: {
        'index': './index.jsx',
      },    
      output: {
      path: path.resolve('build'),
      publicPath: 'build',
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        moment: 'moment',
        '@alifd/next': 'Next',
        antd: 'antd'
      },
    resolve: {
      extensions: ['.js', '.jsx'],
      // TODO 演示 路径 alias
      // alias: {
      //   components: path.join(__dirname, 'src/components'),
      //   utils: path.join(__dirname, 'src/utils'),
      // },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test:/\.(jpg|png|jpeg|gif)$/,
          use:[
            'url-loader',
            'file-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            // 主题
            {
              loader: '@alifd/next-theme-loader',
              options: {
                theme: '@alifd/theme-2',
                // TODO
              },
            },
          ],
        },
      ],
    },
  };

  if (argv.mode === 'development') {
    config.devtool = 'source-map';

    // 开发环境本地 web 服务
    config.devServer = {
      inline:true,  //缺少该配置，会出现上面的错误
      historyApiFallback:true,  //缺少该配置，会出现上面的错误
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      proxy: {
        '/ajax': {
          // target: 'http://127.1.0.0:8000',
          target: 'http://192.168.1.170:8080',
          pathRewrite: {'^/ajax' : ''},
          changeOrigin:true,
          secure:false,
        }
      },
      stats: {
        chunks: false,
        children: false,
        modules: false,
        chunkModules: false,
      },
    };
  }

  if (argv.mode === 'production') {
    // ...
  }

  // TODO 演示更快捷的方式
  // const entry = {};
  // const cwd = process.cwd();
  // const files = globby.sync(['**/pages/*'], { cwd: `${cwd}/src` });
  // files.forEach((item) => {
  //   entry[`${item}/index`] = [`./src/${item}/index.jsx`];
  // });
  // config.entry = entry

  return config;
};
