const path = require('path');
const EVENT = process.env.npm_lifecycle_event || '';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.hasProcessFlag = function (flag) {
  return process.argv.join('').indexOf(flag) > -1;
};

exports.hasNpmFlag = function (flag) {
  return EVENT.includes(flag);
};

exports.isWebpackDevServer = function () {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
};

exports.output = function (prod) {
  if (prod) {
    return {
      path: path.resolve('dist'),
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].[chunkhash].bundle.map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    };
  } else {
    return {
      path: path.resolve('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js',
      library: 'ac_[name]',
      libraryTarget: 'var'
    }
  }
};

exports.devtool = function (prod) {
  if (prod) {
    return 'source-map';
  } else {
    return 'cheap-module-source-map';
  }
};

exports.rules = function (prod) {
  const commonRules = [
    
    /*
     * Typescript loader support for .ts
     * See: https://github.com/s-panferov/awesome-typescript-loader
     */
    {
      test: /\.ts$/,
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'tsconfig.json'
          }
        }
      ],
      exclude: [/\.(spec|e2e)\.ts$/]
    },
    /*
     * Json loader support for *.json files.
     *
     * See: https://github.com/webpack/json-loader
     */
    {
      test: /\.json$/,
      use: 'json-loader'
    },
    
    /*
     * to string and css loader support for *.css files (from Angular components)
     * Returns file content as string
     *
     */
    {
      test: /\.css$/,
      use: ['to-string-loader', 'css-loader'],
      exclude: [path.resolve('src/styles')]
    },
    
    /*
     * to string and sass loader support for *.scss files (from Angular components)
     * Returns compiled css content as string
     *
     */
    {
      test: /\.scss$/,
      use: ['to-string-loader', 'css-loader', 'sass-loader'],
      exclude: [path.resolve('src/styles')]
    },
    
    /* Raw loader support for *.html
     * Returns file content as string
     *
     * See: https://github.com/webpack/raw-loader
     */
    {
      test: /\.html$/,
      use: 'raw-loader',
      exclude: [path.resolve('src/index.html')]
    },
    
    /* File loader for supporting images, for example, in CSS files.
     */
    {
      test: /\.(jpg|png|gif)$/,
      use: 'file-loader'
    }
  ];
  
  const devRules = [
    /*
     * css loader support for *.css files (styles directory only)
     * Loads external css styles into the DOM, supports HMR
     *
     */
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: [path.resolve('src/styles')]
    },
    
    /*
     * sass loader support for *.scss files (styles directory only)
     * Loads external sass styles into the DOM, supports HMR
     *
     */
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: [path.resolve('src/styles')]
    }
  ];
  
  const prodRules = [
    /*
     * Extract CSS files from .src/styles directory to external CSS file
     */
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader'
      }),
      include: [path.resolve('src/styles')]
    },
    
    /*
     * Extract and compile SCSS files from .src/styles directory to external CSS file
     */
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader!sass-loader'
      }),
      include: [path.resolve('src/styles')]
    }
  ];
  
  var rules = [];
  if (prod) {
    rules = rules.concat(commonRules, prodRules);
  } else {
    rules = rules.concat(commonRules, devRules);
  }
  
  return rules;
};

