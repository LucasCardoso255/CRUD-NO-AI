import sqlite3, { Database } from "sqlite3";
import type{ User, UserRepo } from "./interfaces/user_interface.js";
import { db } from "../infra/DbSetupSqlite.js"

export class UserRepository implements UserRepo{
    
    queryUsers(): User[] {
        const db = new sqlite3.
    }
}
