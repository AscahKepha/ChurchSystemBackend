//crud operations and services (create,r..,update,delete)
import { eq, desc } from "drizzle-orm";
import db from "../drizzle/db";
import { eventsTable, } from "../drizzle/schema";
import { TEventSelect, TEventsInsert } from "../drizzle/schema"

//Get all eventss
export const geteventsServices = async (): Promise<TEventSelect[] | null> => {
  return await db.query.eventsTable.findMany({
    orderBy: [desc(eventsTable.eventsId)]
  });
}

//Get events by ID
export const geteventsByIdServices = async (eventsId: number): Promise<TEventSelect | undefined> => {
  return await db.query.eventsTable.findFirst({
    where: eq(eventsTable.eventsId, eventsId)
  })
}


// Create a new events
export const createeventsServices = async (events: TEventsInsert): Promise<string> => {
  await db.insert(eventsTable).values(events).returning();
  return "events Created Successfully 😎"
}

// Update an existing events
export const updateeventsServices = async (eventsId: number, events: TEventsInsert): Promise<string> => {
  await db.update(eventsTable).set(events).where(eq(eventsTable.eventsId, eventsId));
  return "events Updated Succeffully 😎";
}

//delete events
export const deleteeventsServices = async (eventsId: number): Promise<string> => {
  await db.delete(eventsTable).where(eq(eventsTable.eventsId, eventsId));
  return "events Delete Sucessfully";
}

