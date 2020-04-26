const axios = require("axios");
const retry = require("retry");

// use default retry options
const defaultRetryOptions = {
  retries: 3,
  factor: 2,
  minTimeout: 1 * 1000,
  maxTimeout: 60 * 1000,
  randomize: true
};
/**
 * @function invokeAPI wrapper function to invoke rest services
 * @param endpoint: the service end point
 * @param config: options for retry settings, headers and params if not defined default settings will be used
 */
const invokeAPI = ({
  method = "GET",
  endpoint,
  headers = null,
  data = null,
  retryOptions = defaultRetryOptions,
  timeout = 10000
}) => {
  const operation = retry.operation(retryOptions || defaultRetryOptions);
  // wrap the fetch operation inside retry operation
  return new Promise((resolve, reject) => {
    operation.attempt(() => {
      axios({
        method,
        headers,
        data,
        url: endpoint,
        timeout
      })
        .then(response => {
          // pass the response to call back method
          resolve(response.data);
        })
        .catch(error => {
          let doRetry = false;
          if (error.response && error.response.status) {
            // retry on http gateway timeout. no need to retry on other http codes
            if (
              error.response.status === 502 ||
              error.response.status === 504
            ) {
              doRetry = true;
            }
          } else {
            doRetry = true;
          }
          if (doRetry) {
            // retry the axios.get operation
            if (operation.retry(error)) {
              return;
            }
          }
          // all attempts failed, return error messages and a null response
          reject({
            response: null,
            mainError: operation.mainError(),
            errors: operation.errors()
          });
        });
    });
  });
};

export default invokeAPI;
