module.exports = function (webpackEnv) {
    // ...
    return {
     // ...
      resolve: {
        // ...
        fallback: {
          crypto: false,
          stream: false,
        }
      }
    }
  }