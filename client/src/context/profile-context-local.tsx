import React, { createContext, useContext, useState } from "react";
import { Profile } from "common";

// local storage context is used to manage user profiles in the application.
const LocalStorageKey = 'profiles';

type ProfileContextType = {
    profiles: Profile[] | null;
    addProfile: (profile: Profile) => void;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileContextProvider({ children }: { children: React.ReactNode }) {
    // get existing profiles to localStorage
    const existingProfiles = localStorage.getItem(LocalStorageKey);
    // parse existing profiles or initialize to null
    const [profiles, setProfiles] = useState<Profile[] | null>(existingProfiles ? JSON.parse(existingProfiles) : null);

    const addProfile = async (profile: Profile) => {
        setProfiles((prevProfiles) => {
            if (prevProfiles) {
                console.log('Present previous profile')
                return [...prevProfiles, {...profile, profileId: (prevProfiles.at(-1)?.profileId || 0) + 1}]; // Increment profileId based on last profile
            } else {
                console.log('NO previous profile')
                return [{...profile, profileId: 1}]; // Initialize with first profile
            }
        });
        // update localStorage with new profiles
        localStorage.setItem(LocalStorageKey, JSON.stringify([...profiles || [], {...profile, profileId: (profiles?.at(-1)?.profileId || 0) + 1}]));
    };

    return (
        <ProfileContext.Provider value={{ profiles, addProfile }}>
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