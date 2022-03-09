const path = require("path");

module.exports = {
  // we telling webpack this is the entry into our application
  // this is the beginnig of what we want you to start parsing and bundling up the dependencies for
  entry: "./src/app.js",
  // control where the bundeled files gets output
  //( bundle files in bundle.js file  inside dist folder)
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // will automatically rebundle after any changes, we don' want to run npx webpack --save only run run npx webpack
  watch: true,
  // devServer optional for fast development
  //   devServer:{
  //       port:9000,
  //       static:path.resolve(__dirname, "dist"),
  //       instead of having to realod the browser, just get injected on the fly with the newest copy of our javascript
  //       hot : true
  //   },
  // production for live
  // production is going to minify the files, use short variable names, remove alla white space
  mode: "development",
  module: {
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
