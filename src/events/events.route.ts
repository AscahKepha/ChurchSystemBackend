import { Router } from "express";
import { getEvents, getEventsById, createEvents, updateevents, deleteevents } from "./events.controller";

export const eventsRouter = Router();

eventsRouter.get('/events', getEvents)

eventsRouter.get('/events/:id', getEventsById)

eventsRouter.post('/events', createEvents)

eventsRouter.put('/events/:id', updateevents)

eventsRouter.delete('/events/:id', deleteevents)




