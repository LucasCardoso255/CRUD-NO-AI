import sqlite3 from "sqlite3";
import type{ User, UserRepo } from "./interfaces/user_interface.js";
import { db } from "../infra/DbSetupSqlite.js"

export class UserRepository implements UserRepo {
    async queryUsers(userLimit=20): Promise<User[]> {
        return new Promise((resolve, reject) => {
            let users: User[] = []
            db.all("SELECT * FROM Users ORDER BY user_name ASC LIMIT ? OFFSET 0", 
            [userLimit],
            (error, rows) => {
                if (error) {
                    console.log("Erro ao executar queryUsers");
                    reject(error)
                }
                resolve(users = rows as User[])
            })
        });
    }

    async getUserById(user_id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            db.run("SELECT * FROM Users WHERE user_id = ?", 
            [user_id],
            (error) => {
                if (error) {
                    console.log("Erro ao executar queryUsers");
                    reject(error)
                }
                resolve(...) // RETORNAR RESULTADO DO DB.RUN
            })
        });
    }

    async insertUsers(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Users (user_id, user_name, user_mail, user_active) VALUES (?,?,?,?)",
            [user.user_id, user.user_name, user.user_mail, user.user_active], 
            function (error) {
                if (error) {
                    console.log("Erro ao executar insertUsers");
                    reject(error);
                    return;
                }
                resolve(`Usuário inserido com sucesso. \nID: ${this.lastID}\nMudanças: ${this.changes}`);
            });
        });
    }

    updateUser(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            db.run("UPDATE Users SET user_id = ?, user_name = ?, user_mail = ?, user_active = ? WHERE user_id = ?",
                [user.user_id, user.user_name, user.user_mail, user.user_active, user.user_id],
                function (error) {
                    if (error) {
                        console.log("Erro ao executar updateUsers");
                        reject(error);
                        return;
                    }
                    resolve(`Usuário atualizado com sucesso. \nID: ${this.lastID}\nMudanças: ${this.changes}`);
            });
        });
    }

    removeUser(user_id: string): Promise<string> {
        return new Promise((resolve, reject) => {
           db.run("UPDATE Users SET user_active = 0 WHERE user_id = ?", 
            [user_id],
            function (error) {
                    if (error) {
                        console.log("Erro ao executar removeUser");
                        reject(error);
                        return;
                    }
                    resolve(`Usuário removido com sucesso. \nID: ${this.lastID}\nMudanças: ${this.changes}`);
            });
        });
    }
}