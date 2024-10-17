import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "../forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "../api/MyUserApi";
import { useKeycloak } from "react-keycloak-js";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton = ({ disabled, onCheckout }: Props) => {
  const { keycloak } = useKeycloak();

  // const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const onLoging = async () => {
    keycloak?.login();
  };
  if (!keycloak?.authenticated || !currentUser) {
    return (
      <Button onClick={onLoging} className="bg-green-500 flex-1">
        Log in to Check out
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-green-500 flex-1">
          Go to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          buttonText="Confirm"
          title="Confirm delivery details"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
