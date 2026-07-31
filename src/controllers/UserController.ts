import { UserService } from "../services/UserService.js";

export class UserControlller {
    userController = new UserService();
    
    constructor() {
        
    }
}