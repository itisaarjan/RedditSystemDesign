import React, { useState, useEffect } from 'react';

const MyPostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyPosts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to view your posts.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/posts/my-posts', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    setError('Failed to fetch posts. Please try again.');
                }
            } catch (err) {
                setError('An error occurred while fetching your posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-600 mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">My Posts</h1>
            {posts.length === 0 ? (
                <p className="text-center text-gray-600">You have not created any posts yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                            <p className="text-gray-600 mt-2">{post.body}</p>
                            <p className="text-sm text-gray-500 mt-4">
                                Subreddit: <span className="font-medium">{post.subreddit}</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Created At: {new Date(post.createdAt).toLocaleString()}
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-green-600 font-bold">
                                    Upvotes: {post.upvoteCount}
                                </p>
                                <p className="text-red-600 font-bold">
                                    Downvotes: {post.downvoteCount}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPostsPage;
