import { Router } from "express";
import { createMinistries, deleteMinistries, getMinistries, getMinistriesById, updateMinistries } from "./ministries.controller";

export const ministriesRouter =Router();

//Ministries routes definition
ministriesRouter.get('/ministries', getMinistries);

ministriesRouter.get('/ministries/:id', getMinistriesById);

ministriesRouter.post('/ministries', createMinistries);

ministriesRouter.put('/ministries/:id', updateMinistries);

ministriesRouter.delete('ministries/:id', deleteMinistries);
