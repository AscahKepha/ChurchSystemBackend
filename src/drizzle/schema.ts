import {relations, sql} from "drizzle-orm"
import {
    boolean, integer,
    pgEnum
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("userType", ["admin", "member", "Clergyman/Clergywoman"])


// members table
