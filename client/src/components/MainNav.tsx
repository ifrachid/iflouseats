import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";

import ContactForm from "../forms/contact-form/ContactForm";
import { useContactApi } from "../api/ContactApi";
import { useKeycloak } from "react-keycloak-js";

const MainNav = () => {
  const { postContact } = useContactApi();
  const { keycloak } = useKeycloak();
  console.log(keycloak?.tokenParsed);
  return (
    <span className="flex space-x-2 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="font-bold text-white hover:text-white bg-gray-500 hover:bg-slate-800"
          >
            Contact us
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
          <ContactForm onSave={postContact} isLoading={false} />
        </DialogContent>
      </Dialog>
      {keycloak?.authenticated ? (
        <UsernameMenu />
      ) : (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="font-bold hover:text-white hover:bg-green-500"
            onClick={() => keycloak?.login()}
          >
            Log In
          </Button>
          <Button
            variant="ghost"
            className="font-bold hover:text-white hover:bg-green-500"
            onClick={() => keycloak?.register()}
          >
            Register
          </Button>
        </div>
      )}
    </span>
  );
};

export default MainNav;
