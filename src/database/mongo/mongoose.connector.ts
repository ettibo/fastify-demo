import mongoose from 'mongoose';

class MongoConnector {
	private static instance: MongoConnector;

	static getMongoConnector(): MongoConnector {
		if (!this.instance) {
			this.instance = new MongoConnector();
		}
		return this.instance;
	}

	openDatabaseConnection = async () => {
		await mongoose.connect('mongodb://localhost:27017/fastify-tutorial');
	};

	closeDatabaseConnection = async () => {
		await mongoose.disconnect();
	};
}

export default MongoConnector;
