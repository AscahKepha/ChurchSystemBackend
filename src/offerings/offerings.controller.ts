import {Request, Response}from "express";
import { createOfferingServices, deleteOfferingServices, getOfferingsService, getOfferingByIdServices,updateOfferingServices } from "./offerings.service";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
//business logic 

//Business logic for getOffering
export const getOffering= async(req:Request, res:Response)=>{
    try {
        const allOffering = await getOfferingsService();
        if (allOffering == null || allOffering.length == 0){
            res.status(404).json({message:" No Offerings found"});
        }else {
            res.status(200).json(allOffering);

        }
    }
        catch (error: any) {
            res.status(500).json({error: error.message || "Failedto fetch offerings"});
        }
}

//Business logic for getOfferingById
export const getOfferingById= async(req:Request, res:Response) => {
    const offeringId = parseInt(req.params.id);
    if (isNaN(offeringId)){
        res.status(400).json({message: "Invalid offering Id"});
        return;
    }
    try {
        const offering = await getOfferingByIdServices(offeringId);
        if (offering == undefined){
            res.status(404).json({message: "offering not found"});
        } else {
            res.status(200).json({offering});
        }
    } catch (error: any){
        res.status(500).json({ error:error.message || "Failed to fetch offering"});
    }

}

//Business logic for creating offering
export const createOffering = async(req:Request, res:Response) =>{
    const {amount, offeringDate, transactionsId} = req.body;
    if (!amount || !offeringDate || !transactionsId){
        res.status(400).json({error: "All fields are required"});
        return;
}

try{
    const newOffering = await createOfferingServices({amount, offeringDate, transactionsId}); 
    if (newOffering == null) {
        res.status(500).json({message: "Failed to create offering"});
    }else {
        res.status(201).json({message: newOffering});
    }
} catch  (error:any) {
    res.status(500).json({error: error.message || "Failed to create an offering " });}
}


//Business logic for updating offering
export  const updateOffering = async (req:Request, res: Response) => {
    const offeringId = parseInt(req.params.Id);
    if (isNaN(offeringId)) {
        res.status(400).json({ error: "Invalid offering Id" });
        return;
    }
    const { amount,offeringDate,transactionsId} = req.body;
    if (!amount || !offeringDate || transactionsId) {

        res.status(400).json({ error: "All fields are required"});
        return;
    }
    try {
        const updatedOffering = await updateOfferingServices(offeringId, {amount,offeringDate,transactionsId});
        if (updateOffering == null) {
            res.status(404).json({message: "Offering not found or failed to update"});
        } else {
            res.status(200).json ({message:updatedOffering});
        }
    }catch (error:any) {
        res.status(500).json({error:error.message || "Failed to updateoffering"});
    }
}

//Business logic for deleting offering
export const deleteOffering = async (req:Request, res:Response) => {
    const offeringId = parseInt(req.params.id);
    if (isNaN(offeringId)) {
        res.status(400).json({error: "Invalid offering ID"});
        return;
    }
    try {
        const deletedOffering = await deleteOfferingServices(offeringId);
        if (deletedOffering) {
            res.status(200).json({message: "Offering deleted successfully"});
        } else {
            res.status(404).json({message: "offering not found"});
        }
        } catch (error:any) {
            res.status(500).json ({error:error.message || "Failed to delete offering"});
        }
    }

