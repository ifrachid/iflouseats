import { Link } from "react-router-dom";
import { useGetOrderByUser } from "../api/OrderApi";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Repeat } from "lucide-react";

const RecentOrders = () => {
  const { orders } = useGetOrderByUser();
  if (orders?.length===0) {
    return <div></div>;
  }
    return (
      <div className="flex flex-row gap-4">
        <div className="flex flex-row  text-lg font-semibold ">
          <Repeat color="green" size={48} /> Order Again :
        </div>

        <div className="grid grid-cols-3 ">
          {orders?.slice(0, 3).map((order) => (
            <Link to={`/details/${order.restaurant._id}`}>
              <Card className="flex flex-row">
                <CardContent className="">
                  <AspectRatio ratio={3/1}>
                    <img
                      src={order.restaurant.imageUrl}
                      className="rounded-md h-full w-full object-cover pt-2 "
                    />
                  </AspectRatio>

                  <div className="flex flex-col gap-2 text-lg font-semibold mb-2">
                    {order.restaurant.restaurantName}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
};

export default RecentOrders;
