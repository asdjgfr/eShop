import React from "react";
import Router from "@/router";
import "./App.less";
import { Provider } from "mobx-react";
import Store from "@/store";
import I18n from "@/i18n";

const store = {
  store: new Store(),
};

interface iProps {}
interface iState {}
class App extends React.Component<iProps, iState> {
  render() {
    return (
      <Provider {...store}>
        <I18n>
          <Router />
        </I18n>
      </Provider>
    );
  }
}

export default App;
