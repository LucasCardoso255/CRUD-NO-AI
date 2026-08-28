import { UserService } from "../services/UserService.js";
import { randomUUID } from "node:crypto";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { User } from "../repositories/interfaces/user_interface.js";

export type userRequestBody = {
    name: string;
    mail: string;
}

export class UserControlller {
    userService = new UserService();

    private mountUserObject(name: string, mail: string): User {
        return {
            user_id: randomUUID(),
            user_name: name,
            user_mail: mail,
            user_active: 1,
        } 
    }

    async create(request: FastifyRequest <{ Body: userRequestBody }>, reply: FastifyReply) {
        const userObj = this.mountUserObject(request.body.name, request.body.mail);
        try {
            this.userService.createUser(userObj);
            reply.status(201).send("Usuário criado com sucesso.")
        } catch (error) {
            reply.status(400).send(error)
        }
    }

    async find() {

    }

    async findAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const response = this.userService.getUsers();
            reply.status(200).send(response);
        } catch (error) {
            reply.status(401).send(error);
        }
    }

    async update() {

    }

    async delete() {

    }
}