import { Router } from "express";
import { getAnnouncements, getAnnouncementsById, createAnnouncements, updateAnnouncements, deleteAnnouncements } from "./announcements.controller";

export const announcementsRouter = Router();

announcementsRouter.get('/announcements', getAnnouncements);

announcementsRouter.get('/announcements/:id', getAnnouncementsById);  

announcementsRouter.post('/announcements', createAnnouncements);

announcementsRouter.put('/announcements/:id', updateAnnouncements);

announcementsRouter.delete('/announcements/:id', deleteAnnouncements);