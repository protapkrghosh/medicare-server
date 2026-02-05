var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import cors from "cors";
import express from "express";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String     @id\n  name          String\n  email         String     @unique\n  emailVerified Boolean    @default(false)\n  image         String?\n  role          String?    @default("CUSTOMER")\n  status        UserStatus @default(ACTIVE)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  sessions Session[]\n  accounts Account[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum UserStatus {\n  ACTIVE\n  BANNED\n  SUSPENDED\n  PENDING\n  INACTIVE\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String  @unique\n  description String? @default("Represents a pharmaceutical product with dosage, pricing, and availability information.") @db.Text\n\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n  medicines Medicine[]\n}\n\nmodel Medicine {\n  id           String   @id @default(uuid())\n  authorId     String\n  name         String   @db.VarChar(255)\n  description  String   @db.Text\n  price        Float    @default(0)\n  stock        Int      @default(0)\n  image        String\n  manufacturer String\n  isActive     Boolean  @default(true)\n  categoryId   String\n  category     Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n\n  reviews Review[]\n  orders  Order[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([name, price, manufacturer])\n  @@map("Medicines")\n}\n\nmodel Order {\n  id         String   @id @default(uuid())\n  authorId   String\n  sellerId   String\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n\n  shippingAddress String\n  status          OrderStatus   @default(PLACED)\n  paymentMethod   PaymentStatus @default(CASH_ON_DELIVERY)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum OrderStatus {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  CASH_ON_DELIVERY\n  MOBILE_BANKING\n  BANKING\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  rating     Int?\n  comment    String?  @db.Text\n  authorId   String\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n\n  parentId String?\n  parent   Review? @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)\n\n  replies Review[]      @relation("CommentReplies")\n  status  CommentStatus @default(APPROVED)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum CommentStatus {\n  APPROVED\n  REJECT\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"}],"dbName":null},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"orders","kind":"object","type":"Order","relationName":"MedicineToOrder"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"Medicines"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrder"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"paymentMethod","kind":"enum","type":"PaymentStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"parentId","kind":"scalar","type":"String"},{"name":"parent","kind":"object","type":"Review","relationName":"CommentReplies"},{"name":"replies","kind":"object","type":"Review","relationName":"CommentReplies"},{"name":"status","kind":"enum","type":"CommentStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MedicineScalarFieldEnum: () => MedicineScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Category: "Category",
  Medicine: "Medicine",
  Order: "Order",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  role: "role",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MedicineScalarFieldEnum = {
  id: "id",
  authorId: "authorId",
  name: "name",
  description: "description",
  price: "price",
  stock: "stock",
  image: "image",
  manufacturer: "manufacturer",
  isActive: "isActive",
  categoryId: "categoryId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  authorId: "authorId",
  sellerId: "sellerId",
  medicineId: "medicineId",
  shippingAddress: "shippingAddress",
  status: "status",
  paymentMethod: "paymentMethod",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  authorId: "authorId",
  medicineId: "medicineId",
  parentId: "parentId",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER" /* CUSTOMER */,
        required: true
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent"
    }
  }
});

// src/app.ts
import { toNodeHandler } from "better-auth/node";

// src/modules/medicine/medicine.route.ts
import { Router } from "express";

// src/modules/medicine/medicine.service.ts
var getAllMedicines = async () => {
  const medicines = await prisma.medicine.findMany({
    where: {
      stock: {
        notIn: [0]
      }
    }
  });
  return medicines;
};
var getMedicine = async (medicineId) => {
  const medicine = await prisma.medicine.findUnique({
    where: {
      id: medicineId
    }
  });
  return medicine;
};
var getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};
var getSellerOrders = async (sellerId) => {
  const orders = await prisma.order.findMany({
    where: {
      sellerId
    }
  });
  return orders;
};
var createMedicine = async (data, authorId) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      authorId
    }
  });
  return result;
};
var updateMedicine = async (medicineId, data) => {
  const medicine = await prisma.medicine.update({
    where: {
      id: medicineId
    },
    data
  });
  return medicine;
};
var updateOrder = async (orderId, userId, data) => {
  const orders = await prisma.order.update({
    where: {
      id: orderId
    },
    data
  });
  if (orders.sellerId !== userId) {
    throw new Error("You're not authorized to update this order.");
  }
  return orders;
};
var deleteMedicine = async (medicineId) => {
  const medicine = await prisma.medicine.delete({
    where: {
      id: medicineId
    }
  });
  return medicine;
};
var createCategory = async (data) => {
  const category = await prisma.category.create({
    data
  });
  return category;
};
var medicineService = {
  getAllMedicines,
  getMedicine,
  getCategories,
  getSellerOrders,
  createMedicine,
  updateMedicine,
  updateOrder,
  deleteMedicine,
  createCategory
};

// src/modules/medicine/medicine.controller.ts
var getAllMedicines2 = async (req, res, next) => {
  try {
    const result = await medicineService.getAllMedicines();
    res.status(200).json({
      success: true,
      message: "All medicines has been successfully obtained.",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getMedicine2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const medicine = await medicineService.getMedicine(id);
    res.status(200).json({
      success: true,
      message: "The medicine has been successfully obtained.",
      data: medicine
    });
  } catch (error) {
    next(error);
  }
};
var getCategories2 = async (req, res, next) => {
  try {
    const categories = await medicineService.getCategories();
    res.status(200).json({
      success: true,
      message: "All categories has been successfully obtained.",
      data: categories
    });
  } catch (error) {
    next(error);
  }
};
var getSellerOrders2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }
    const result = await medicineService.getSellerOrders(user.id);
    res.status(200).json({
      success: true,
      message: "All orders has been successfully obtained.",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var createMedicine2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }
    const result = await medicineService.createMedicine(req.body, user.id);
    res.status(201).json({
      success: true,
      message: "Medicine created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateMedicine2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const medicine = await medicineService.updateMedicine(
      id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Medicine updated successfully.",
      data: medicine
    });
  } catch (error) {
    next(error);
  }
};
var updateOrder2 = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated"
    });
  }
  const result = await medicineService.updateOrder(
    id,
    user.id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Order updated successfully.",
    data: result
  });
};
var deleteMedicine2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const medicine = await medicineService.deleteMedicine(id);
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully."
      // data: medicine,
    });
  } catch (error) {
    next(error);
  }
};
var createCategory2 = async (req, res, next) => {
  try {
    const category = await medicineService.createCategory(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });
  } catch (error) {
    next(error);
  }
};
var medicineController = {
  getAllMedicines: getAllMedicines2,
  getMedicine: getMedicine2,
  getCategories: getCategories2,
  getSellerOrders: getSellerOrders2,
  createMedicine: createMedicine2,
  updateMedicine: updateMedicine2,
  updateOrder: updateOrder2,
  deleteMedicine: deleteMedicine2,
  createCategory: createCategory2
};

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized"
        });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden. You don't have permission to access this resources!"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth2;

// src/modules/medicine/medicine.route.ts
var router = Router();
router.get("/medicines", medicineController.getAllMedicines);
router.get("/medicines/:id", medicineController.getMedicine);
router.get("/categories", medicineController.getCategories);
router.get(
  "/seller/orders",
  auth_default("SELLER" /* SELLER */),
  medicineController.getSellerOrders
);
router.post(
  "/seller/medicines",
  auth_default("SELLER" /* SELLER */),
  medicineController.createMedicine
);
router.put(
  "/seller/medicines/:id",
  auth_default("SELLER" /* SELLER */),
  medicineController.updateMedicine
);
router.patch(
  "/seller/orders/:id",
  auth_default("SELLER" /* SELLER */),
  medicineController.updateOrder
);
router.delete(
  "/seller/medicines/:id",
  auth_default("SELLER" /* SELLER */),
  medicineController.deleteMedicine
);
router.post(
  "/categories",
  auth_default("ADMIN" /* ADMIN */),
  medicineController.createCategory
);
var medicineRouter = router;

// src/authentication/auth.route.ts
import { Router as Router2 } from "express";

// src/authentication/auth.controller.ts
var register = async (req, res) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.user?.role
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};
var login = async (req, res) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: req.body.email,
        password: req.body.password
      },
      headers: req.headers
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
var logout = async (req, res) => {
};
var profile = async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(401).json({ message: "No cookie found" });
    }
    const session = await auth.api.getSession({
      headers: {
        cookie
      }
    });
    if (!session) {
      return res.status(401).json({ message: "Invalid session" });
    }
    res.json(session.user);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error });
  }
};
var authController = {
  register,
  login,
  logout,
  profile
};

// src/authentication/auth.route.ts
var router2 = Router2();
router2.post("/register", authController.register);
router2.post("/login", authController.login);
router2.get("/me", authController.profile);
var authRouter = router2;

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route no found",
    path: req.originalUrl,
    date: Date()
  });
}

// src/middleware/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Unique constraint failed.";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = "Internal server error occurred while processing the database request.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your credentials.";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach database server.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing field.";
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/modules/user/user.route.ts
import { Router as Router3 } from "express";

// src/modules/user/user.service.ts
var getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: {
        notIn: ["ADMIN"]
      }
    }
  });
  return users;
};
var updateUser = async (userId, data) => {
  const users = await prisma.user.update({
    where: {
      id: userId
    },
    data
  });
  return users;
};
var userService = {
  getAllUsers,
  updateUser
};

// src/modules/user/user.controller.ts
var getAllUsers2 = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "All users were successfully found.",
      data: users
    });
  } catch (error) {
    next(error);
  }
};
var updateUser2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};
var userController = {
  getAllUsers: getAllUsers2,
  updateUser: updateUser2
};

// src/modules/user/user.route.ts
var router3 = Router3();
router3.get("/users", auth_default("ADMIN" /* ADMIN */), userController.getAllUsers);
router3.patch("/users/:id", auth_default("ADMIN" /* ADMIN */), userController.updateUser);
var userRouter = router3;

// src/modules/order/order.route.ts
import { Router as Router4 } from "express";

// src/modules/order/order.service.ts
var createOrder = async (data, authorId) => {
  const findSeller = await prisma.medicine.findUnique({
    where: {
      id: data.medicineId
    }
  });
  if (!findSeller) {
    throw new Error("Seller not found.");
  }
  const order = await prisma.order.create({
    data: {
      ...data,
      authorId,
      sellerId: findSeller.authorId
    }
  });
  return order;
};
var getAllOrders = async (userId) => {
  const orders = await prisma.order.findMany({
    where: {
      authorId: userId
    }
  });
  if (!orders || orders.length === 0) {
    throw new Error("No orders found for this user.");
  }
  return orders;
};
var getOrder = async (orderId, userId) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    }
  });
  if (order?.authorId !== userId) {
    throw new Error("You're not authorized to get this order.");
  }
  return order;
};
var orderService = {
  createOrder,
  getAllOrders,
  getOrder
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }
    const order = await orderService.createOrder(req.body, user.id);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });
  } catch (error) {
    next(error);
  }
};
var getAllOrders2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }
    const order = await orderService.getAllOrders(user.id);
    res.status(200).json({
      success: true,
      message: "All orders has been successfully obtained.",
      data: order
    });
  } catch (error) {
    next(error);
  }
};
var getOrder2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }
    const order = await orderService.getOrder(
      id,
      user.id
    );
    res.status(200).json({
      success: true,
      message: "The order has been successfully obtained.",
      data: order
    });
  } catch (error) {
    next(error);
  }
};
var orderController = {
  createOrder: createOrder2,
  getAllOrders: getAllOrders2,
  getOrder: getOrder2
};

// src/modules/order/order.route.ts
var router4 = Router4();
router4.post("/orders", auth_default("CUSTOMER" /* CUSTOMER */), orderController.createOrder);
router4.get("/orders", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getAllOrders);
router4.get("/orders/:id", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getOrder);
var orderRouter = router4;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api", medicineRouter);
app.use("/api", orderRouter);
app.use("/api/admin", userRouter);
app.get("/", (req, res) => {
  res.send("MediCare server is running ...");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
