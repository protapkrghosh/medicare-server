import type { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json({
         success: true,
         message: "Order created successfully",
         data: order,
      });
   } catch (error) {
      next(error);
   }
};

const getAllOrders = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const order = await orderService.getAllOrders();
      res.status(200).json({
         success: true,
         message: "All orders has been successfully obtained.",
         data: order,
      });
   } catch (error) {
      next(error);
   }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const order = await orderService.getOrder(id as string);
      res.status(200).json({
         success: true,
         message: "The order has been successfully obtained.",
         data: order,
      });
   } catch (error) {
      next(error);
   }
};

export const orderController = {
   createOrder,
   getAllOrders,
   getOrder,
};
