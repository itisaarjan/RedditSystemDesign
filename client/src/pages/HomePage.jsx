import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [subscribedSubreddits, setSubscribedSubreddits] = useState([]);

    // Fetch posts and user-subscribed subreddits on load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsResponse = await axios.get('/posts');
                const userResponse = await axios.get('/users/subscribed', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setPosts(postsResponse.data);
                setSubscribedSubreddits(userResponse.data.subscribedSubreddits || []);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleUpvote = async (postId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `/posts/${postId}/upvote`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? response.data.post : post
                )
            );
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to upvote post');
        }
    };

    const handleDownvote = async (postId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `/posts/${postId}/downvote`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? response.data.post : post
                )
            );
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to downvote post');
        }
    };

    const handleAddComment = async (postId, comment) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `/posts/${postId}/comment`,
                { comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const newComment = response.data?.comment;
            if (newComment) {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === postId
                            ? { ...post, comments: [...post.comments, newComment] }
                            : post
                    )
                );
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Error adding comment:', error.message);
            alert('Failed to add comment. Please try again.');
        }
    };

  const handleSubscribe = async (subredditId) => {
    const token = localStorage.getItem('token');
    try {
        console.log('Attempting to subscribe/unsubscribe to:', subredditId); // Debugging
        const isSubscribed = subscribedSubreddits.includes(subredditId);
        const endpoint = isSubscribed
            ? `/subreddits/${subredditId}/unsubscribe`
            : `/subreddits/${subredditId}/subscribe`;

        const response = await axios.post(endpoint, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });

        // Update subscription state
        setSubscribedSubreddits((prev) =>
            isSubscribed
                ? prev.filter((id) => id !== subredditId)
                : [...prev, subredditId]
        );
        alert(response.data.message);
    } catch (error) {
        console.error('Error subscribing/unsubscribing:', error.response?.data || error.message); // Debugging
        alert('Failed to update subscription.');
    }
};


    if (loading) {
        return <div className="text-center text-gray-500 mt-10">Loading posts...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center py-4">All Posts</h1>
            <div className="space-y-8 container mx-auto px-4">
                {posts.map((post) => {
                    const userId = localStorage.getItem('userId');
                    const hasUpvoted = post.upvotes.includes(userId);
                    const hasDownvoted = post.downvotes.includes(userId);
                    const isSubscribed = subscribedSubreddits.includes(post.subreddit);

                    return (
                        <div key={post._id} className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                            <p className="text-gray-800 text-lg">{post.body}</p>
                            <p className="text-sm text-gray-500 mt-4">
    Subreddit: <span className="font-medium">{post.subreddit?.name || 'Unknown'}</span>
</p>

                            <button
                                onClick={() => handleSubscribe(post.subreddit)}
                                className={`text-white px-4 py-2 rounded-lg mt-2 ${
                                    isSubscribed ? 'bg-red-600' : 'bg-indigo-600'
                                }`}
                            >
                                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                            </button>
                            <p className="text-sm text-gray-500">
                                Posted by: <span className="font-medium">{post.author?.username || 'Anonymous'}</span>
                            </p>
                            <div className="flex items-center mt-4 gap-6">
                                <button
                                    onClick={() => handleUpvote(post._id)}
                                    className={`text-white px-4 py-2 rounded-lg ${
                                        hasUpvoted ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                                >
                                    Upvote ({post.upvoteCount})
                                </button>
                                <button
                                    onClick={() => handleDownvote(post._id)}
                                    className={`text-white px-4 py-2 rounded-lg ${
                                        hasDownvoted ? 'bg-red-600' : 'bg-gray-300'
                                    }`}
                                >
                                    Downvote ({post.downvoteCount})
                                </button>
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-600 font-bold">
                                        Total Upvotes: {post.upvoteCount}
                                    </p>
                                    <p className="text-gray-600 font-bold">
                                        Total Downvotes: {post.downvoteCount}
                                    </p>
                                </div>
                                <span className="text-gray-600">Comments: {post.comments.length}</span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                                {post.comments.length > 0 ? (
                                    <ul className="space-y-2">
                                        {post.comments.map((comment, index) => (
                                            <li key={index} className="text-gray-700 text-sm">
                                                <strong>{comment.user?.username || 'Anonymous'}:</strong> {comment.body}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-sm">No comments yet.</p>
                                )}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const comment = e.target.comment.value;
                                        if (comment) {
                                            handleAddComment(post._id, comment);
                                            e.target.comment.value = '';
                                        }
                                    }}
                                    className="mt-4"
                                >
                                    <input
                                        type="text"
                                        name="comment"
                                        placeholder="Write a comment..."
                                        className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                    >
                                        Add Comment
                                    </button>
                                </form>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
