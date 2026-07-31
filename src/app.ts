import Fastify from "fastify";

const fastify = Fastify();

fastify.get('/', async (request, reply) => {
    reply.send({ hello: "world" });
    
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