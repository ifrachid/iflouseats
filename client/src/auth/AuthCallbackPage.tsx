import { useEffect, useRef } from "react";
import {
  useCreateMyUser,
  useGetMyUser,
  useUpdateMyUser,
} from "../api/MyUserApi";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "react-keycloak-js";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const { createUser } = useCreateMyUser();
  const { currentUser } = useGetMyUser();
  const hasCreatedUser = useRef(false);
  if (
    keycloak?.tokenParsed?.email == currentUser?.email &&
    keycloak?.tokenParsed?.sub != currentUser?.auth0Id
  ) {
    hasCreatedUser.current = true;
  }

  const { updateUser } = useUpdateMyUser();
  useEffect(() => {
    if (
      keycloak?.tokenParsed?.sub &&
      keycloak?.tokenParsed?.email &&
      !hasCreatedUser.current
    ) {
      createUser({
        auth0Id: keycloak.tokenParsed?.sub,
        email: keycloak?.tokenParsed?.email,
      });
      hasCreatedUser.current = true;
    } else if (
      keycloak?.tokenParsed?.email == currentUser?.email &&
      keycloak?.tokenParsed?.sub != currentUser?.auth0Id
    ) {
      updateUser();
    }
    navigate("/");
  }, [createUser, navigate, keycloak]);

  return <div>AuthCallbackPage</div>;
};

export default AuthCallbackPage;
