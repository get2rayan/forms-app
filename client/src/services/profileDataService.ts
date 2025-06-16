import { Profile } from "common";

let profilesApiUrl = process.env.REACT_APP_API_URL_PROFILES;
if (!profilesApiUrl)
    throw new Error("API_URL is not defined in the environment variables");

console.log("Using API URL:", profilesApiUrl);

export class ProfileDataService {
    
    static async getProfiles(): Promise<Profile[]> {
        try {
            const response = await fetch(profilesApiUrl!);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) { 
            console.error("Error fetching profiles:", error);
            throw error;
        }
    }

    static async addProfile(profile: Profile): Promise<boolean> {
        try {
            console.log("Adding profile:", profile);
            const response = await fetch(profilesApiUrl!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! ${response.status} : ${response.text()}`);
            }
            return response.ok;
        } catch (error) {
            console.error("Error adding profile:", error);
            throw error;
        }
    }

    static async deleteProfile(profileId: Profile["profileId"]): Promise<boolean> {
        try {
            const response = await fetch(`${profilesApiUrl}/${profileId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.ok;
        } catch (error) {
            console.error("Error deleting profile:", error);
            throw error;
        }
    }   
}