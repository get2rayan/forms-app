import express, { Router, Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { mongoDbClient } from '../lib/mongoDbClient';
import { profileDoc } from '../types/profileDoc'; // Import the Profile type
require('dotenv').config(); // Load environment variables from .env file

const router: Router = express.Router();
const profileDbName = process.env.DB_NAME || 'formsDB'; // Name of the MongoDB database for profiles
const profilesCollectionName = process.env.COLLECTION_NAME || 'profiles'; // Name of the MongoDB collection for profiles

router.use(express.json()); // Middleware to parse JSON bodies

// GET all profiles
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profiles = await mongoDbClient.collection<profileDoc>(profilesCollectionName, profileDbName).find().toArray();
        console.log('Fetched profiles:', profiles); // Log the fetched profiles for debugging
        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ error: 'No profiles found' }); // Return 404 Not Found if no profiles exist
        }
        res.status(200).json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST a new profile
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const newProfile: profileDoc = req.body; // Get the new profile from the request body
        if (!newProfile || !newProfile.firstName || !newProfile.lastName || !newProfile.email) {
            return res.status(400).json({ error: 'Invalid profile data' }); // Return 400 Bad Request if data is invalid
        }
        //newProfile._id = new ObjectId(); // Generate a new ObjectId for the profile
        const result = await mongoDbClient.collection<profileDoc>(profilesCollectionName, profileDbName).insertOne(newProfile);
        console.log('Inserted profile:', result); // Log the inserted profile for debugging
        res.status(201).json(newProfile); // Send the created profile as JSON response with 201 Created status
    } catch (error) {
        console.error('Error adding profile:', error);  
        res.status(500).json({ error: 'Internal Server Error' });
    }   
});

// GET a profile by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = req.params.id; // Get the profile ID from the request parameters
        console.log('Fetching profile with ID:', profileId); // Log the profile ID for debugging
        const profile = await mongoDbClient.collection<profileDoc>(profilesCollectionName, profileDbName).findOne({ _id: new ObjectId(profileId) });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' }); // Return 404 Not Found if profile does not exist
        }
        res.status(200).json(profile); // Send the found profile as JSON response
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
// PUT to update a profile by ID
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = req.params.id; // Get the profile ID from the request parameters
        console.log('Updating profile with ID:', profileId); // Log the profile ID for debugging
        const updatedProfile: profileDoc = req.body; // Get the updated profile from the request body
        if (!updatedProfile || !updatedProfile.firstName || !updatedProfile.lastName || !updatedProfile.email) {
            return res.status(400).json({ error: 'Invalid profile data' }); // Return 400 Bad Request if data is invalid
        }
        const result = await mongoDbClient.collection<profileDoc>(profilesCollectionName, profileDbName).updateOne(
            { _id: new ObjectId(profileId) },
            { $set: updatedProfile }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Profile not found' }); // Return 404 Not Found if profile does not exist
        }
        res.status(200).json(updatedProfile); // Send the updated profile as JSON response
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE a profile by ID
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = req.params.id; // Get the profile ID from the request parameters
        console.log('Deleting profile with ID:', profileId); // Log the profile ID for debugging
        const result = await mongoDbClient.collection<profileDoc>(profilesCollectionName, profileDbName).deleteOne({ profileId: { $eq : parseInt(profileId) }});
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Profile not found' }); // Return 404 Not Found if profile does not exist
        }
        res.status(204).send(); // Send 204 No Content response for successful deletion
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Catch-all route for any other requests
router.get('/*splat', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: 'Not Found' }); // Return 404 Not Found for any other requests
});

export default router;

