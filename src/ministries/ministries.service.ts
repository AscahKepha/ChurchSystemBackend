import {desc, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TMinistriesInsert, TMinistriesselect, ministriesTable } from "../drizzle/schema";

//CRUD Operation for Ministries table

//get all Ministriess
export const getMinistriesServices = async():Promise<TMinistriesselect[] | null> => {
    return await db.query.ministriesTable.findMany({
        orderBy:[desc(ministriesTable.ministryId)]
    });
}

//Get Ministries By Id
export const getMinistriesByIdServices = async(ministryId: number):Promise<TMinistriesselect | undefined> => {
    return await db.query.ministriesTable.findFirst({
        where: eq(ministriesTable.ministryId,ministryId)
    })
}

//Create Ministries
export const createMinistriesServices = async(Ministries:TMinistriesInsert):Promise<string> => {
    await db.insert(ministriesTable).values(Ministries).returning();
    return "Ministries Created Succesfully 🍂"
}

//update an Ministries
export const updateMinistriesServices = async(MinistryId:number,Ministries:TMinistriesInsert):Promise<string> => {
    await db.update(ministriesTable).set(Ministries).where(eq(ministriesTable.ministryId,MinistryId)).returning();
    return "Ministries Updated Succesfully 😃"
}

//delete Ministries
export const deleteMinistriesServices = async(MinistryId:number):Promise<string> => {
    await db.delete(ministriesTable).where(eq(ministriesTable.ministryId,MinistryId)).returning();
    return "Ministries Deleted Succesfully"
}