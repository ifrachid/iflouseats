import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import { KcPage, type KcContext } from "./keycloak-theme/kc.gen";
import { KeycloakProvider } from "react-keycloak-js";
const keycloak = {
  url: "http://localhost:8080/",
  realm: "IFLOUSEATS",
  clientId: "MyRealmID",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {window.kcContext ? (
      <KcPage kcContext={window.kcContext} />
    ) : (
      <Suspense>
        <KeycloakProvider
          keycloakConfig={keycloak}
          initOptions={{ onLoad: "check-sso" }}
        >
          <Router>
            <QueryClientProvider client={queryClient}>
              <AppRoutes />
              <Toaster visibleToasts={1} position="top-right" richColors />
            </QueryClientProvider>
          </Router>
        </KeycloakProvider>
      </Suspense>
    )}
  </React.StrictMode>
);
declare global {
  interface Window {
    kcContext?: KcContext;
  }
}
