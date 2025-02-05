import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler
} from 'fastify-type-provider-zod';

const app = fastify({ logger: true });
app
	.setValidatorCompiler(validatorCompiler)
	.setSerializerCompiler(serializerCompiler);
const PORT = 5000;
const HOST = '0.0.0.0';

const start = async () => {
	try {
		await app.register(fastifySwagger, { transform: jsonSchemaTransform });
		await app.register(fastifySwaggerUi, {
			routePrefix: '/documentation'
		});
		await app.register(AutoLoad, {
			dir: join(__dirname, 'src', 'plugins')
		});
		await app.register(AutoLoad, {
			dir: join(__dirname, 'src', 'routes')
		});
		await app.ready();
		app.swagger();
		await app.listen({ port: PORT, host: HOST });
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
};
start();
