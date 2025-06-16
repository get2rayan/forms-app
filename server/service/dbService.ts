// import { Collection, MongoClient } from 'mongodb';
// import dotenv from 'dotenv';
// import { client, db, collection } from '../lib/mongoClient';
// dotenv.config(); // Load environment variables from .env file

// interface IDBService {
//     connect(): Promise<void>;
//     disconnect(): Promise<void>;
//     getCollection<T>(collectionName: string): Promise<T[]>;
//     insertDocument<T>(collectionName: string, document: T): Promise<void>;
//     updateDocument<T>(collectionName: string, filter: object, update: Partial<T>): Promise<void>;
//     deleteDocument(collectionName: string, filter: object): Promise<void>;
//     findDocument<T>(collectionName: string, filter: object): Promise<T | null>;
// }

// interface TDoc extends Document {}

// class MongoService implements IDBService {

//     private client: MongoClient;
//     private dbName: string; 
//     private _collectionName: string;

//     constructor(client: MongoClient,dbName: string, collectionName?: string) {
//         this.client = client;
//         this.dbName = dbName || process.env.DB_NAME || '';
//         this._collectionName = collectionName || process.env.COLLECTION_NAME || '';
//     }

//     public get collectionName(): string {
//         return this._collectionName;
//     }

//     public set collectionName(value: string) {
//         this._collectionName = value;
//     }

//     public collection(): Collection<TDoc> {
//         if (!this._collectionName) {    
//             throw new Error('Collection name is not defined. Please set the collection name before accessing it.');
//         }
//         return this.client.db(this.dbName).collection<TDoc>(this._collectionName);
//     }
    
//     async connect(): Promise<void> {
//         await this.client.connect();        
//     }
//     async disconnect(): Promise<void> {
//         await this.client.close();
//     }

//     async getCollection<T>(): Promise<T[]> {        
//         return this.collection<T>().find().toArray();
//     }

//     async insertDocument<T>(document: T): Promise<void> {
//         const collection = this.client.db(this.dbName).collection(collectionName);
//         await collection.insertOne(document);
//     }

//     async updateDocument<T>(filter: object, update: Partial<T>): Promise<void> {
//         const collection = this.client.db(this.dbName).collection(collectionName);
//         await collection.updateOne(filter, { $set: update });
//     }

//     async deleteDocument(filter: object): Promise<void> {
//         const collection = this.client.db(this.dbName).collection(collectionName);
//         await collection.deleteOne(filter);
//     }

//     async findDocument<T>(filter: object): Promise<T | null> {
//         const collection = this.client.db(this.dbName).collection(collectionName);
//         return collection.findOne(filter);
//     }
// }

// export const dbService = new MongoService(client, process.env.DB_NAME, process.env.COLLECTION_NAME);