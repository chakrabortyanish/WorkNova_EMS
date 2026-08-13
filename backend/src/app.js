import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

//* all routes
import { employeeRoutes, adminRoutes } from "./routes/index.js";

//Allow client requests
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1/employee", employeeRoutes);
