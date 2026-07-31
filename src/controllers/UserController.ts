import { UserService } from "../services/UserService.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UserControlller {
    userController = new UserService();
    async createDatabase(request: FastifyRequest, reply:FastifyReply) {
        
    }
    constructor() {
        
    }
}