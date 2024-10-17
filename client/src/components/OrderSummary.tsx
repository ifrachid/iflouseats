import { Minus, Trash } from "lucide-react";
import { CartItem } from "../pages/DetailsPage";
import { MenuItem, Restaurant } from "../types";
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
  reduceItemQuantity: (cartItem: CartItem) => void;
};

const OrderSummary = ({
  restaurant,
  cartItems,
  removeFromCart,
  reduceItemQuantity,
}: Props) => {
  const getTotalCost = () => {
    const totalInDollars = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    const totalWithDelivery = totalInDollars + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>Dh{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="flex flex-row gap-2">
                <Minus
                  className="border rounded-md cursor-pointer hover:bg-gray-200"
                  color="red"
                  onClick={() => reduceItemQuantity(item)}
                />
                <Badge variant="outline" className="mr-2">
                  {item.quantity}
                </Badge>
              </div>
              {item.name}
            </div>
            <span className="flex items-center gap-1">
              <Trash
                onClick={() => removeFromCart(item)}
                className="cursor-pointer"
                color="red"
                size={20}
                
              />
              DH {((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-center">
          <span>Delivery&nbsp;</span>
          <span>{(restaurant.deliveryPrice / 100).toFixed(2)} Dh</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
