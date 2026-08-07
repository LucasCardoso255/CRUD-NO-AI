import { UserService } from "../services/UserService.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto"; //ADICIONAR UM RANDOM_ID PARA O USER E PASSAR COMO PARAMETRO PARA A FUNÇÃO do repository


export class UserControlller {
    userController = new UserService();
    // async createDatabase(request: FastifyRequest, reply:FastifyReply) {
        
    // }
    constructor() {

    }
}