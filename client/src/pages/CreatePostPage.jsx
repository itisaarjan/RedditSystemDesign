import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [subreddit, setSubreddit] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Fetch or create subreddit
    const getOrCreateSubreddit = async (subredditName) => {
        try {
            // Check if subreddit exists
            const response = await axios.get(`/subreddits?name=${subredditName}`);
            if (response.data && response.data._id) {
                return response.data._id;
            } else {
                // Create the subreddit if it doesn't exist
                const createResponse = await axios.post(
                    '/subreddits',
                    { name: subredditName },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                return createResponse.data._id;
            }
        } catch (err) {
            console.error('Error fetching or creating subreddit:', err.message);
            setError('Failed to fetch or create subreddit');
            throw new Error('Failed to fetch or create subreddit');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Get or create subreddit ID
            const subredditId = await getOrCreateSubreddit(subreddit);
            if (!subredditId) {
                setError('Subreddit ID is invalid');
                return;
            }

            // Create post with subreddit ID
            const token = localStorage.getItem('token');
            const response = await axios.post(
                '/posts',
                { title, body, subreddit: subredditId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setSuccess(response.data.message);
            setTimeout(() => navigate('/'), 2000); // Redirect to home after successful creation
        } catch (err) {
            console.error('Error creating post:', err.response?.data?.error || err.message);
            setError(err.response?.data?.error || 'Error creating post');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Post</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter post title"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Body</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="6"
                            placeholder="Write your post content here"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Subreddit</label>
                        <input
                            type="text"
                            value={subreddit}
                            onChange={(e) => setSubreddit(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter subreddit name"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostPage;
