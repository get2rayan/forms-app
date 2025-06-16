import { Collection, Document as MongoDoc, Db, MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

console.log('mongo db uri: ', process.env.MONGODB_URI);
const uri = process.env.MONGODB_URI || '';
if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

class MongoDbClient extends MongoClient {    
    constructor(uri: string) {
        super(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        });
    }

    private static instance: MongoDbClient;

    static getInstance(): MongoDbClient {
        if (!MongoDbClient.instance) {            
            MongoDbClient.instance = new MongoDbClient(uri);
        }
        return MongoDbClient.instance;
    }

    db(dbName?: string): Db {
        if (!dbName) {
            dbName = process.env.DB_NAME;
            if (!dbName) {
                throw new Error('DB_NAME environment variable is not defined');        
            }
        }
        return super.db(dbName);    
    }

    collection<T extends MongoDoc>(collectionName?: string, dbName?: string): Collection<T> { 
        if (!collectionName) {
            collectionName = process.env.COLLECTION_NAME;
            if (!collectionName) {
                throw new Error('COLLECTION_NAME environment variable is not defined');
            }
        }
        return this.db(dbName).collection<T>(collectionName);
    }

    async disconnect(): Promise<void> {
        try {
            await super.close();
            console.log('Disconnected from MongoDB successfully');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
            throw error; // Re-throw the error for further handling
        }
    }
}

export const mongoDbClient = MongoDbClient.getInstance();
