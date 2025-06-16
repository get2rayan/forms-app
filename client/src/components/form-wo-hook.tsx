import React, { useEffect, useState } from "react";
import { User, Calendar, Phone, MapPin, FileText, Briefcase, Car } from 'lucide-react';
import Footer from "./Footer";
import { Profile } from "common";
import { useProfileContext } from "../context/profile-context";
import { useNavigate } from "react-router-dom";

export default function ProfileForm(){
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: ''
    };
    const [formData, setFormData] = useState({...initialFormData});
    const [isSubmitting, setIsSubmitting] = useState(false);    

    const profileCtx = useProfileContext();
    const navigate = useNavigate();
    
    function resetForm() {
        setFormData({...initialFormData });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();        
        setIsSubmitting(true);

        try{
        // Simulate a network request
        setTimeout(() => {
            console.log(`Submitting... ${JSON.stringify(formData)}`);
            const newProfile: Profile = {
                ...formData
            };
            profileCtx.addProfile(newProfile);      
            
            // Reset form fields
            resetForm();
            setIsSubmitting(false);
            // navigate to thank you page
            navigate('/thank-you');
        }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {      
            console.log('Total user Profiles :', profileCtx.profiles?.length);
        }, [profileCtx.profiles]);
    

    return (
            <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-between p-24">
                <div className="w-full max-w-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-6">
                    <h3 className="text-3xl font-bold text-white flex items-center gap-3"><User className="w-8 h-8" />Candidate Profile </h3>
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-y-2 p-4 shadow-md rounded mt-4">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={formData.firstName}>
                                First Name
                            </label>
                            <input value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                type="text"
                                placeholder="First Name"
                                className="px-6 py-2 rounded"/>  
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={formData.lastName}>
                                Last Name
                            </label>
                            <input value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                type="text"
                                placeholder="Last Name"
                                className="px-6 py-2 rounded"/>  
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={formData.email}>
                                Email
                            </label>
                            <input value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                type="email"
                                placeholder="Email"
                                className="px-6 py-2 rounded"/>
                        </div>
                    </div>
                    <button type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white disabled:bg-gray-400 py-2 rounded">
                            Submit
                        </button>
                    {isSubmitting && <p className="text-blue-500 mt-2">Submitting...</p>}
                </form>
                <Footer />
            </div>
    )
}