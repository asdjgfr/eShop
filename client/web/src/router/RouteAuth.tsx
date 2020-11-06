// TODO: 路由权鉴
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { RouteType } from "@/router/routeMap";
import RouteAuthDOM from "@/router/RouteAuth";
import Error from "@/pages/Error";

interface iProps {
  routeMap: any;
  location?: any;
}
interface iState {
  needAuth: boolean;
}

class RouteAuth extends React.Component<iProps, iState> {
  render() {
    const { routeMap } = this.props;
    console.log(
      this.props.location,
      routeMap.map((r: { name: any }) => r.name)
    );
    return (
      <>
        {/*{routeMap.map((route: RouteType) => {*/}
        {/*  console.log("触发", route.name, route.auth);*/}
        {/*  if (Array.isArray(route.children) && route.children.length) {*/}
        {/*    return (*/}
        {/*      <Route*/}
        {/*        key={route.name}*/}
        {/*        exact={!!route.exact}*/}
        {/*        path={route.path}*/}
        {/*        component={route.component}*/}
        {/*      >*/}
        {/*        <RouteAuthDOM routeMap={route.children} />*/}
        {/*      </Route>*/}
        {/*    );*/}
        {/*  }*/}
        {/*  if (route.redirect !== undefined) {*/}
        {/*    return (*/}
        {/*      <Route key={route.name} path={route.path}>*/}
        {/*        <Redirect to={route.redirect} />*/}
        {/*      </Route>*/}
        {/*    );*/}
        {/*  }*/}
        {/*  if (route.auth && !localStorage.getItem("Authorization")) {*/}
        {/*    return (*/}
        {/*      <Route key={route.name} path={route.path}>*/}
        {/*        <Redirect to="/403" />*/}
        {/*      </Route>*/}
        {/*    );*/}
        {/*  }*/}
        {/*  return (*/}
        {/*    <Route*/}
        {/*      key={route.name}*/}
        {/*      exact={!!route.exact}*/}
        {/*      path={route.path}*/}
        {/*      component={route.component}*/}
        {/*    />*/}
        {/*  );*/}
        {/*})}*/}
        <Route path="/403">
          <Error errorCode={403} />
        </Route>
        <Route path="/404">
          <Error errorCode={404} />
        </Route>
        <Route path="/500">
          <Error errorCode={500} />
        </Route>
      </>
    );
  }
}

export default RouteAuth;
