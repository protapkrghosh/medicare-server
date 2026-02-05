import type { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createOrder = async (data: Order, authorId: string) => {
   const findSeller = await prisma.medicine.findUnique({
      where: {
         id: data.medicineId,
      },
   });

   if (!findSeller) {
      throw new Error("Seller not found.");
   }

   const order = await prisma.order.create({
      data: {
         ...data,
         authorId,
         sellerId: findSeller.authorId as string,
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

const getOrder = async (orderId: string, userId: string) => {
   const order = await prisma.order.findUnique({
      where: {
         id: orderId,
      },
   });

   if (order?.authorId !== userId) {
      throw new Error("You're not authorized to get this order.");
   }

   return order;
};

export const orderService = {
   createOrder,
   getAllOrders,
   getOrder,
};
