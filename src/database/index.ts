import mongoose from 'mongoose';

export async function setupMongo(): Promise<void> {
	try {
		if (mongoose.connection.readyState === 1) {
			return;
		}

		console.log('🎲 Connecting to debugger...');
		await mongoose.connect(process.env.MONGO_URL as string);
		console.log('✅ DB Connected!');
	} catch (error) {
		throw new Error('❌ DB not Connection.');
	}
}
