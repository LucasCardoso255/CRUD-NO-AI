export interface DatabaseConfig {
    database_setup(): object;
    create_table_users(db_obj: object): void;
}