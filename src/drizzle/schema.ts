import {relations, sql} from "drizzle-orm"
import {
    boolean, integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";

//Enums
export const roleEnum = pgEnum("userType", ["admin", "member", "Clergyman/Clergywoman"])


//users table
export const userTable = pgTable("userTable", {
    userId: serial("userId").primaryKey(),
    firstName: varchar("firstName"),
    lastName: varchar("lastName"),
    email: varchar("email"), 
    psasword: varchar("password").notNull(),
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
    title: varchar("title", {length: 255}).notNull(),
    sermonDate
    description: text("desription"),
    audioUrl
    videoUrl

})
//Events table
export const eventsTable = pgTable("eventsTable", {
    eventsId:
    title:
    

})
//Announcements table

//Donations/offerings table

//Ministries table

