const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = () => {
  let buildEnvironment = process.env.BUILD.trim();
  let outputPath = "/dist";
  if (!buildEnvironment) {
    buildEnvironment = "development";
  }

  // read environment based configurations and pass it to the application
  const envConfig = require("./config/config.js").fetchConfig(buildEnvironment);
  let isProduction = buildEnvironment !== "local" ? true : false;
  const NODE_ENV = isProduction ? "production" : "development";
  if (buildEnvironment === "development") {
    outputPath = "/dist-dev";
  }
  if (buildEnvironment === "production") {
    outputPath = "/dist-prod";
  }
  let plugins = [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.DefinePlugin({
      ENV_CONFIG: JSON.stringify(envConfig),
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ];
  if (isProduction) {
    plugins.push(
      new CompressionPlugin({
        filename: "[path]"
      })
    );
  } else {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static"
      })
    );
  }
  let config = {
    entry: {
      bundle: [
        "core-js/stable/object", // For IE11
        "core-js/stable/promise", // For IE11
        "core-js/stable/array", // For IE11
        "core-js/stable/set", // For IE10
        "core-js/stable/map", // For IE10
        "core-js/stable/weak-map", // For IE10
        "./src/index.tsx"
      ]
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"]
    },
    output: {
      path: path.join(__dirname, outputPath),
      filename: "[name].[hash].js",
      chunkFilename: "[name].[hash].js"
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 3000,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(tsx|js|ts)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        },
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
          loader: "url-loader?limit=100000"
        }
      ]
    },
    plugins,
    optimization: {
      nodeEnv: NODE_ENV,
      minimize: isProduction,
      concatenateModules: isProduction,
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: "."
      }
    }
  };
  return config;
};
