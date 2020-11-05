import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "@/router/history";
import routeMap from "./routeMap";
import RouteAuth from "@/router/RouteAuth";

import Loading from "@/pages/Loading";

const HistoryContext = React.createContext({ history });

export default function App() {
  return (
    <Router history={history}>
      <HistoryContext.Provider value={{ history }}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <RouteAuth routeMap={routeMap} />
          </Switch>
        </Suspense>
      </HistoryContext.Provider>
    </Router>
  );
}
