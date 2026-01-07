//crud operations
import {eq, desc} from "drizzle-orm";
import db from "../drizzle/db";
import { announcementsTable } from "../drizzle/schema";
import { TAnnouncementsInsert, TAnnouncementsselect } from "../drizzle/schema";

//Get all donations
export const getAnnouncementsServices = async (): Promise<TAnnouncementsselect[] | null> => {
    return await db.query.announcementsTable.findMany({});
}

//get annoucements by Id
export const getAnnouncementsByIdServices = async (announcementid: number): Promise<TAnnouncementsselect | undefined> => {
    return await db.query.announcementsTable.findFirst({
        where: eq(announcementsTable.announcementsId, announcementid)
    })
}

//create announcements
export const createannouncementsservices = async (announcements: TAnnouncementsInsert):Promise<string> => {
    await db.insert(announcementsTable).values(announcements).returning();
    return "announcements created successfully 🍭"

}

export const updateannouncementsservice = async (announcementId: number, announcements: Partial<TAnnouncementsInsert>):Promise<string> => {
    await db.update(announcementsTable).set(announcements).where(eq(announcementsTable.announcementsId, announcementId));
    return "announcements updated successfully 🔵"
}

export const deleteannouncementsservice = async (announcementId: number):Promise<string> => {
    await db.delete(announcementsTable).where(eq(announcementsTable.announcementsId, announcementId));
    return "announcements deleted successfully 🗑️"
}