import { error } from "node:console";
import type { User } from "../repositories/interfaces/user_interface.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
    private UserRepo = new UserRepository();
    private validateUserParams(user:User) {
        if (!user.user_id) {
            throw new Error("ID de usuário não informado.");
        }
        if (!user.user_name) {
            throw new Error("Nome de usuário não informado.");
        }
        if (!user.user_mail) {
            throw new Error("E-mail de usuário não informado.");
        }
    }

    private async validateDuplicateUserByMail(new_user_mail:string) {
        const existing_user = await this.UserRepo.getUserByMail(new_user_mail);
        if (existing_user) {
            throw new Error("Usuário duplicado na base de dados.");
        }
    }

        private async validateUserExists(user_id: string) {
        const user_exists = await this.UserRepo.getUserById(user_id);
        if (!user_exists) {
            throw new Error("Usuário não encontrado.");
        }
    }

    public async updateUser(user: User) {
        try {
            this.validateUserParams(user);
            await this.UserRepo.updateUser(user);
        } catch (error) {
            throw new Error("Não foi possível atualizar o usuário.");
        }
    }

    public async createUser(user: User) {
        try {
            this.validateUserParams(user);
            await this.validateDuplicateUserByMail(user.user_mail);
            await this.UserRepo.insertUsers(user);
        } catch (error) {
            throw new Error("Não foi possível criar o usuário.");
        }
    }  

    public async getUsers(userLimit: number) {
        try {
            await this.UserRepo.queryUsers(userLimit);
        } catch (error) {
            throw new Error("Não foi possível consultar usuários.")
        }
    }
    
    public async removeUser(user_id: string) {
        try {
            await this.validateUserExists(user_id)
            await this.UserRepo.removeUser(user_id);
        } catch (error) {
            throw new Error("Não foi possível remover o usuário.")
        }
    }
}
