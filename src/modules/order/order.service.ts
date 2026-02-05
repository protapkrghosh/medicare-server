import type { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createOrder = async (data: Order, authorId: string) => {
   const order = await prisma.order.create({
      data: {
         ...data,
         authorId,
      },
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

const getOrder = async (userId: string) => {
   const order = await prisma.order.findFirst({
      where: {
         authorId: userId,
      },
   });

   if (!order) {
      throw new Error("No orders found for this user.");
   }
   return order;
};

export const orderService = {
   createOrder,
   getAllOrders,
   getOrder,
};
