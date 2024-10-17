import React from "react";
import { useGetMyUser } from "../api/MyUserApi";
import { useGetOrderByUser } from "../api/OrderApi";
import OrderItemCard from "../components/OrderItemCard";

const OrdersPage = () => {
  const {currentUser}=useGetMyUser();
  const { orders } = useGetOrderByUser(currentUser?._id);
  console.log(currentUser);
  
  

  return (
    <div className="flex flex-col gap-6 ">
      <h2 className="text-3xl font-bold mr-2">Your Order History</h2>
      {orders?.map((order) => (
        <OrderItemCard order={order} />
      ))}
    </div>
  );
};

export default OrdersPage;
