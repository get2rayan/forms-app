import express, { Router, Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { mongoDbClient } from '../lib/mongoDbClient';
import { profileDbService } from '../lib/service/profileDbService';
import { Profile } from 'common';
require('dotenv').config(); // Load environment variables from .env file

const router: Router = express.Router();
router.use(express.json()); // Middleware to parse JSON bodies

// GET all profiles
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profiles = await profileDbService.getAllRecords();
        console.log('Fetched profiles count :', profiles.length); // Log the fetched profiles for debugging
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
        const newProfile: Profile = req.body; // Get the new profile from the request body
        if (!newProfile || !newProfile.firstName || !newProfile.lastName || !newProfile.email) {
            return res.status(400).json({ error: 'Invalid profile data' }); // Return 400 Bad Request if data is invalid
        }
        const result=await profileDbService.insertRecord(newProfile);
        console.log('insert acknowledged:', result); // Log the result of the insert operation for debugging
        if(!result){
            return res.status(500).json({ error: 'Profile insert error'})
        }
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
        const profile = await profileDbService.getRecordById(parseInt(profileId));
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' }); // Return 404 Not Found if profile does not exist
        }
        res.status(200).json(profile); // Send the found profile as JSON response
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// PUT to update a profile by ID
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = req.params.id; // Get the profile ID from the request parameters
        console.log('Updating profile with ID:', profileId); // Log the profile ID for debugging
        const updatedProfile: Profile = req.body; // Get the updated profile from the request body
        if (!updatedProfile || !updatedProfile.firstName || !updatedProfile.lastName || !updatedProfile.email) {
            return res.status(400).json({ error: 'Invalid profile data' }); // Return 400 Bad Request if data is invalid
        }
        const result = await profileDbService.updateRecordById(parseInt(profileId), updatedProfile);
        if (!result) {
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
        const result = await profileDbService.deleteRecordById(parseInt(profileId));
        if (!result) {
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