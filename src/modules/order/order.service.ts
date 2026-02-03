import type { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createOrder = async (data: Order) => {
   const order = await prisma.order.create({
      data,
   });

   return order;
};

// TODO: Role base own order validation
const getAllOrders = async () => {
   const orders = await prisma.order.findMany();
   return orders;
};

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
