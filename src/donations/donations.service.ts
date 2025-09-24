//crud operations
import {eq, desc} from "drizzle-orm";
import db from "../drizzle/db";
import { donationsTable } from "../drizzle/schema";
import { TDonationsInsert, TDonationsselect } from "../drizzle/schema";

//Get all donations
export const getDontaionsServices = async (): Promise<TDonationsselect[] | null> => {
    return await db.query.donationsTable.findMany({
        orderBy: [desc(donationsTable.donationsId)]
    });
}

//get donations by Id
export const getDonationsByIdServices = async (donationsId: number): Promise<TDonationsselect | undefined> => {