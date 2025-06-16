import { useProfileContext } from "../context/profile-context";
import { User, Calendar, Phone, MapPin, FileText, Briefcase, Car, ChevronRight } from 'lucide-react';
import { NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Profiles() {
    const profileCtx = useProfileContext();
    console.log("Profiles :", profileCtx.profiles);
  return (
     <div className="bg-gray-100 min-h-screen flex flex-col p-4 sm:p-6 md:p-8">
      {/* Overall Page Header (Optional, if you have one above the two columns) */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Profile Management</h1>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 flex-grow max-w-screen-2xl w-full mx-auto">
        {/* Left Column: Profile List */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col flex-shrink-0">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col h-full"> {/* Ensure card takes full height of its column */}
            {/* Header for the List */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-4 sm:px-6 sm:py-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <User className="w-6 h-6 sm:w-7 sm:h-7" />
                Submitted Profiles
              </h3>
            </div>

            {/* Profile List - make it scrollable */}
            <ul className="divide-y divide-gray-200 overflow-y-auto flex-grow"> {/* flex-grow + overflow-y-auto for scrolling */}
              {profileCtx.profiles && profileCtx.profiles.length > 0 ? (
                profileCtx.profiles.map((profile) => (
                  <li key={profile.profileId} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                    <NavLink
                      to={`/profiles/${profile.profileId}`}
                      className={({ isActive }) =>
                        isActive
                          ? 'block px-4 py-3 sm:px-6 sm:py-4 transition-colors duration-150 ease-in-out bg-blue-100 hover:bg-blue-200'
                          : 'block px-4 py-3 sm:px-6 sm:py-4 transition-colors duration-150 ease-in-out hover:bg-gray-100'
                      }
                    >
                      {({ isActive }: { isActive: boolean }) => (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm sm:text-md font-semibold ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                              {profile.firstName} {profile.lastName}
                            </p>
                            <p className={`text-xs sm:text-sm mt-0.5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                              {profile.email}
                            </p>
                          </div>
                          {/* You could add an indicator for active, like a small dot or arrow */}
                          {isActive && (
                            <ChevronRight className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      )}
                    </NavLink>
                  </li>
                ))
              ) : (
                <li className="px-6 py-8 text-center">
                  <p className="text-gray-500 italic">No profiles available.</p>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Right Column: Outlet for Profile Details */}
        <div className="w-full lg:flex-grow bg-white shadow-xl rounded-lg overflow-hidden">
          {/* The Outlet will render the component matched by the route */}
          {/* Add some padding for the content coming from Outlet */}
          <div className="p-4 sm:p-6 md:p-8 h-full"> {/* Ensure padding and height */}
            <Outlet />
          </div>
        </div>
      </div>
      <Footer className="text-gray-800 mb-6 text-center"/>
    </div>
  );
}