import {Request, Response}from "express";
import { createdonationsServices, deletedonationsServices, getdonationsServices, getdonationsByIdServices,updatedonationsServices } from "./donations.service";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
//business logic git 

//Business logic for getdonations
export const getdonations= async(req:Request, res:Response)=>{
    try {
        const alldonations = await getdonationsServices();
        if (alldonations == null || alldonations.length == 0){
            res.status(404).json({message:" No donationss found"});
        }else {
            res.status(200).json(alldonations);

        }
    }
        catch (error: any) {
            res.status(500).json({error: error.message || "Failed to fetch donations"});
        }
}

//Business logic for getdonationsById
export const getdonationsById= async(req:Request, res:Response) => {
    const donationsId = parseInt(req.params.id);
    if (isNaN(donationsId)){
        res.status(400).json({message: "Invalid donations Id"});
        return;
    }
    try {
        const donations = await getdonationsByIdServices(donationsId);
        if (donations == undefined){
            res.status(404).json({message: "donations not found"});
        } else {
            res.status(200).json({donations});
        }
    } catch (error: any){
        res.status(500).json({ error:error.message || "Failed to fetch donations"});
    }

}

//Business logic for creating donations
export const createdonations = async(req:Request, res:Response) =>{
    const {donorId,amount,donationDate,donationstatus,transactionsId} = req.body;
    if (!donorId || !amount || !donationDate || !donationstatus || !transactionsId) {
        res.status(400).json({error: "All fields are required"});
        return;
}

try{
    const newdonations = await createdonationsServices({donorId,amount,donationDate,donationstatus,transactionsId}); 
    if (newdonations == null) {
        res.status(500).json({message: "Failed to create donations"});
    }else {
        res.status(201).json({message: newdonations});
    }
} catch  (error:any) {
    res.status(500).json({error: error.message || "Failed to create an donations " });}
}


//Business logic for updating donations
export  const updatedonations = async (req:Request, res: Response) => {
    const donationsId = parseInt(req.params.Id);
    if (isNaN(donationsId)) {
        res.status(400).json({ error: "Invalid donations Id" });
        return;
    }
    const { donorId,amount,donationDate,donationstatus,transactionsId} = req.body;
    if (!donorId || !amount || !donationDate || !donationstatus || !transactionsId) {

        res.status(400).json({ error: "All fields are required"});
        return;
    }
    try {
        const updateddonations = await updatedonationsServices(donationsId, {donorId,amount,donationDate,donationstatus,transactionsId});
        if (updatedonations == null) {
            res.status(404).json({message: "donations not found or failed to update"});
        } else {
            res.status(200).json ({message:updateddonations});
        }
    }catch (error:any) {
        res.status(500).json({error:error.message || "Failed to update donations"});
    }
}

//Business logic for deleting donations
export const deletedonations = async (req:Request, res:Response) => {
    const donationsId = parseInt(req.params.id);
    if (isNaN(donationsId)) {
        res.status(400).json({error: "Invalid donations ID"});
        return;
    }
    try {
        const deleteddonations = await deletedonationsServices(donationsId);
        if (deleteddonations) {
            res.status(200).json({message: "donations deleted successfully"});
        } else {
            res.status(404).json({message: "donations not found"});
        }
        } catch (error:any) {
            res.status(500).json ({error:error.message || "Failed to delete donations"});
        }
    }

