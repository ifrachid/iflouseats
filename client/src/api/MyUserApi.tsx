import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "../types";
import { useKeycloak } from "react-keycloak-js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { keycloak } = useKeycloak();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const token = keycloak?.idToken;
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { keycloak } = useKeycloak();
  const updateMyUserRequest = async () => {
    const token = keycloak?.idToken;
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);
  if (isSuccess) {
    toast.success("User Profile Udpated");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};
type CurentUser = {
  auth0Id: string;
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
export const useGetMyUser = () => {
  const { keycloak } = useKeycloak();

  const getMyUserRequest = async (): Promise<CurentUser> => {
    const token = keycloak?.idToken;
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response) {
      throw new Error("Failed to fetch user");
    }
    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest, {
    enabled: !!keycloak, // Only run the query if the token is available
  });

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};
