import mongoose from 'mongoose';

export async function setupMongo(): Promise<void> {
	try {
		if (mongoose.connection.readyState === 1) {
			return;
		}
		console.log('🎲 Connecting to DB...');
		await mongoose.connect(process.env.MONGO_URL as string);
		console.log('✔ Connected to DB!');
	} catch {
		throw new Error('❌ Db not connected.');
	}
}
