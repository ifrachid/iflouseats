import { useMutation, useQuery } from "react-query";
import { UserFormData } from "../forms/user-profile-form/UserProfileForm";
import { CartItem } from "../pages/DetailsPage";
import { Restaurant, User } from "../types";
import { useKeycloak } from "react-keycloak-js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type CreateOrderRequest = {
  deliveryDetails: UserFormData;
  cartItems: CartItem[];
  restaurantId: string;
  total: number;
  userId: string;
  status: string;
};
export type Order = {
  deliveryDetails: UserFormData;
  cartItems: CartItem[];
  restaurant: Restaurant;
  total: number;
  user: User;
  status: string;
  createAt: string;
};

export const useCreateOrder = () => {
  const createNewOrder = async (order: CreateOrderRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Failed to create your order.");
    }
    return response.json();
  };
  const {
    mutate: createOrder,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createNewOrder);

  return { createOrder, isError, isLoading, isSuccess };
};

export const useGetOrder = (orderId?: string) => {
  const getOrderById = async (): Promise<Order> => {
    const response = await fetch(
      `${API_BASE_URL}/api/orders/detail/${orderId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get Order");
    }
    return response.json();
  };

  const { data: order, isLoading } = useQuery("fetchOrderById", getOrderById, {
    enabled: !!orderId,
  });

  return { order, isLoading };
};

export const useGetOrderByUser = (userId:string) => {
  const { keycloak } = useKeycloak();
  const getOrderByUser = async (): Promise<Order[]> => {
    const token = keycloak?.idToken;
    const response = await fetch(`${API_BASE_URL}/api/orders/user`, {
      method: "GET",
      headers: {
        Authorization: userId,
        "Content-Type": "application/json",
      },
      
    });
    if (!response.ok) {
      throw new Error("Failed to get Orders");
    }
    return response.json();
  };

  const { data: orders, isLoading } = useQuery("fetchOrders", getOrderByUser,{
    enabled: !!userId,
  });

  return { orders, isLoading };
};

export const useGetOrderByRestaurant = (restaurantId: string) => {
  const getOrderByRestaurant = async (): Promise<Order[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/orders/restaurant/${restaurantId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get Orders");
    }
    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchRestaurantOrders",
    getOrderByRestaurant,
    {
      enabled: !!restaurantId,
    }
  );

  return { orders, isLoading };
};
