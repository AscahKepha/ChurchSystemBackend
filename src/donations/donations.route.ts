import { Router } from "express";
import { getdonations, getdonationsById, updatedonations, createdonations, deletedonations } from "./donations.controller";

export const DonationsRouter = Router();

DonationsRouter.get("/", getdonations);

DonationsRouter.get("/:id", getdonationsById);

DonationsRouter.put("/:id", updatedonations);

DonationsRouter.post("/", createdonations);

DonationsRouter.delete("/:id", deletedonations);
