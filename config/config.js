/*
 * All environment based configurations like API end points, bucker names etc can be found here
 * Currently it supports 3 environments DEVELOPMENT, PRODUCTION and LOCAL
 */
const config = {
  DEVELOPMENT: {
    API: {
      ENDPOINT: "https://okrcentral.github.io",
    },
    ENV: {
      BUCKET_PREFIX: "/reactjs-ttos-dev/",
      BUILD: "development",
    },
  },
  PRODUCTION: {
    API: {
      ENDPOINT: "https://okrcentral.github.io",
    },
    ENV: {
      BUCKET_PREFIX: "/reactjs-ttos/",
      BUILD: "production",
    },
  },
  LOCAL: {
    API: {
      ENDPOINT: "https://okrcentral.github.io",
    },
    ENV: {
      BUCKET_PREFIX: "/",
      BUILD: "local",
    },
  },
};

// fetch configuration for the current environment
const fetchConfig = (buildEnvironment) => {
  // set default env as development
  if (!buildEnvironment) {
    buildEnvironment = "development";
  }
  let envConfig;
  switch (buildEnvironment) {
    case "development":
      envConfig = config.DEVELOPMENT;
      break;
    case "production":
      envConfig = config.PRODUCTION;
      break;
    case "local":
      envConfig = config.LOCAL;
      break;
  }
  return envConfig;
};

module.exports.fetchConfig = fetchConfig;
