// Renders the view based on the route
import * as React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

/* use react lazy to lazy load the routes. the bundle associated with the route will be loaded only when it is needed 
   this helps to reduce the bundle download time on initial load 
 */
const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "bundle.homepage" */ "./HomePage/HomePage")
);

/**
 * @class Routes
 * @summary Renders the view based on the route that has been selected
 */
class Routes extends React.Component {
  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={this.homePage} />
          <Route render={this.notFoundPage} />
        </Switch>
      </Router>
    );
  }

  /**
   * @method
   * @private
   * @summary Renders the page not found page
   */
  private notFoundPage() {
    return <div className="page-not-found">404: Page not found</div>;
  }

  private homePage() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </React.Suspense>
    );
  }
}

export default Routes;
