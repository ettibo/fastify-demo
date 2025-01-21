import sensible from '@fastify/sensible';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

const SensiblePlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
	app.register(sensible);
};

export default SensiblePlugin;
