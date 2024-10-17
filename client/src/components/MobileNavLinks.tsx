import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useKeycloak } from "react-keycloak-js";

const MobileNavLinks = () => {
  const { keycloak } = useKeycloak();
  return (
    <>
      <Link
        className="flex bg-white items-center font-bold hover:text-green-500"
        to="/user-profile"
      ></Link>
      <Button
        className="flex items-center px-3 font-bold hover:bg-gray-500"
        onClick={() => keycloak?.logout()}
      >
        Log out
      </Button>
    </>
  );
};

export default MobileNavLinks;
