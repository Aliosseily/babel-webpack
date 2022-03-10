import "./styles.scss";

import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Test from "../components/Test";

const App = () => {
  return (
    <Fragment>
      <h1 className="test">Hello from Readct!</h1>
      <Test />
    </Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
// // const validator = require("validator"); // traditional way to file using node, in Ecmascript use import
// import tripleMe from "./tripleMe";
// // import validator from "validator"; instead of importing alla the package, import only the needed to reduce the size of the file
// import isEmail from "validator/lib/isEmail";

// // console.log(validator.isEmail("alotmaiddddm"));
// // npx webpack --watch to run webpack

// console.log(tripleMe(50));
// console.log(isEmail("ali.ossaily@outlook.com"));

// // by default npx webpack will look at the index.js in src folder and bundle file in dist eith name main.js

// open setting by press Ctrl + ,
// go to setting json. by press on top rigth
/* add or uncomment this line 
"files.associations":{
  "*.js" : "javascriptreact"
}
*/