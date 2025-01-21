import { Item } from '../../data/item/item';

export default interface IItemRepository {
	fetchItems(): Promise<Item[]>;
	fetchItem(id: string): Promise<Item>;
	createItem(name: string): Promise<void>;
	deleteItem(id: string): Promise<number>;
	updateItem(id: string, name: string): Promise<Item>;
}
