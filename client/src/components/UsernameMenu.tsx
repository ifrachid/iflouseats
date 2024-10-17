import { CircleUserRound, Divide, LinkIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useKeycloak } from "react-keycloak-js";

const UsernameMenu = () => {
  const { keycloak } = useKeycloak();
  console.log(keycloak?.tokenParsed?.realm_access?.roles);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-green-500 gap-2">
        <CircleUserRound className="text-green-500" />
        {keycloak?.idTokenParsed?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button
            className="flex flex-1 font-bold bg-slate-600"
            onClick={keycloak?.accountManagement}
          >
            <LinkIcon /> My Account
          </Button>
        </DropdownMenuItem>
        {keycloak?.tokenParsed?.realm_access?.roles.includes("seller") ? (
          <DropdownMenuItem>
            <Link
              to="/manage-restaurant"
              className="font-bold hover:text-green-500"
            >
              Manage Restaurant
            </Link>
          </DropdownMenuItem>
        ) : (
          <div></div>
        )}
        {keycloak?.tokenParsed?.realm_access?.roles.includes("admin") ? (
          <DropdownMenuItem>
            <Link
              to="/adminpage"
              className="font-bold hover:text-green-500"
            >
              Admin Page
            </Link>
          </DropdownMenuItem>
        ) : (
          <div></div>
        )}

        <DropdownMenuItem>
          <Link to="/allOrders" className="font-bold hover:text-green-500">
            My Orders History
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            className="flex flex-1 font-bold bg-green-500"
            onClick={() => keycloak?.logout()}
          >
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
