import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../../../client/src/pages/HomePage';
import LoginPage from '../../../client/src/pages/LoginPage';
import SignupPage from '../../../client/src/pages/SignupPage';
import CreatePostPage from '../../../client/src/pages/CreatePostPage';
import MyPostsPage from '../../../client/src/pages/MyPostsPage'; 

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/my-posts" element={<MyPostsPage />} /> 
            </Routes>
        </Router>
    );
};

export default App;
