export type User = {
    user_id: number,
    user_name: string,
    user_mail: string,
    user_active: number,
}

export interface DatabaseConfig {
    database_setup(): object;
    create_table_users(db_obj: object): boolean;
}

export interface UserRepo {
    queryUsers(): User[];
    insertUsers(): User
    removeUser(): void
    updateUser(): User
}