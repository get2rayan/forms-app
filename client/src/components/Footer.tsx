export default function Footer({className} : { className?: string }) {
    return (
        <footer className={`bg-gray-100 border-gray-200 py-4 ${className ?? ""}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center">
                    <p className="text-gray-600 text-sm">
                        &copy; 2025 All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );  
}