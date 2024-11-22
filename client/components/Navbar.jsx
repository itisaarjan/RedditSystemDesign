import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('/auth/protected', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setIsLoggedIn(true);
                        setUser(userData.user);
                    } else {
                        throw new Error('Authentication failed');
                    }
                } catch {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            }
        };
        checkAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <nav className="w-full bg-indigo-50 border-b border-gray-200 py-5">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-indigo-700">
                    <a href="/">MyApp</a>
                </div>

                <div className="flex items-center space-x-8">
                    <a href="/posts" className="text-gray-600 hover:text-indigo-700 transition-colors px-3 py-2 rounded-md">
                        Posts
                    </a>

                    {isLoggedIn ? (
                        <>
                            <a href="/my-posts" className="text-gray-600 hover:text-indigo-700 transition-colors px-3 py-2 rounded-md">
                                My Posts
                            </a>
                            <a href="/profile" className="text-gray-600 hover:text-indigo-700 transition-colors px-3 py-2 rounded-md">
                                Profile
                            </a>
                            <a href="/create-post" className="text-gray-600 hover:text-indigo-700 transition-colors px-3 py-2 rounded-md">
                                Create Post
                            </a>
                            <button 
                                onClick={handleLogout}
                                className="text-red-600 hover:text-red-800 transition-colors px-3 py-2 rounded-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="text-gray-600 hover:text-indigo-700 transition-colors px-3 py-2 rounded-md">
                                Login
                            </a>
                            <a href="/signup" className="text-gray-600 hover:text-indigo-700 transition-colors px-3 py-2 rounded-md">
                                Signup
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;