import dotenv from 'dotenv';
import { mongoDbClient } from '../mongoDbClient';
import { Profile } from "common";
import { ObjectId } from 'mongodb';
import { IDbService } from './IDbService';

dotenv.config(); // Load environment variables from .env file

const profileDbName = process.env.DB_NAME || 'formsDB'; // Name of the MongoDB database for profiles
const profilesCollectionName = process.env.COLLECTION_NAME || 'profiles'; // Name of the MongoDB collection for profiles

class ProfileDbService implements IDbService<Profile>{
    async getAllRecords(): Promise<Profile[]> {
        return await mongoDbClient.collection<Profile>(profilesCollectionName, profileDbName)
                .find().toArray();
    }
    async getRecordById(recordId: number): Promise<Profile | null> {
        return await mongoDbClient.collection<Profile>(profilesCollectionName, profileDbName)
                .findOne({ _id: new ObjectId(recordId) });
    }
    async insertRecord(record : Profile): Promise<boolean>{
        return await mongoDbClient.collection<Profile>(profilesCollectionName, profileDbName)
                .insertOne(record)
                .then(result => result.insertedId ? true : false);
    }
    async updateRecordById(recordId: number, updatedRecord: Profile): Promise<boolean> {
        return await mongoDbClient.collection<Profile>(profilesCollectionName, profileDbName)
                .updateOne(
                    { _id: new ObjectId(recordId) },
                    { $set: updatedRecord }
                )
                .then(result => result.modifiedCount > 0);
    }
    async deleteRecordById(recordId: number): Promise<boolean> {
        return await mongoDbClient.collection<Profile>(profilesCollectionName, profileDbName)
                .deleteOne({ profileId: { $eq : recordId }})
                .then(result => result.deletedCount > 0);
    }
}

export const profileDbService = new ProfileDbService();