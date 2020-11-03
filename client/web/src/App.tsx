import React from "react";
import Router from "@/router";
import "./App.less";
import { Provider } from "mobx-react";
import store from "@/store";
import I18n from "@/i18n";
import initFn from "@/lib/rc.local";

interface iProps {}
interface iState {}

class App extends React.Component<iProps, iState> {
  async componentDidMount() {
    await initFn();
  }
  render() {
    return (
      <Provider {...{ store }}>
        <I18n>
          <Router />
        </I18n>
      </Provider>
    );
  }
}

export default App;
