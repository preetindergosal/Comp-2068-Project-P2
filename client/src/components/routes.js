import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";

import BlogNew from "./beers/new";
import BlogIndex from "./beers/index";
import BlogShow from "./beers/show";
import BlogEdit from "./beers/edit";
import BlogDestroy from "./beers/destroy";

import Register from "./sessions/register";
import Login from "./sessions/login";
import Logout from "./sessions/logout";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/beers/new" component={BlogNew} />
      <Route exact path="/beers" component={BlogIndex} />
      <Route exact path="/beers/:id" component={BlogShow} />
      <Route exact path="/beers/:id/edit" component={BlogEdit} />
      <Route exact path="/beers/:id/destroy" component={BlogDestroy} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  );
}

export default Routes;
