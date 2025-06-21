import React, { createContext, useContext, useEffect, useState } from "react";
import { Profile } from "common";
import { ProfileDataService } from "../services/profileDataService";

type ProfileContextType = {
    profiles: Profile[] | null;
    addProfile: (profile: Profile) => void;
    deleteProfile: (profileId: Profile["profileId"]) => void;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileContextProvider({ children }: { children: React.ReactNode }) {
    
    const [profiles, setProfiles] = useState<Profile[] | null>(null);

    useEffect(() => {
        // get existing profiles from api
        ProfileDataService.getProfiles()
            .then((profiles) => {
                setProfiles(profiles);  // Initialize state with fetched profiles                
            })
            .catch((error) => {
                console.error("Error fetching profiles:", error);
                throw error;
            });
    }, [setProfiles]);
    
    const addProfile = async (profile: Profile) => {
        // Add new profile to the API
        try {
            const isAdded = await ProfileDataService.addProfile(profile);
            if (!isAdded) {
                console.error("Failed to add profile");
                return;
            }
        } catch (error) {
            throw error;
        }
    };

    const deleteProfile = async (profileId: Profile["profileId"]) => {
        // Delete profile from the API
        try {
            const isDeleted = await ProfileDataService.deleteProfile(profileId);
            if (!isDeleted) {
                console.error("Failed to delete profile");
                return;
            }
            // Update state after deletion
            setProfiles((prevProfiles) => 
                prevProfiles ? prevProfiles.filter((p) => p.profileId !== Number(profileId)) : null
            );
        } catch (error) {
            console.error("Error deleting profile:", error);
        }
    };

    return (
        <ProfileContext.Provider value={{ profiles, addProfile, deleteProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfileContext must be used within a ProfileContextProvider");
    }
    return context;
}