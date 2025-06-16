import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center p-24">
            <div className="w-full max-w-lg bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
                <h3 className="text-3xl font-bold text-white">404 - Page Not Found</h3>
            </div>
            <Link to="/" className="mt-4 text-blue-500 hover:underline">
                Go back to Home
            </Link>
        </div>
    );
}