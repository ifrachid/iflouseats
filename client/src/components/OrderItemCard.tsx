import { Order } from "../api/OrderApi";
import { AspectRatio } from "./ui/aspect-ratio";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const getTime = () => {
    const orderDateTime = new Date(order.createAt);
    const year = orderDateTime.getFullYear();
    const month = orderDateTime.getMonth() + 1;
    const dt = orderDateTime.getDate();

    
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${dt}-${month}-${year}  at ${hours}:${paddedMinutes}`;
  };
 
    return (
      <Card>
        <CardHeader>
          <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
            <div>
              Customer Name :
              <span className="ml-2 font-normal">
                {order.deliveryDetails.name}
              </span>
            </div>
            <div>
              Delivery Address :
              <span className="ml-2 font-normal">
                {order.deliveryDetails.addressLine1} ,
                {order.deliveryDetails.city}
              </span>
            </div>
            <div>
              Order Creation Date :
              <span className="ml-2 font-normal "> {getTime()}</span>
            </div>
            <div className="ml-8">
              Status :
              <span className="ml-2 font-normal "> {order.status}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col gap-6 font-semibold">
              Ordered Items :
              <span className="flex ml-2 gap-2 font-normal">
                {order.cartItems.map((cartItem) => (
                  <span>
                    <Badge variant={"outline"} className="mr-2">
                      x{cartItem.quantity}
                    </Badge>
                    {cartItem.name}
                  </span>
                ))}
              </span>
            </div>
            <div className="text-xl font-semibold mt-12">
              Total Cost :
              <span className="ml-2 font-normal ">
                {(order.total / 100).toFixed(2)} Dh
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
};

export default OrderItemCard;
