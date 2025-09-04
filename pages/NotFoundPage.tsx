
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center container mx-auto px-4 py-16">
            <h1 className="text-6xl font-extrabold text-blue-500 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-white mb-2">Page Not Found</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-md">
                Sorry, the page you are looking for does not exist. It might have been moved or the ticker you searched for is invalid.
            </p>
            <Link to="/">
                <Button variant="primary">
                    Go Back to Home
                </Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
