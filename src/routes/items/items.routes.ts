import { FastifyInstance, FastifyPluginAsync, FastifySchema } from 'fastify';

import {
	getItem,
	getItems,
	addItem,
	deleteItem,
	updateItem
} from '../../controllers/item/item.controller';

import {
	ItemResponseSchema,
	ItemArrayResponseSchema,
	ItemNameRequestSchema
} from '../../schemas/item.schemas';
import { MessageResponseSchema } from '../../schemas/message.schemas';

const TAG = 'Items';

const getItemSchema: FastifySchema = {
	response: {
		200: ItemResponseSchema
	},
	tags: [TAG]
};

const getItemsSchema: FastifySchema = {
	response: {
		200: ItemArrayResponseSchema
	},
	tags: [TAG]
};

const postItemSchema: FastifySchema = {
	body: ItemNameRequestSchema,
	response: {
		201: ItemResponseSchema
	},
	tags: [TAG]
};

const deleteItemSchema: FastifySchema = {
	response: {
		200: MessageResponseSchema
	},
	tags: [TAG]
};

const updateItemSchema: FastifySchema = {
	response: {
		200: ItemResponseSchema
	},
	tags: [TAG]
};

const ItemPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
	app.get('/:id', { schema: getItemSchema }, getItem);

	app.get('/', { schema: getItemsSchema }, getItems);

	app.post('/', { schema: postItemSchema }, addItem);

	app.delete('/:id', { schema: deleteItemSchema }, deleteItem);

	app.put('/:id', { schema: updateItemSchema }, updateItem);
};

export default ItemPlugin;
