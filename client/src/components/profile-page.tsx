import { useParams, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useProfileContext } from '../context/profile-context';
import { Profile } from 'common';

export default function ProfilePage() {
    const params = useParams();
    const navigate = useNavigate();
    const profileCtx = useProfileContext();
    if (!profileCtx) {
        return <p className="text-red-500">Profile context not available.</p>;
    }
    const profileId = params.profileId;
    const profile = profileCtx.profiles?.find((p : Profile) => p.profileId === parseInt(profileId || ''));
    
    if (!profile) {
        return <p className="text-red-500">Profile not found.</p>;
    }

    const handleDelete = (profileId: Profile["profileId"]) => {
        if (window.confirm(`Are you sure you want to delete the profile for ${profile.firstName} ${profile.lastName}?`)) {
            // Call the deleteProfile function from the context 
            profileCtx.deleteProfile(profileId);
            navigate(`/profiles`); // Redirect to the profiles list after deletion
        }
    }   

    return (
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
            {/* Profile Information */}
            <div>
                <p className="text-md sm:text-lg font-semibold text-gray-800">
                    {profile.firstName} {profile.lastName}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">
                    {profile.email}
                </p>
                {/* You could add more brief details here if needed */}
            </div>

            {/* Delete Button */}
            <button
                onClick={ ()=> handleDelete(profile.profileId) } // Call the onDelete prop with profileId
                type="button"
                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center gap-1.5 text-xs sm:text-sm transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                aria-label={`Delete profile for ${profile.firstName} ${profile.lastName}`}
            >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />                
            </button>
        </div>
    );
}