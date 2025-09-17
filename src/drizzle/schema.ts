import {relations, sql} from "drizzle-orm"
import {
    boolean, date, integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";

//Enums
export const roleEnum = pgEnum("userType", ["admin", "member", "Clergyman/Clergywoman"]);
export const donationsStatus = pgEnum("donationsStatus", ["pending", "completed", "failed"]);
export const announcementsStatus = pgEnum("announcementsEnum", ["pending", "active", "inactive" ]);



//users table
export const userTable = pgTable("userTable", {
    userId: serial("userId").primaryKey(),
    firstName: varchar("firstName"),
    lastName: varchar("lastName"),
    email: varchar("email"), 
    pasasword: varchar("password").notNull(),
    role: roleEnum("userType").default("member"),
    address: text("address"),
    contactPhone: varchar("contactPhone", {length:255}),
    profilePicture: varchar("profilePicture", {length:255}),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
})

//Sermons table
export const sermonTable = pgTable("sermonTable", {
    sermonId: serial("sermonId").primaryKey(),
    preacherId: integer("userId").references(()=> userTable.userId, { onDelete: "set null"}),
    title: varchar("title", {length: 255}).notNull(),
    keyVerse: varchar("keyVerse", {length: 255}),
    sermonDate: date("sermonDate"),
    speaker: text("speaker"),
    description: text("desription"),
    audioUrl: text("audioUrl"),
    videoUrl: text("videoUrl"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),

})
//Events table
export const eventsTable = pgTable("eventsTable", {
    eventsId: serial("eventsId").primaryKey(),
    organizerId: integer("userId").references(()=> userTable.userId, { onDelete: "set null"}),
    eventDate: date("eventDate"),
    title: text("title"),
    description: text("description"),
    startDate: date("startDate"),
    endDate: timestamp("endDate"),
    location: text("location"),
    imageUrl: text("imageUrl")
    

})
//Announcements table
export const aannouncementsTable = pgTable("announcementsTable", {
    announcementsId: serial("announcementsId").primaryKey(),
    title: text("title"),
    content: text("content"),
    announcementstatus: announcementsStatus("announcementstatus").default("pending"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(), 

})
//Donations/offerings table
export const donationsTable = pgTable("donationsTable", {
    donationsId: serial("donationsId").primaryKey(),
    donorId: integer("userId").references(()=> userTable.userId, { onDelete: "set null"}),
    amount: integer("amount"),
    donationDate: date("donationDate"),
    donationstatus: donationsStatus("donationstatus").default("pending"),
    transactionsId: varchar("transactionsId", {length:255}),
})
//Ministries table
export const ministriesTable = pgTable("ministriesTable", {
    ministryId: serial("ministryId").primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    description: text("description"),
    leaderId: integer("leaderId").references(()=> userTable.userId, { onDelete: "set null"}),
    contactInfo: text("contactInfo")
})
