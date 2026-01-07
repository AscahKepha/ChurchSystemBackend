import {Request, Response}from "express";
import { createeventsServices, deleteeventsServices, geteventsServices, geteventsByIdServices,updateeventsServices } from "./events.service";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
//business logic 

//Business logic for getevents
export const getEvents= async(req:Request, res:Response)=>{
    try {
        const allevents = await geteventsServices();
        if (allevents == null || allevents.length == 0){
            res.status(404).json({message:" No eventss found"});
        }else {
            res.status(200).json(allevents);

        }
    }
        catch (error: any) {
            res.status(500).json({error: error.message || "Failed to fetch events"});
        }
}

//Business logic for geteventsById
export const getEventsById= async(req:Request, res:Response) => {
    const eventsId = parseInt(req.params.id);
    if (isNaN(eventsId)){
        res.status(400).json({message: "Invalid events Id"});
        return;
    }
    try {
        const events = await geteventsByIdServices(eventsId);
        if (events == undefined){
            res.status(404).json({message: "events not found"});
        } else {
            res.status(200).json({events});
        }
    } catch (error: any){
        res.status(500).json({ error:error.message || "Failed to fetch events"});
    }

}

//Business logic for creating events
export const createEvents = async(req:Request, res:Response) =>{
    const {organizerId, eventDate, title, description, startDate, endDate, location, imageUrl} = req.body;
    if ( !organizerId || !eventDate || !title || !description || !startDate || !endDate || !location || !imageUrl ){
        res.status(400).json({error: "All fields are required"});
        return;
}

try{
    const newevents = await createeventsServices({organizerId, eventDate, title, description, startDate, endDate, location, imageUrl}); 
    if (newevents == null) {
        res.status(500).json({message: "Failed to create events"});
    }else {
        res.status(201).json({message: newevents});
    }
} catch  (error:any) {
    res.status(500).json({error: error.message || "Failed to create an events " });}
}


//Business logic for updating events
export  const updateevents = async (req:Request, res: Response) => {
    const eventsId = parseInt(req.params.Id);
    if (isNaN(eventsId)) {
        res.status(400).json({ error: "Invalid events Id" });
        return;
    }
    const { organizerId, eventDate, title, description, startDate, endDate, location, imageUrl} = req.body;
    if (!organizerId || !eventDate || !title || !description || !startDate || !endDate || !location || !imageUrl) {

        res.status(400).json({ error: "All fields are required"});
        return;
    }
    try {
        const updatedevents = await updateeventsServices(eventsId, {organizerId, eventDate, title, description, startDate, endDate, location, imageUrl});
        if (updateevents == null) {
            res.status(404).json({message: "events not found or failed to update"});
        } else {
            res.status(200).json ({message:updatedevents});
        }
    }catch (error:any) {
        res.status(500).json({error:error.message || "Failed to update events"});
    }
}

//Business logic for deleting events
export const deleteevents = async (req:Request, res:Response) => {
    const eventsId = parseInt(req.params.id);
    if (isNaN(eventsId)) {
        res.status(400).json({error: "Invalid events ID"});
        return;
    }
    try {
        const deletedevents = await deleteeventsServices(eventsId);
        if (deletedevents) {
            res.status(200).json({message: "events deleted successfully"});
        } else {
            res.status(404).json({message: "events not found"});
        }
        } catch (error:any) {
            res.status(500).json ({error:error.message || "Failed to delete events"});
        }
    }

