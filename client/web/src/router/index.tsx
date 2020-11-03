import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Router } from "react-router";
import history from "@/router/history";

import Loading from "@/pages/Loading";
import Error from "@/pages/Error";

const Main = lazy(() => import("@/pages/Main"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Admin = lazy(() => import("@/pages/Admin"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const ShopList = lazy(() => import("@/pages/ShopList"));

const HistoryContext = React.createContext({ history });
export default function App() {
  return (
    <Router history={history}>
      <HistoryContext.Provider value={{ history }}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/feedback">
              <Feedback />
            </Route>
            <Route path="/shop/shop-list">
              <ShopList />
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
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </Suspense>
      </HistoryContext.Provider>
    </Router>
  );
}
