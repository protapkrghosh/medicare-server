import { auth as betterAuth } from "../lib/auth";
import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../types/roles";

declare global {
   namespace Express {
      interface Request {
         user?: {
            id: string;
            name: string;
            email: string;
            role: string;
         };
      }
   }
}

const auth = (...roles: UserRole[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         const session = await betterAuth.api.getSession({
            headers: req.headers as any,
         });

         if (!session) {
            return res.status(401).json({
               success: false,
               message: "Unauthorized",
            });
         }

         req.user = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            role: session.user.role as string,
         };

         if (roles.length && !roles.includes(req.user.role as UserRole)) {
            return res.status(403).json({
               success: false,
               message:
                  "Forbidden. You don't have permission to access this resources!",
            });
         }
         next();
      } catch (error) {
         next(error);
      }
   };
};

export default auth;
