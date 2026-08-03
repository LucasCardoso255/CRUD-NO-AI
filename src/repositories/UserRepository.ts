import sqlite3, { Database } from "sqlite3";
import type{ User, UserRepo } from "./interfaces/user_interface.js";
import { db } from "../infra/DbSetupSqlite.js"

export class UserRepository implements UserRepo{
    async queryUsers(userLimit=20): Promise<User[]> {
        let users: User[] = []
        db.all("SELECT * FROM Users ORDER BY user_name ASC LIMIT ? OFFSET 0", 
            [userLimit],
            (error, rows) => {
                if (error) {
                    throw new Error("Erro ao consultar usuários", error);                
                }
                users = rows as User[]
            })
            return users
    }

    

}