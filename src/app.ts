import Fastify from "fastify";
import { UserControlller } from "./controllers/UserController.js";
import type { userRequestBody } from "./controllers/UserController.js";


const fastify = Fastify();
const userController = new UserControlller(); 

fastify.get('/', async (request, reply) => {
    reply.send({ hello: "world" });
})

fastify.get('/users', async (request, reply) => {
    return userController.findAll(request, reply);
})

fastify.post<{ Body: userRequestBody }>('/insertUser', async (request, reply) => {
    return userController.create(request, reply)
})

const start = async () => {
    try {
        await fastify.listen( {port: 3000} );
        console.log("Servidor escutando na porta 3000");
    }   
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start()