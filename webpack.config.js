// to get the value of either dev or build depending on which npm task we're running
// so we can configure webpack conditionally based on whether currentTask equal dev or build
const currentTask = process.env.npm_lifecycle_event;

const path = require("path");
// webpack plugins should be imported
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {WebpackManifestPlugin} = require("webpack-manifest-plugin")


const config = {
  // we telling webpack this is the entry into our application
  // this is the beginnig of what we want you to start parsing and bundling up the dependencies for
  entry: "./src/app.js",
  // control where the bundeled files gets output
  //( bundle files in bundle.js file  inside dist folder)
  // [hash] used to generate cache busting string ( new name of file on every change), to prevent caching issue
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  // production for live
  // production is going to minify the files, use short variable names, remove alla white space
  mode: "development",
  // to get rid of this warning in browser console DevTools failed to load source map: Could not load content
  devtool: "eval-cheap-source-map",
  // used on both development and production
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  // will automatically rebundle after any changes, we don' want to run npx webpack --save only run run npx webpack
  // watch: true,
  // devServer optional for fast development
  // when you are in development mode use npx webpack-dev-server else use npx webpack to generate bundeled files
  devServer: {
    port: 9000,
    static: path.resolve(__dirname, "dist"),
    //instead of having to realod the browser, just get injected on the fly with the newest copy of our javascript
    hot: true,
  },
  module: {
    // if we use MiniCssExtractPlugin we don't need "style-loader", so in build configuration we remove it and replace it with MiniCssExtractPlugin.loader;
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      //   {
      //     test: /\.css$/,
      //     // css-loader is responsible for making sure it actually import and end up in our bundle
      //     // style-loader it makes the css actually load in the web browser, it makes css avalailable
      //     // the order of loaders matters
      //     use: ["style-loader", "css-loader"],
      //   },
      {
        test: /\.js$/, // only use this loader for this type of files (in this case only files ends with .js)
        exclude: /(node_modules)/, // execlude .js files inside node modules, because we donot want to apply this to all the javascript files that we don't write
        use: {
          // which loader we want to use
          loader: "babel-loader",
          options: {
            // @babel/preset-env convert new javascript syntax to older one to be understandable by all browsers ( not specific to react)
            // @babel/preset-react convert react code into traditional javascript
            /*
                npm install core-js regenerator-runtime
                { "useBuiltIns": "usage", "corejs": 3, "targets": "defaults" } to be able to use async await syntax in javascript
                 with @babel/preset-env only you will got an error generator if you use async await
            */
            presets: [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3, "targets": "defaults" }], "@babel/preset-react"]
          },
        },
      },
    ],
  },
};

// MiniCssExtractPlugin plugin will pulls out the css into it's own separate css file, instaed of bundeling it in the javascript file
// [hash] used to generate cache busting string ( new name of file on every change), to prevent caching issue
// CleanWebpackPlugin will remove old version of files and create new one
/* 
  will genereate manifest.json file in dist folder, it ha key pair value with exact new file names were generated, 
   so you can use those values however and wherever you need to.
*/
// npm run build => found in web.config
if (currentTask == "build") {
  config.mode = "production";
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
  config.plugins.push(
    new MiniCssExtractPlugin(
      { filename: "main.[hash].css" }
    ),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
  );
}

module.exports = config;
