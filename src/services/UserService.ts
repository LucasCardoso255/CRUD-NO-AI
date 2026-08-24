import { error } from "node:console";
import type { User } from "../repositories/interfaces/user_interface.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
    private UserRepo = new UserRepository();
    private isUserDataValid(user:User) {
        if (!user.user_id) {
            throw new Error("ID de usuário não informado.");
        }
        if (!user.user_name) {
            throw new Error("Nome de usuário não informado.");
        }
        if (!user.user_mail) {
            throw new Error("E-mail de usuário não informado.");
        }
        if (!user.user_mail.includes("@")) {
            throw new Error("E-mail inválido.");
        }
    }

    private async isUserDuplicated(new_user_mail:string) {
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
            this.isUserDataValid(user);
            await this.UserRepo.updateUser(user);
        } catch (error) {
            throw new Error("Não foi possível atualizar o usuário.", { cause: error });
        }
    }

    public async createUser(user: User) {
        this.isUserDataValid(user);
        await this.isUserDuplicated(user.user_mail);
        await this.UserRepo.insertUsers(user);
    }  

    public async getUsers(userLimit: number=20) {
        try {
            const users = await this.UserRepo.queryUsers(userLimit);
            return users;
        } catch (error) {
            throw new Error("Não foi possível consultar usuários.", { cause: error })
        }
    }

    public async removeUser(user_id: string) {
        try {
            await this.validateUserExists(user_id)
            await this.UserRepo.removeUser(user_id);
        } catch (error) {
            throw new Error("Não foi possível remover o usuário.", { cause: error })
        }
    }
}