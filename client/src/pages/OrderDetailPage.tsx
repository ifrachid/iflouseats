import { useParams } from "react-router-dom";
import { useGetOrder } from "../api/OrderApi";
import LoadingButton from "../components/LoadingButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Dot } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { AspectRatio } from "../components/ui/aspect-ratio";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { order, isLoading } = useGetOrder(orderId);

  if (isLoading) {
    return <span className="text-xl animate-pulse">...loading</span>;
  }
  console.log("Order: ", order);
  return (
    <div>
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row justify-between">
              <span className="text-3xl font-bold">Your Order</span>
              <span className="text-2xl font-semibold bg-slate-100 p-4 rounded-lg">
                Status : {order?.status}
              </span>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="flex flex-col">
              <span className="text-xl">Details about your current Order</span>
              #66c0383e5c69f1b5047c28ad
            </div>
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-4 ">
              <span className="text-xl font-bold ">Items</span>

              {order?.cartItems.map((cartItem) => (
                <div className="flex flex-row gap-12">
                  <div className="flex flex-row">
                    <Dot />
                    {cartItem.name}
                  </div>
                  <Badge variant={"outline"}>{cartItem.quantity}</Badge>
                </div>
              ))}

              <Separator />
              <div className="flex flex-row justify-between">
                <span className="text-xl font-bold">Delivery Details</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="  flex  gap-4 ">
                  <span className="text-lg font-semibold">City :</span>
                  {order?.deliveryDetails.city}
                </span>
                <span className="  flex  gap-4 ">
                  <span className="text-lg font-semibold">Country :</span>
                  {order?.deliveryDetails.country}
                </span>
                <span className="  flex  gap-4 ">
                  <span className="text-lg font-semibold">Address :</span>
                  {order?.deliveryDetails.addressLine1}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-16">
              <AspectRatio ratio={16 / 5}>
                <img
                  src={order?.restaurant.imageUrl}
                  className="rounded-md h-full w-full object-cover"
                />
              </AspectRatio>
              <span className="text-2xl font-bold text-right">
                Total Cost :Dh {order?.total / 100}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailPage;
