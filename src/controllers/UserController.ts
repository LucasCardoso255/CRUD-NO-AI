import { UserService } from "../services/UserService.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";

export class UserControlller {
    userController = new UserService();

    private generateUserId() {
        const random_user_id = randomUUID()
        return random_user_id
    }
    // async createDatabase(request: FastifyRequest, reply:FastifyReply) {
        
    // }
    constructor() {

    }
}