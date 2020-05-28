import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Company from "./routes/Company";
import Employee from "./routes/Employee";

export default function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/companies/:id" component={Company} />
          <Route exact path="/employees/:id" component={Employee} />
        </Switch>
      </Router>
    </div>
  );
}
