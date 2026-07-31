import sqlite3 from "sqlite3";
import type{ DatabaseConfig } from "../repositories/interfaces/user_interface.js";

class DatabaseSqlite implements DatabaseConfig{
    private db;
    private dbCreated;

    database_setup(): sqlite3.Database {
        const db = new sqlite3.Database("database.db", (error) => {
            if (error) {
                throw new Error(`Erro na criação do arquivo .db: ${error.message}`);
            }
            console.log("Arquivo database criado com sucesso.");
        });
        return db;
    }

    create_table_users(db:sqlite3.Database): boolean {
        let dbCreated = true;
        db.run(` 
            CREATE TABLE IF NOT EXISTS Users (
                user_id INTEGER PRIMARY KEY,
                user_name VARCHAR(100) NOT NULL,
                user_mail VARCHAR(100) UNIQUE,
                user_active INTEGER NOT NULL
            );  
            `, (error) => {
                if (error) {
                    dbCreated = false;
                    throw new Error(`Erro na criação da tabela Users: ${error.message}`);
                }
                console.log("Tabela Users criada com sucesso.");
        })
        return dbCreated;        
    }

    constructor(){
        try {
            this.db = this.database_setup();
            this.dbCreated = this.create_table_users(this.db);
            if (this.dbCreated) {
                console.log("Criado com sucesso.")
            } 
        } catch (error) {
            console.log("Ocorreu um erro:", error)
        }
    }
}

const makeDb = new DatabaseSqlite(); 