import React, { createContext, useContext, useEffect, useState } from "react";
import { Profile } from "common";
import { ProfileDataService } from "../services/profileDataService";

type ProfileContextType = {
    profiles: Profile[] | null;
    fetchProfiles: () => Promise<Profile[] | null>;
    addProfile: (profile: Profile) => void;
    deleteProfile: (profileId: Profile["profileId"]) => void;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileContextProvider({ children }: { children: React.ReactNode }) {
    
    const [profiles, setProfiles] = useState<Profile[] | null>(null);

    useEffect(() => {
        const initializeProfiles = async () => {
            try {
                const profilesData = await fetchProfiles();
                setProfiles(profilesData);
            } catch (error) {
                console.error("Error initializing profiles:", error);
            }
        };

        initializeProfiles();
    }, [setProfiles]);
    
    const fetchProfiles = async () : Promise<Profile[] | null> => {
        // Fetch profiles from the API
        return await ProfileDataService.getProfiles();
    }

    const addProfile = async (profile: Profile) => {
        // Add new profile to the API
        const isAdded = await ProfileDataService.addProfile(profile);
        if (!isAdded) {
            console.error("Failed to add profile");
            return;
        }
    };

    const deleteProfile = async (profileId: Profile["profileId"]) => {
        // Delete profile from the API
        const isDeleted = await ProfileDataService.deleteProfile(profileId);
        if (!isDeleted) {
            console.error("Failed to delete profile");
            return;
        }
        // Update state after deletion
        setProfiles((prevProfiles) => 
            prevProfiles ? prevProfiles.filter((p) => p.profileId !== Number(profileId)) : null
        );        
    };

    return (
        <ProfileContext.Provider value={{ profiles, fetchProfiles, addProfile, deleteProfile }}>
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