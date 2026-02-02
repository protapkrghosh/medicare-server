import type { Request, Response } from "express";
import { auth } from "../lib/auth";

const register = async (req: Request, res: Response) => {
   try {
      const result = await auth.api.signUpEmail({
         body: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
         },
      });

      res.json(result);
   } catch (error) {
      res.status(500).json({ message: "Signup failed", error });
   }
};

const login = async (req: Request, res: Response) => {
   try {
      const result = await auth.api.signInEmail({
         body: {
            email: req.body.email,
            password: req.body.password,
         },
         headers: req.headers as any,
      });

      res.json(result);
   } catch (error) {
      res.status(500).json({ message: "Login failed", error });
   }
};

const logout = async (req: Request, res: Response) => {};

export const authController = {
   register,
   login,
   logout,
};
