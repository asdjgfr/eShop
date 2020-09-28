import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { Router } from "react-router";
import history from "@/router/history";

import Loading from "@/pages/Loading";
import Error from "@/pages/Error";

const Login = lazy(() => import("@/pages/Login"));
const Admin = lazy(() => import("@/pages/Admin"));

const HistoryContext = React.createContext({ history });
export default function App() {
  return (
    <Router history={history}>
      <HistoryContext.Provider value={{ history }}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/403">
              <Error errorCode={403} />
            </Route>
            <Route path="/404">
              <Error errorCode={404} />
            </Route>
            <Route path="/500">
              <Error errorCode={500} />
            </Route>
          </Switch>
        </Suspense>
      </HistoryContext.Provider>
    </Router>
  );
}
