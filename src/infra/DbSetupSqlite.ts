import sqlite3 from "sqlite3";
import type{ DatabaseConfig } from "../repositories/interfaces/user_interface.js";

class DatabaseSqlite implements DatabaseConfig{
    private db!: sqlite3.Database;

    public getDb(): sqlite3.Database {
        if (!this.db) {
            throw new Error("Banco não inicializado.");
        }
        return this.db;
    }

    database_setup(): void {
        this.db = new sqlite3.Database("database.db", (error) => {
            if (error) {
                throw new Error(`Erro na conexão com o banco de dados: ${error.message}`);
            }
            console.log("Conexão criada com sucesso.");
        });
    }

    create_table_users(): void {
        const db = this.getDb();
        db.run(` 
            CREATE TABLE IF NOT EXISTS Users (
                user_id VARCHAR(30) PRIMARY KEY,
                user_name VARCHAR(100) NOT NULL,
                user_mail VARCHAR(100) UNIQUE,
                user_active INTEGER NOT NULL
            );  
            `, (error) => {
                if (error) {
                    throw new Error(`Erro na criação da tabela Users: ${error.message}`);
                }
                console.log("Tabela Users criada com sucesso.");
        })  
    }

    constructor(){
        try {
            this.database_setup();
            // this.create_table_users();
        } catch (error) {
            console.log("Ocorreu um erro:", error)
        }
    }
}

const makeDb = new DatabaseSqlite(); 
export const db = makeDb.getDb();