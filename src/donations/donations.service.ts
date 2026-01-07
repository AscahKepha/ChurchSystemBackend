//crud operations and services (create,r..,update,delete)
import { eq, desc } from "drizzle-orm";
import db from "../drizzle/db";
import { donationsTable, } from "../drizzle/schema";
import { TDonationsselect, TDonationsInsert } from "../drizzle/schema"

//Get all donationss
export const getdonationssServices = async (): Promise<TDonationsselect[] | null> => {
  return await db.query.donationsTable.findMany({
    orderBy: [desc(donationsTable.donationsId)]
  });
}

//Get donations by ID
export const getdonationsByIdServices = async (donationsId: number): Promise<TDonationsselect | undefined> => {
  return await db.query.donationsTable.findFirst({
    where: eq(donationsTable.donationsId, donationsId)
  })
}


// Create a new donations
export const createdonationsServices = async (donations: TDonationsInsert): Promise<string> => {
  await db.insert(donationsTable).values(donations).returning();
  return "donations Created Successfully 😎"
}

// Update an existing donations
export const updatedonationsServices = async (donationsId: number, donations: TDonationsInsert): Promise<string> => {
  await db.update(donationsTable).set(donations).where(eq(donationsTable.donationsId, donationsId));
  return "donations Updated Succeffully 😎";
}

//delete donations
export const deletedonationsServices = async (donationsId: number): Promise<string> => {
  await db.delete(donationsTable).where(eq(donationsTable.donationsId, donationsId));
  return "donations Deleted Sucessfully";
}

