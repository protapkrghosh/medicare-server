import type { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createOrder = async (data: Order, authorId: string) => {
   const fineSeller = await prisma.medicine.findUnique({
      where: {
         id: data.medicineId,
      },
   });

   if (!fineSeller) {
      throw new Error("Seller not found.");
   }

   const order = await prisma.order.create({
      data: {
         ...data,
         authorId,
         sellerId: fineSeller.authorId as string,
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
