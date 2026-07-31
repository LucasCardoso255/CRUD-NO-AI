import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
    private UserRepo = new UserRepository(); 
    private db;

    constructor(){
        // o dia que eu tiver regra de negócio, vou botar aqui
        try {
            this.db = this.UserRepo.database_setup();
            this.UserRepo.create_table_users(this.db);   
        } catch (error) {
            console.log("Ocorreu um erro:", error)
        }
    }
}
