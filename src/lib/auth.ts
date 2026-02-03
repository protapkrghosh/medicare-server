import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { UserRole } from "../middleware/auth";

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
      provider: "postgresql",
   }),

   trustedOrigins: [process.env.APP_URL!],

   user: {
      additionalFields: {
         role: {
            type: "string",
            defaultValue: UserRole.CUSTOMER,
            required: true,
         },
         status: {
            type: "string",
            defaultValue: "ACTIVE",
            required: false,
         },
      },
   },

   emailAndPassword: {
      enabled: true,
      autoSignIn: false,
   },
});
