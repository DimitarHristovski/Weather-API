import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { SearchCities } from "./SearchCities.js";
import { EuropeanCities } from "./EuropeanCities.js";

import { LocalCities } from "./LocalCities.js";

import { Navigate } from "./Navigate.js";
import "bootstrap/dist/css/bootstrap.css";

export function App() {
  return (
    <div id="app">
      <Navigate />
      <main>
        <Switch>
          <Redirect exact from="/" to="/SearchCities" />
          <Route path="/SearchCities" component={SearchCities} />
          <Route path="/LocalCities" component={LocalCities} />
          <Route path="/EuropeanCities" component={EuropeanCities} />
        </Switch>
      </main>
    </div>
  );
}
