import {Request, Response}from "express";
import { createMinistriesServices, deleteMinistriesServices, getMinistriesServices, getMinistriesByIdServices,updateMinistriesServices } from "./ministries.service";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
//business logic 

//Business logic for getMinistries
export const getMinistries= async(req:Request, res:Response)=>{
    try {
        const allMinistries = await getMinistriesServices();
        if (allMinistries == null || allMinistries.length == 0){
            res.status(404).json({message:" No Ministriess found"});
        }else {
            res.status(200).json(allMinistries);

        }
    }
        catch (error: any) {
            res.status(500).json({error: error.message || "Failed to fetch Ministries"});
        }
}

//Business logic for getMinistriesById
export const getMinistriesById= async(req:Request, res:Response) => {
    const MinistriesId = parseInt(req.params.id);
    if (isNaN(MinistriesId)){
        res.status(400).json({message: "Invalid Ministries Id"});
        return;
    }
    try {
        const Ministries = await getMinistriesByIdServices(MinistriesId);
        if (Ministries == undefined){
            res.status(404).json({message: "Ministries not found"});
        } else {
            res.status(200).json({Ministries});
        }
    } catch (error: any){
        res.status(500).json({ error:error.message || "Failed to fetch Ministries"});
    }

}

//Business logic for creating Ministries
export const createMinistries = async(req:Request, res:Response) =>{
    const {name, description, leaderId, contactInfo} = req.body;
    if ( !name || !description || !leaderId || !contactInfo ){
        res.status(400).json({error: "All fields are required"});
        return;
}

try{
    const newMinistries = await createMinistriesServices({name, description, leaderId, contactInfo}); 
    if (newMinistries == null) {
        res.status(500).json({message: "Failed to create Ministries"});
    }else {
        res.status(201).json({message: newMinistries});
    }
} catch  (error:any) {
    res.status(500).json({error: error.message || "Failed to create an Ministries " });}
}


//Business logic for updating Ministries
export  const updateMinistries = async (req:Request, res: Response) => {
    const MinistriesId = parseInt(req.params.Id);
    if (isNaN(MinistriesId)) {
        res.status(400).json({ error: "Invalid Ministries Id" });
        return;
    }
    const { name, description, leaderId, contactInfo} = req.body;
    if (!name || !description || !leaderId || !contactInfo) {

        res.status(400).json({ error: "All fields are required"});
        return;
    }
    try {
        const updatedMinistries = await updateMinistriesServices(MinistriesId, {name, description, leaderId, contactInfo});
        if (updateMinistries == null) {
            res.status(404).json({message: "Ministries not found or failed to update"});
        } else {
            res.status(200).json ({message:updatedMinistries});
        }
    }catch (error:any) {
        res.status(500).json({error:error.message || "Failed to update Ministries"});
    }
}

//Business logic for deleting Ministries
export const deleteMinistries = async (req:Request, res:Response) => {
    const MinistriesId = parseInt(req.params.id);
    if (isNaN(MinistriesId)) {
        res.status(400).json({error: "Invalid Ministries ID"});
        return;
    }
    try {
        const deletedMinistries = await deleteMinistriesServices(MinistriesId);
        if (deletedMinistries) {
            res.status(200).json({message: "Ministries deleted successfully"});
        } else {
            res.status(404).json({message: "Ministries not found"});
        }
        } catch (error:any) {
            res.status(500).json ({error:error.message || "Failed to delete Ministries"});
        }
    }

