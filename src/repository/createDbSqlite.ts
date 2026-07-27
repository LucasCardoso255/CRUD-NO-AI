import { error } from "node:console";
import sqlite3 from "sqlite3";
import DatabaseConfig from "./interfaces/"


class SqliteDatabase implements DatabaseConfig{

}
const db = new sqlite3.Database("database.db", (error) => {
    if (error) {
        throw new Error(`Erro na criação do arquivo .db: ${error.message}`);
    }
    console.log("Arquivo database criado com sucesso.")
});

db.run(` 
    CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL,
        user_mail VARCHAR(100) UNIQUE,
        user_active INTEGER NOT NULL
    );  
    `, (error) => {
        if (error) {
            throw new Error(`Erro na criação da tabela Users: ${error.message}`)
        }
        console.log("Tabela Users criada com sucesso.")
    })