import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { string, z } from 'zod';
import {
	ItemNameRequestSchema,
	ItemIdRequestSchema
} from '../../schemas/item.schemas';

type IdItemRequest = FastifyRequest<{
	Params: z.infer<typeof ItemIdRequestSchema>;
}>;

type NameItemRequest = FastifyRequest<{
	Body: z.infer<typeof ItemNameRequestSchema>;
}>;

type ItemRequest = FastifyRequest<{
	Params: z.infer<typeof ItemIdRequestSchema>;
	Body: z.infer<typeof ItemNameRequestSchema>;
}>;

export const getItems = async (req: FastifyRequest, res: FastifyReply) => {
	const items = await req.server.itemRepository.fetchItems();
	res.send(items);
};

export const getItem = async (req: IdItemRequest, res: FastifyReply) => {
	const { id } = req.params;
	const item = await req.server.itemRepository.fetchItem(id);
	res.send(item);
};

export const addItem = async (req: NameItemRequest, res: FastifyReply) => {
	const { name } = req.body;
	const item = await req.server.itemRepository.createItem(name);
	res.code(201).send(item);
};

export const deleteItem = async (req: IdItemRequest, res: FastifyReply) => {
	const { id } = req.params;
	const numberOfItemDeleted = await req.server.itemRepository.deleteItem(id);
	if (numberOfItemDeleted > 0) {
		res.send({ message: `Item ${id} has been removed` });
		return;
	}
	res.badRequest(`Item ${id} not found`);
};

export const updateItem = async (req: ItemRequest, res: FastifyReply) => {
	const { id } = req.params;
	const { name } = req.body;
	const item = await req.server.itemRepository.updateItem(id, name);
	if (item) {
		res.send(item);
		return;
	}
	res.badRequest(`Item ${id} not found`);
};
