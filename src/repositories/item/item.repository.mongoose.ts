import mongoose from 'mongoose';
import MongoConnector from '../../database/mongo/mongoose.connector';
import { ItemModel } from '../../database/models/item';
import { Item } from '../../data/item/item';
import IItemRepository from './item.repository';

class ItemRepository implements IItemRepository {
	fetchItems: () => Promise<Item[]> = async () => {
		await MongoConnector.getMongoConnector().openDatabaseConnection();
		const items: Item[] = [];
		for await (const doc of ItemModel.find()) {
			items.push(new Item(doc._id.toString(), doc.name ?? ''));
		}
		await MongoConnector.getMongoConnector().closeDatabaseConnection();
		return items;
	};

	fetchItem: (id: string) => Promise<Item> = async (id: string) => {
		await MongoConnector.getMongoConnector().openDatabaseConnection();
		const item = await ItemModel.findById(new mongoose.Types.ObjectId(id));
		await MongoConnector.getMongoConnector().closeDatabaseConnection();
		return new Item(id, item?.name ?? '');
	};

	createItem: (name: string) => Promise<void> = async (name: string) => {
		await MongoConnector.getMongoConnector().openDatabaseConnection();
		await ItemModel.create({ name: name });
		await MongoConnector.getMongoConnector().closeDatabaseConnection();
	};

	deleteItem: (id: string) => Promise<number> = async (id: string) => {
		await MongoConnector.getMongoConnector().openDatabaseConnection();
		const res = await ItemModel.deleteOne({ _id: id });
		await MongoConnector.getMongoConnector().closeDatabaseConnection();
		return res.deletedCount;
	};

	updateItem: (id: string, name: string) => Promise<Item> = async (
		id: string,
		name: string
	) => {
		await MongoConnector.getMongoConnector().openDatabaseConnection();
		const item = await ItemModel.findById(id);
		if (item) item.name = name;
		await MongoConnector.getMongoConnector().closeDatabaseConnection();
		return new Item(id, item?.name ?? '');
	};
}

export default ItemRepository;
