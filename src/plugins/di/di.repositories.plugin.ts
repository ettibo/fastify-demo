import fp from 'fastify-plugin';
import ItemRepository from '../../repositories/item/item.repository.mongoose';

export default fp(async (fastify) => {
	fastify.decorate('itemRepository', new ItemRepository());
});
