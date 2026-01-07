import {Request, Response}from "express";
import { createdonationssServices, deletedonationssServices, getdonationssServices, getdonationssByIdServices,updatedonationssServices } from "./donationss.service";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
//business logic git 

//Business logic for getdonationss
export const getdonationss= async(req:Request, res:Response)=>{
    try {
        const alldonationss = await getdonationssServices();
        if (alldonationss == null || alldonationss.length == 0){
            res.status(404).json({message:" No donationsss found"});
        }else {
            res.status(200).json(alldonationss);

        }
    }
        catch (error: any) {
            res.status(500).json({error: error.message || "Failed to fetch donationss"});
        }
}

//Business logic for getdonationssById
export const getdonationssById= async(req:Request, res:Response) => {
    const donationssId = parseInt(req.params.id);
    if (isNaN(donationssId)){
        res.status(400).json({message: "Invalid donationss Id"});
        return;
    }
    try {
        const donationss = await getdonationssByIdServices(donationssId);
        if (donationss == undefined){
            res.status(404).json({message: "donationss not found"});
        } else {
            res.status(200).json({donationss});
        }
    } catch (error: any){
        res.status(500).json({ error:error.message || "Failed to fetch donationss"});
    }

}

//Business logic for creating donationss
export const createdonationss = async(req:Request, res:Response) =>{
    const {organizerId, donationsDate, title, description, startDate, endDate, location, imageUrl} = req.body;
    if ( !organizerId || !donationsDate || !title || !description || !startDate || !endDate || !location || !imageUrl ){
        res.status(400).json({error: "All fields are required"});
        return;
}

try{
    const newdonationss = await createdonationssServices({organizerId, donationsDate, title, description, startDate, endDate, location, imageUrl}); 
    if (newdonationss == null) {
        res.status(500).json({message: "Failed to create donationss"});
    }else {
        res.status(201).json({message: newdonationss});
    }
} catch  (error:any) {
    res.status(500).json({error: error.message || "Failed to create an donationss " });}
}


//Business logic for updating donationss
export  const updatedonationss = async (req:Request, res: Response) => {
    const donationssId = parseInt(req.params.Id);
    if (isNaN(donationssId)) {
        res.status(400).json({ error: "Invalid donationss Id" });
        return;
    }
    const { organizerId, donationsDate, title, description, startDate, endDate, location, imageUrl} = req.body;
    if (!organizerId || !donationsDate || !title || !description || !startDate || !endDate || !location || !imageUrl) {

        res.status(400).json({ error: "All fields are required"});
        return;
    }
    try {
        const updateddonationss = await updatedonationssServices(donationssId, {organizerId, donationsDate, title, description, startDate, endDate, location, imageUrl});
        if (updatedonationss == null) {
            res.status(404).json({message: "donationss not found or failed to update"});
        } else {
            res.status(200).json ({message:updateddonationss});
        }
    }catch (error:any) {
        res.status(500).json({error:error.message || "Failed to update donationss"});
    }
}

//Business logic for deleting donationss
export const deletedonationss = async (req:Request, res:Response) => {
    const donationssId = parseInt(req.params.id);
    if (isNaN(donationssId)) {
        res.status(400).json({error: "Invalid donationss ID"});
        return;
    }
    try {
        const deleteddonationss = await deletedonationssServices(donationssId);
        if (deleteddonationss) {
            res.status(200).json({message: "donationss deleted successfully"});
        } else {
            res.status(404).json({message: "donationss not found"});
        }
        } catch (error:any) {
            res.status(500).json ({error:error.message || "Failed to delete donationss"});
        }
    }

