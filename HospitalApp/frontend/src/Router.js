import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import Employee from ".//components/Employee";

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={EmployeeList} />
          <Route path="/add" component={AddEmployee} />
          <Route path="/:id" component={Employee} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
