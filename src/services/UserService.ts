import type { User } from "../repositories/interfaces/user_interface.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
    private UserRepo = new UserRepository();

    private validateUserParams(user:User){
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

    private generateUserId() {
        
    }

    async updateUser(user: User) {
        try {
            this.validateUserParams(user);
            this.UserRepo.updateUser(user);
        } catch (error) {
            throw new Error("Não foi possível atualizar o usuário.")
        }
    }

    async createUser(user: User) {
        try {
            this.validateUserParams(user);
            this.UserRepo.insertUsers(user);
        } catch (error) {
            throw new Error("Não foi possível criar o usuário.")
        }
    }
    
    constructor(){
        
        // o dia que eu tiver regra de negócio, vou botar aqui

    }
}
