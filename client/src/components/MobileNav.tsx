import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
import { useKeycloak } from "react-keycloak-js";

const MobileNav = () => {
  const { keycloak } = useKeycloak();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-green-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {keycloak?.authenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className=" text-green-500" />
              {keycloak?.idTokenParsed?.email}
            </span>
          ) : (
            <span>Welcome to IFLOUSEATS.com</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4 ">
          {keycloak?.authenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              className="flex-1 font-bold bg-green-500"
              onClick={() => keycloak?.login()}
            >
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
