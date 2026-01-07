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
    password: varchar("password").notNull(),
    role: roleEnum("userType").default("member"),
    address: text("address"),
    contactPhone: varchar("contactPhone", {length:255}),
    profilePicture: varchar("profilePicture", {length:255}),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
})

export type TUserInsert = typeof userTable.$inferInsert;
export type TUserSelect = typeof userTable.$inferSelect;


export const userRelations = relations(userTable, ({many}) => ({
    sermons: many(sermonTable),
    events: many(eventsTable),
    offerings: many(offeringsTable),
    donations: many(donationsTable),
    ministries: many(ministriesTable),
}))

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

export type TSermonInsert = typeof sermonTable.$inferInsert;
export type TSermonSelect = typeof sermonTable.$inferSelect;

export const sermonRelations = relations(sermonTable, ({one}) => ({
    preacher: one(userTable, {
        fields: [sermonTable.preacherId],
        references: [userTable.userId],
    }),
}))

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

export type TEventsInsert = typeof eventsTable.$inferInsert;
export type TEventSelect = typeof eventsTable.$inferSelect;

export const eventsRelations = relations(eventsTable, ({one}) => ({
    organizer: one(userTable, {
        fields: [eventsTable.organizerId],
        references: [userTable.userId],
    }),
}));

//Announcements table
export const announcementsTable = pgTable("announcementsTable", {
    announcementsId: serial("announcementsId").primaryKey(),
    title: text("title"),
    content: text("content"),
    announcementstatus: announcementsStatus("announcementstatus").default("pending"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(), 

})

export type TAnnouncementsInsert = typeof announcementsTable.$inferInsert;
export type TAnnouncementsselect = typeof announcementsTable.$inferSelect;

//offerings table
export const offeringsTable = pgTable("offeringsTable", {
    offeringsId: serial("offeringsId").primaryKey(),
    userId: integer("userId").references(()=> userTable.userId, { onDelete: "set null"}),
    amount: integer("amount"),
    offeringDate: date("offeringDate"),
    transactionsId: varchar("transactionsId", {length:255}),
})

export type TOfferingsInsert = typeof offeringsTable.$inferInsert;
export type TOfferingsselect = typeof offeringsTable.$inferSelect;

export const offeringsRelations = relations(offeringsTable, ({one}) => ({
    user: one(userTable, {
        fields: [offeringsTable.userId],
        references: [userTable.userId],
    }),
}));

//Donations table
export const donationsTable = pgTable("donationsTable", {
    donationsId: serial("donationsId").primaryKey(),
    donorId: integer("userId").references(()=> userTable.userId, { onDelete: "set null"}),
    amount: integer("amount"),
    donationDate: date("donationDate"),
    donationstatus: donationsStatus("donationstatus").default("pending"),
    transactionsId: varchar("transactionsId", {length:255}), 
})

export type TDonationsInsert = typeof donationsTable.$inferInsert;
export type TDonationsselect = typeof donationsTable.$inferSelect;

export const donationsRelations = relations(donationsTable, ({one}) => ({
    donor: one(userTable, {
        fields: [donationsTable.donorId],
        references: [userTable.userId],
    }),
}));

//Ministries table
export const ministriesTable = pgTable("ministriesTable", {
    ministryId: serial("ministryId").primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    description: text("description"),
    leaderId: integer("leaderId").references(()=> userTable.userId, { onDelete: "set null"}),
    contactInfo: text("contactInfo")
}) 

export type TMinistriesInsert = typeof ministriesTable.$inferInsert;
export type TMinistriesselect = typeof ministriesTable.$inferSelect;

export const ministriesRelations = relations(ministriesTable, ({one}) => ({
    leader: one(userTable, {
        fields: [ministriesTable.leaderId],
        references: [userTable.userId],
    }),
}));
