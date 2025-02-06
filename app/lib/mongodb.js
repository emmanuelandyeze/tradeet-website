import { MongoClient } from 'mongodb';

const uri =
	'mongodb+srv://3riveafrica:chexyemma@cluster0.9j57c3m.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);

export const connectToDatabase = async () => {
	try {
		// Check if the client is already connected
		if (!client.isConnected()) {
			console.log(
				'Database is not connected. Connecting now...',
			);
			await client.connect();
			console.log('Database connected successfully.');
		} else {
			console.log('Database is already connected.');
		}

		// Return the database instance
		return client.db('test');
	} catch (error) {
		console.error(
			'Error connecting to the database:',
			error,
		);
		throw error; // Rethrow the error after logging it
	}
};
