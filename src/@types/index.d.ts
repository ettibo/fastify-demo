import IItemRepository from '../repositories/item/item.repository';

declare module 'fastify' {
	export interface FastifyInstance {
		itemRepository: ItemRepository;
	}
}
