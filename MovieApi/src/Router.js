import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Favorites from "./components/Favorites";
import { history } from "./history";
import AllMovies from "./components/Movies/AllMovies";
import Movie from "./components/Movies/Movie";

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/" component={AllMovies} />
          <Route path="/:movieId" component={Movie} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
