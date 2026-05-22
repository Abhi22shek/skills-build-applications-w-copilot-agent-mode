import mongoose from 'mongoose';

const defaultMongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

export const getMongoUri = (): string => process.env.MONGODB_URI || defaultMongoUri;

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(getMongoUri());
};
