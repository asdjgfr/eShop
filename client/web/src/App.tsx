import React from "react";
import Router from "@/router";
import "./App.less";
import { Provider } from "mobx-react";
import store from "@/store";
import I18n from "@/i18n";
import initFn from "@/lib/rc.local";
import GlobalLoading from "@/components/GlobalLoading";

interface iProps {}
interface iState {}

class App extends React.Component<iProps, iState> {
  async componentDidMount() {
    await initFn();
  }
  render() {
    return (
      <Provider {...store}>
        <I18n>
          <GlobalLoading>
            <Router />
          </GlobalLoading>
        </I18n>
      </Provider>
    );
  }
}

export default App;
