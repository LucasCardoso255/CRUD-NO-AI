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
    removeUser(user_id: string): Promise<string>
    updateUser(user: User): Promise<string>
    getUserById(user_id: string): Promise<User | undefined>
    getUserByMail(user_mail: string): Promise<User | undefined>
}