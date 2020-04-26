// Renders the app
import * as React from "react";
import { HashRouter } from "react-router-dom";
import Routes from "./components/Routes";
import "./styles.scss";

/**
 * @class App
 * @summary Holds the routes and most wrapper components, Base component for the application
 */
class App extends React.PureComponent {
  render() {
    return (
      <HashRouter basename={ENV_CONFIG.ENV.BUCKET_PREFIX}>
        <Routes />
      </HashRouter>
    );
  }
}

export default App;
