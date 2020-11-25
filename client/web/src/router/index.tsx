import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import history from "@/router/history";
import AuthRoutes from "@/router/AuthRoutes";
import SuspenseLoading from "@/components/SuspenseLoading";

const HistoryContext = React.createContext({ history });

export default function App() {
  return (
    <Router history={history}>
      <HistoryContext.Provider value={{ history }}>
        <Suspense fallback={<SuspenseLoading />}>
          <AuthRoutes />
        </Suspense>
      </HistoryContext.Provider>
    </Router>
  );
}
