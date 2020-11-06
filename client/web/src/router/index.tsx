import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Router } from "react-router";
import history from "@/router/history";
import { renderRoutes } from "react-router-config";
import routes from "@/router/routeMap";

import Loading from "@/pages/Loading";

const HistoryContext = React.createContext({ history });

export default function App() {
  return (
    <Router history={history}>
      <HistoryContext.Provider value={{ history }}>
        <Suspense fallback={<Loading />}>
          <Switch>
            {renderRoutes(routes)}
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </Suspense>
      </HistoryContext.Provider>
    </Router>
  );
}
