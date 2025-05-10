import express from "express";
import { getAllUsers } from "./../controller/user";
import { authenticate } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/roles";

const router = express.Router();

router.get(
    "/",
    authenticate as any,
    authorizeRoles("ADMIN") as any,
    getAllUsers as any
);

export default router;
