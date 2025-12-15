import {desc, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TOfferingsInsert, TOfferingsselect, offeringsTable } from "../drizzle/schema";

//CRUD Operation for offering table

//get all offerings
export const getOfferingsService = async():Promise<TOfferingsselect[] | null> => {
    return await db.query.offeringsTable.findMany({
        orderBy:[desc(offeringsTable.offeringsId)]
    });
}

//Get offering By Id
export const getOfferingByIdServices = async(offeringId: number):Promise<TOfferingsselect | undefined> => {
    return await db.query.offeringsTable.findFirst({
        where: eq(offeringsTable.offeringsId,offeringId)
    })
}

//Create offering
export const createOfferingServices = async(offering:TOfferingsInsert):Promise<string> => {
    await db.insert(offeringsTable).values(offering).returning();
    return "Offering Created Succesfully"
}

//update an offering
export const updateOfferingServices = async(offeringId:number,offering:TOfferingsInsert):Promise<string> => {
    await db.update(offeringsTable).set(offering).where(eq(offeringsTable.offeringsId,offeringId)).returning();
    return "Offering Updated Succesfully"
}

//delete offering
export const deleteOfferingServices = async(offeringId:number):Promise<string> => {
    await db.delete(offeringsTable).where(eq(offeringsTable.offeringsId,offeringId)).returning();
    return "Offering Deleted Succesfully"
}