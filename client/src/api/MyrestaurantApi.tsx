
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "../types";
import { useKeycloak } from "react-keycloak-js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { keycloak } = useKeycloak();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const token = keycloak?.idToken;
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { keycloak } = useKeycloak();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const token = keycloak?.idToken;
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  };
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Created !");
  }
  if (error) {
    toast.error("unable to create restaurant");
  }
  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { keycloak } = useKeycloak();

  const updatedRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const token = keycloak?.idToken;
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }
    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updatedRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant updated");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }
  return { updateRestaurant, isLoading };
};
