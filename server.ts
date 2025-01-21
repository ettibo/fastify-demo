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
import ItemRepository from './src/repositories/item/item.repository.mongoose';

const app = fastify({ logger: true });
app
	.setValidatorCompiler(validatorCompiler)
	.setSerializerCompiler(serializerCompiler);
const PORT = 5000;

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
		await app.listen({ port: PORT });
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
};
start();
