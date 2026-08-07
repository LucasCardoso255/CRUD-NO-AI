export type User = {
    user_id: string,
    user_name: string,
    user_mail: string,
    user_active: number,
}

export interface DatabaseConfig {
    database_setup(): void;
    create_table_users(): void;
}

export interface UserRepo {
    queryUsers(userLimit: number): Promise<User[]>;
    insertUsers(user: User): Promise<string>
    removeUser(): void
    updateUser(): User
}