// TODO: 路由权鉴
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Error from "@/pages/Error";

interface iProps {
  routeMap: any;
  routerConfig?: string;
  location?: any;
}
interface iState {
  needAuth: boolean;
}

class RouteAuth extends React.Component<iProps, iState> {
  render() {
    const { routeMap, location } = this.props;
    const pathname: string = location.pathname;
    let findRoute = null;
    console.log(location.pathname);
    for (let i = 0; i < routeMap.length; i++) {
      const route = routeMap[i];
      if (route.exact) {
        if (route.path === pathname) {
          findRoute = route;
          break;
        } else {
          continue;
        }
      }
      if (pathname.indexOf(route.path) === 0) {
        findRoute = route;
        break;
      }
    }
    if (findRoute) {
      if (findRoute.auth && !localStorage.getItem("Authorization")) {
        return <Redirect to="/403" />;
      }
      if (
        ["/403", "/404", "/500"].some(
          (err: string) => pathname.indexOf(err) === 0
        )
      ) {
        return (
          <Route path={pathname}>
            <Error errorCode={findRoute.errorCode} />
          </Route>
        );
      }
      if (findRoute.children && findRoute.children.length) {
        return (
          <Route
            exact={!!findRoute.exact}
            path={pathname}
            component={findRoute.component}
          >
            <Route path="about" component={findRoute.children} />
          </Route>
        );
      }
      return (
        <Route
          exact={!!findRoute.exact}
          path={pathname}
          component={findRoute.component}
        />
      );
    }
    return <Redirect to="/404" />;
  }
}

export default RouteAuth;
