import { useNavigate, useParams } from "react-router-dom";
import { useGetRestaurant } from "../api/RestaurantApi";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "../components/RestaurantInfo";
import MenuItemCard from "../components/MenuItemCard";
import { useState } from "react";
import { Card, CardFooter } from "../components/ui/card";
import OrderSummary from "../components/OrderSummary";
import { MenuItem } from "../types";
import CheckoutButton from "../components/CheckoutButton";
import { UserFormData } from "../forms/user-profile-form/UserProfileForm";
import { CreateOrderRequest, useCreateOrder } from "../api/OrderApi";
import { useGetMyUser } from "../api/MyUserApi";
import { toast } from "sonner";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
const DetailsPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useGetMyUser();
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createOrder, isError, isSuccess } = useCreateOrder();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-MAD {restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedList = prevCartItems.filter(
        (item) => item._id !== cartItem._id
      );
      sessionStorage.setItem(
        `cartItems- MAD {restaurantId}`,
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
  };
  const reduceItemQuantity = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.reduce((acc, item) => {
        if (item._id === cartItem._id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        sessionStorage.setItem(
          `cartItems-MAD {restaurantId}`,
          JSON.stringify(acc)
        );
        return acc;
      }, [] as CartItem[]);
    });
  };

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-MAD {restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  if (isLoading || !restaurant) {
    return "...Loading";
  }

  const onCheckout = (userFormData: UserFormData) => {
    const total = cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.price * cartItem.quantity;
    }, 0);

    if (!currentUser) {
      toast.error("An error has occured please try again");
    } else {
      const order: CreateOrderRequest = {
        deliveryDetails: userFormData,
        cartItems,
        restaurantId: restaurant._id,
        total,
        userId: currentUser._id,
        status: "placed",
      };
      const orderId = createOrder(order);
      toast.success("Your Order has submitted !");

      navigate(`orders/${orderId}`);
    }
  };
  console.log(currentUser);
  return (
    <div className="flex flex-col gap-4">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItemCard
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              reduceItemQuantity={reduceItemQuantity}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
