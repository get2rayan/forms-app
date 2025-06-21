import Footer from "./Footer";
import { Profile } from "common";
import { useProfileContext } from "../context/profile-context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function ProfileForm(){
    
    const { register, handleSubmit, reset, formState: {errors, isSubmitting } } = useForm<Profile>();
    
    const profileCtx = useProfileContext();
    const navigate = useNavigate();
    
    const onSubmit = async(data: Profile) => {
        let timeoutId : NodeJS.Timeout | undefined;
        try{        
            console.log(`Submitting... ${JSON.stringify(data)}`);
            await new Promise((resolve)=>timeoutId= setTimeout(()=> resolve(profileCtx.addProfile(data)), 1000))
            navigate('/thank-you', { state: { isSubmitted: true } });
        } catch (error) {
            navigate('/thank-you', { state: { isSubmitted: false, error: error } });
        } finally {
            clearTimeout(timeoutId);
            reset();
        }
    };
        
    return (
            <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center p-24"> {/* Consider justify-center here if you want the whole block (header, form, footer) to be vertically centered when content is short */}
                <div className="w-full max-w-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-6 rounded-t-md"> {/* Added rounded-t-md for visual consistency if form below has rounded corners */}
                    <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                        {/* Assuming <User /> is an icon component like from heroicons or lucide-react */}
                        {/* <User className="w-8 h-8" /> */} 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                        Candidate Profile
                    </h3>
                </div>

                {/* Assuming handleSubmit, onSubmit, register, errors, isSubmitting are correctly defined from react-hook-form */}
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="w-full max-w-lg flex flex-col gap-y-4 p-6 bg-white shadow-md rounded-b-md"> {/* Adjusted padding and gap, added rounded-b-md */}
                    
                    <div className="flex flex-wrap -mx-3"> {/* Removed mb-6 here, will add to individual field wrappers or last field wrapper */}
                        {/* First Name Field */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input 
                                {...register("firstName", {
                                    required: "First Name is required", 
                                    minLength: { value: 2, message: "First Name must be at least 2 characters" } ,
                                    maxLength: { value: 30, message: "First Name cannot exceed 30 characters" }
                                })}
                                type="text"
                                id="firstName" // Added id for label association
                                placeholder="First Name"
                                className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                            />  
                            { errors.firstName &&
                                <p className="text-red-500 text-xs italic mt-1">{errors.firstName.message}</p>
                            }
                        </div>

                        {/* Last Name Field */}
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input 
                                {...register("lastName", { 
                                    required: "Last Name is required", 
                                    minLength: { value: 2, message: "Last Name must be at least 2 characters" } ,
                                    maxLength: { value: 30, message: "Last Name cannot exceed 30 characters" }
                                })}
                                type="text"
                                id="lastName" // Added id for label association
                                placeholder="Last Name"
                                className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                            />  
                            { errors.lastName &&
                                <p className="text-red-500 text-xs italic mt-1">{errors.lastName.message}</p>
                            }
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-wrap -mx-3"> {/* Removed mb-6, managing margin on elements directly or wrapper */}
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address"} })}
                                type="email"
                                id="email" // Added id for label association
                                placeholder="Email"
                                className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                            />
                            { errors.email &&
                                <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>
                            }
                        </div>
                    </div>

                    {/* Spacing before button if needed, or rely on form's gap-y */}
                    <div className="mt-4"> {/* Added a wrapper for margin if needed */}
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 transition duration-150 ease-in-out"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>                                        
                </form>
                {/* Assuming <Footer /> is a defined component */}
                <Footer />
            </div>
    )
}