//crud operations and services (create,r..,update,delete)
import { eq, desc } from "drizzle-orm";
import db from "../drizzle/db";
import { sermonTable } from "../drizzle/schema";
import { TSermonSelect, TSermonInsert } from "../drizzle/schema"

//Get all sermons
export const getsermonsServices = async (): Promise<TSermonSelect[] | null> => {
  return await db.query.sermonTable.findMany({
    orderBy: [desc(sermonTable.sermonId)]
  });
}

//Get sermon by ID
export const getsermonByIdServices = async (sermonId: number): Promise<TSermonSelect | undefined> => {
  return await db.query.sermonTable.findFirst({
    where: eq(sermonTable.sermonId, sermonId)
  })
}


// Create a new sermon
export const createsermonServices = async (sermon: TSermonInsert): Promise<string> => {
  await db.insert(sermonTable).values(sermon).returning();
  return "sermon Created Successfully 😎"
}

// Update an existing sermon
export const updatesermonServices = async (sermonId: number, sermon: TSermonInsert): Promise<string> => {
  await db.update(sermonTable).set(sermon).where(eq(sermonTable.sermonId, sermonId));
  return "sermon Updated Succeffully 😎";
}

//delete sermon
export const deletesermonServices = async (sermonId: number): Promise<string> => {
  await db.delete(sermonTable).where(eq(sermonTable.sermonId, sermonId));
  return "sermon Delete Sucessfully";
}


