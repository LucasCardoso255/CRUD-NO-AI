export interface DatabaseConfig {
    database_setup(): void;
    create_table_users(): void;
}