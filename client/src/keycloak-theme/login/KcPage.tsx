import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { tss } from "tss-react";
const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { classes } = useStyles();
  const { i18n } = useI18n({ kcContext });

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "register.ftl":
            return (
              <Register
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={true}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
          case "login.ftl":
            return (
              <Login
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={true}
              />
            );
          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={true}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
        }
      })()}
    </Suspense>
  );
}

const useStyles = tss.create({
  kcHtmlClass: { ":root": { colorScheme: "dark" } },
  kcBodyClass: {
    backgroundColor: "#FFFFFF",
    color: "#22c55e",
  },
} satisfies { [key in ClassKey]?: unknown });
