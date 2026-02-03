import type { User } from "better-auth/types";
import type { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createOrder = async (data: Order) => {
   const order = await prisma.order.create({
      data,
   });

   return order;
};

const getAllOrders = async (userId: string) => {
   const orders = await prisma.order.findMany({
      where: {
         authorId: userId,
      },
   });

   if (!orders || orders.length === 0) {
      throw new Error("No orders found for this user.");
   }

   return orders;
};

// TODO: Role base own order validation
const getOrder = async (orderId: string) => {
   const order = await prisma.order.findUnique({
      where: {
         id: orderId,
      },
   });
   return order;
};

export const orderService = {
   createOrder,
   getAllOrders,
   getOrder,
};
