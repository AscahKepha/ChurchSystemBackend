import {Request, Response} from "express";
import { createannouncementsservices, deleteannouncementsservice, getAnnouncementsByIdServices, getAnnouncementsServices, updateannouncementsservice } from "./announcements.service";


//create announcements
export const createannouncements = async (req: Request, res:Response) => {
    const {title, content} = req.body;
    if (!title || !content) {
        res.status(400).json({error: "All fields are required"});
        return;
    }
    try {
        const newAnnouncement = await createannouncementsservices({title, content});
        if (newAnnouncement == null) {
            res.status(500).json({message: "Failed 🙆‍♂️ to createannouncement" });
            return;
        } else {
            res.status(201).json(newAnnouncement);
        }
    }catch (error: any) {
        res.status(500).json({error:error.message || "Failed 🙆‍♂️ to createannouncement"});
    }
}

//get annoncements
export const getannouncements = async (req: Request, res:Response) => {
    try {
        const allAnnouncements = await getAnnouncementsServices();
        if (allAnnouncements == null || allAnnouncements.length ==0) {
            res.status(404).json({message: "No annoncements found"});
        }else{
            res.status(200).json(allAnnouncements);

        }
    } catch (error: any) {
        res.status(500).json({error:error.message || "Failed ⛓️‍💥 to get announcements"});
    }
}

//get announcements by Id
export const getannouncementsById = async (req: Request, res:Response) => {
    const announcement_Id = parseInt(req.params.id);
    if (isNaN(announcement_Id)) {
        res.status(400).json({error: "Invalid 💀 announcements ID"});
        return;
    }
    try{
        const announcement = await getAnnouncementsByIdServices(announcement_Id);
        if (announcement == null) {
            res.status(404).json({ message: "Announcement not found 🔍"});

        } else {
            res.status(200).json(announcement);
        }
    }catch (error:any) {
        res.status(500).json({error:error.message || "Failed ⛓️‍💥 to get announcement by ID"});
    }
}

//update announcements
export const updateannouncements = async (req: Request, res:Response) => {
    const announcement_Id = parseInt(req.params.id);
    if (isNaN(announcement_Id)) {
        res.status(400).json({error: "Invalid 💀 announcements ID"});
        return;
    }
    const {title, content} =req.body;
    if (!title || !content) {
        res.status(400).json({error: "All fields required"});
        return;
    }
    try{
        const updatedAnnouncements = await updateannouncementsservice(announcement_Id, {title, content});
        if (updatedAnnouncements == null) {
            res.status(404).json({message: "Announcement not found 🔍 or failed to update"});
        } else{
            res.status(200).json(updatedAnnouncements);
        }
    }catch (error:any) {
        res.status(500).json({error:error.message || "Failed to update announcements"});
    }
}

//delete announcements
export const deleteannouncements = async (req:Request , res:Response) => {
    const announcementId = parseInt(req.params.id);
    if(isNaN(announcementId)) {
        res.status(400).json({error: "Invalid 💀 announcements ID"});
        return;
    }
    try{
        const deletedAnnouncement = await deleteannouncementsservice(announcementId);
        if (deletedAnnouncement == null) {
            res.status(404).json({message: "Announcement not found 🔍 or failed to delete"});
        } else {
            res.status(200).json({message: "Announcement deleted successfully 🗑️"});
        }
    } catch (error: any) {
        res.status(500).json({error:error.message || "Failed to delete announcements"});
    }
}