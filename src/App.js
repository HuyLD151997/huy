import "./App.css";
import React, { Component } from "react";
import SideBar from "./components/Menu/SideBar";
import Header from "./components/Menu/Header";
import { history } from "./common/history";

import { BrowserRouter, Router, Switch } from "react-router-dom";
import DefaultLayoutRouter from "./common/layout/DefautLayoutRouter/index";
import AdminLayoutRoute from "./common/layout/AdminLayoutRouter/AdminLayoutRouter";
import { ROUTES, ADMIN_ROUTES } from "./constants/index";

const renderDefaultRoutes = () => {
  let xhtml = null;
  xhtml = ROUTES.map((route) => {
    return (
      <DefaultLayoutRouter
        key={route.path}
        path={route.path}
        component={route.component}
        exact={route.exact}
        name={route.name}
      />
    );
  });
  return xhtml;
};

const renderAdminRoutes = () => {
  let xhtml = null;
  xhtml = ADMIN_ROUTES.map((route) => {
    return (
      <AdminLayoutRoute
        key={route.path}
        path={route.path}
        component={route.component}
        exact={route.exact}
        name={route.name}
      />
    );
  });
  return xhtml;
};

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {renderDefaultRoutes()}
          {renderAdminRoutes()}
        </Switch>
      </Router>
    );
  }

  // showContentMenus = (routes) => {
  //   var result = null;
  //   if (routes.length > 0) {
  //     result = routes.map((route, index) => {
  //       return (
  //         <Route
  //           key={index}
  //           path={route.path}
  //           exact={route.exact}
  //           component={route.main}
  //         />
  //       );
  //     });
  //   }
  //   return <Switch>{result}</Switch>;
  // };
}

export default App;
