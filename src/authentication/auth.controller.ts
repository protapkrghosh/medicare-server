import type { Request, Response } from "express";
import { auth } from "../lib/auth";

const register = async (req: Request, res: Response) => {
   try {
      const result = await auth.api.signUpEmail({
         body: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.user?.role,
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

const profile = async (req: Request, res: Response) => {
   try {
      const cookie = req.headers.cookie;

      if (!cookie) {
         return res.status(401).json({ message: "No cookie found" });
      }

      const session = await auth.api.getSession({
         headers: {
            cookie,
         },
      });

      if (!session) {
         return res.status(401).json({ message: "Invalid session" });
      }

      res.json(session.user);
   } catch (error) {
      res.status(401).json({ message: "Unauthorized", error });
   }
};

export const authController = {
   register,
   login,
   logout,
   profile,
};
