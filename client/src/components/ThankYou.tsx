import { useLocation } from "react-router-dom";
import Footer from "./Footer";

export function ThankYou() {
    const location = useLocation();
    const isSubmitted = location.state?.isSubmitted || false; // Default to false if not provided
    const error = location.state?.error || null; // Default to false if not provided
  return (        
        <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center p-12 sm:p-24"> {/* Changed to justify-center, adjusted padding for small screens */}
    
          {/* Card container to group the content */}
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
           { isSubmitted ? ( 
            <>
              {/* Header Section with Gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white text-center">
                      Thank you for submitting your profile!
                  </h3>
              </div>
              
              {/* Body Section with the message */}
              <div className="p-6 sm:p-8 text-center">
                  <p className="text-lg text-gray-700 leading-relaxed">
                      We will review your information and get back to you shortly.
                  </p>
                  
                  {/* Optional: Add a button or link for next actions */}
                  <div className="mt-8">
                      <button
                          type="button" // Or use an <a> tag for navigation
                          onClick={() => window.location.href = '/client'} // Adjust the URL as needed
                          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                      >
                          Back to Homepage
                      </button>
                  </div>
              </div>
            </>   
            ) : (   
                <>
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white text-center">
                        Profile Submission ERROR
                    </h3>
                    </div>
                    <div className="p-6 sm:p-8 text-center">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            There was an issue submitting your profile. Please try again later.
                            error: {error ? error.message : "Unknown error occurred."}  
                        </p>
                    </div>
                </>
                )}                
          </div>

          {/* You could have a global footer outside this centered card if needed */}
          {/* e.g., <footer className="absolute bottom-0 w-full text-center p-4 text-gray-600">© 2025 Your Company</footer> */}
          <Footer />
      </div>                
  );
}   