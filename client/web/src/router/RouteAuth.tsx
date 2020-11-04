// TODO: 路由权鉴
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Error from "@/pages/Error";

interface iProps {
  routeMap: any;
  routerConfig?: string;
  location?: any;
}
interface iState {}

class RouteAuth extends React.Component<iProps, iState> {
  render() {
    const { routeMap, location } = this.props;
    const pathname: string = location.pathname;
    console.log(routeMap, location, pathname);
    const findRoute = routeMap.find((r: any) => r.path === location);
    if (findRoute) {
      if (["/403", "/404", "/500"].some((err: string) => err === pathname)) {
        return <Route exact path={pathname} component={findRoute.components} />;
      }
    }
    return <Redirect to="/404" />;
  }
}

export default RouteAuth;
