import { Request, Response } from "express";
import { getsermonsServices, getsermonByIdServices, createsermonServices, updatesermonServices, deletesermonServices} from "./sermon.service";

//Sermon logics
//get sermon logic
export const getsermons = async (req:Request, res:Response) =>{
    try{
        const allSermons = await getsermonsServices();
        if (allSermons == null || allSermons.length == 0) {
            res.status(404).json({message: "No sermons found"});
        }else{
            res.status(200).json(allSermons);
        }
    }catch (error:any){
        res.status(500).json({error:error.message || "Failedto fetch sermons"});
    }
}

export const getsermonById = async (req:Request, res:Response)=>{
    const sermonId = parseInt(req.params.id);
    if (isNaN(sermonId)) {
        res.status(400).json({error: "invalid patient Id"});
        return;
    }
    try{
        const sermon = await getsermonByIdServices(sermonId);
        if (sermon == undefined) {
            res.status(404).json({message: "sermon not found"});
        }else{
            res.status(200).json(sermon);
        }
    }catch (error:any){
        res.status(500).json({error: error.message || "Failed to get sermon"});
    }
    }

    //create sermon logic
    export const createsermon = async(req:Request, res:Response) =>{
        const {title, keyVerse, sermonDate,speaker,description,audioUrl,videoUrl} = req.body;
        if ( !title || !keyVerse || !sermonDate || !speaker || !description || !audioUrl || !videoUrl) {
            res.status(400).json({error: "All fields are required"});
            return;
        }
        try{
            const newsermon = await createsermonServices({title,keyVerse,sermonDate,speaker,description,audioUrl,videoUrl});
            if (newsermon == null) {
                res.status(500).json({message: "Failed to create Sermon"});
            } else {
            res.status(201).json ({message: newsermon});
            }
        } catch (error:any){
            res.status(500).json({error: error.message || "Failed to create sermon"});
        }
    }


    //updatesermon
    export const updatesermon = async (req:Request, res:Response) =>{
        const sermonId = parseInt(req.params.id);
        if(isNaN(sermonId)){
            res.status(400).json({error: "Invalid sermon Id"});
            return;
        }
        const {title,keyVerse,sermonDate,speaker,description,audioUrl,videoUrl} = req.body;
        if ( !title || !keyVerse || !sermonDate || !speaker || !description || !audioUrl || !videoUrl) {
            res.status(400).json({error: "All fields are required"});
            return;
    } try{
        const updatedsermon = await updatesermonServices(sermonId, {title,keyVerse,sermonDate,speaker,description,audioUrl,videoUrl});
        if (updatedsermon == null){
            res.status(404).json({message: "sermon not foundd or failed to update sermon"});
        } else{
           res.status(200).json({message:updatedsermon}); 
        }
    } catch (error:any){
        res.status(500).json({error: error.message || "Failed to update sermon"});
    }
}

export const deletesermon = async (req: Request, res: Response) => {
    const sermonId = parseInt(req.params.id);     
    if (isNaN(sermonId)) {
        res.status(400).json({ error: "Invalid sermon ID" });
        return; // Prevent further execution
    }
    try {
        const deletedsermon = await deletesermonServices(sermonId);
        if (deletedsermon) {
            res.status(200).json({ message: "sermon deleted successfully" });
        } else {
            res.status(404).json({ message: "sermon not found" });
        }
    } catch (error:any) {     
        res.status(500).json({ error:error.message || "Failed to delete sermon" });
    }     
}

