import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import history from "@/router/history";
import { renderRoutes } from "react-router-config";
import { mainRoutes } from "@/router/routeMap";

import Loading from "@/pages/Loading";

const HistoryContext = React.createContext({ history });

export default function App() {
  return (
    <Router>
      <HistoryContext.Provider value={{ history }}>
        <Suspense fallback={<Loading />}>
          <Switch>{renderRoutes(mainRoutes)}</Switch>
        </Suspense>
      </HistoryContext.Provider>
    </Router>
  );
}
