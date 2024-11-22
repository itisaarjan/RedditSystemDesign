# Reddit Clone - System Design Implementation

## Description
This project is a simplified version of Reddit, implemented using **React** for the frontend and **Node.js** with **Express** for the backend. It includes core features such as subreddit timelines, user subscriptions, post creation, upvoting, commenting, and user profile management. The system is designed with scalability, performance, and security in mind.

## Features
- Subreddit timelines with posts ordered by creation time.
- User subscription to subreddits and post submission functionality.
- Upvote and comment features for posts (one upvote per user).
- User profiles displaying subscribed subreddits and total upvotes received.
- JWT-based authentication for secure API access.
- Password encryption using bcrypt for enhanced security.
- CORS implemented for handling cross-origin requests.

## Technologies Used
### Frontend
- **React**: For building a dynamic and responsive user interface.

### Backend
- **Node.js** and **Express**: For creating RESTful APIs.
- **JWT**: For secure user authentication.
- **Bcrypt**: For password hashing and encryption.
- **CORS**: For handling cross-origin resource sharing.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/reddit-clone.git
   ```
2. Navigate to the project directory:
   ```bash
   cd reddit-clone
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Usage
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend server:
   ```bash
   cd ../frontend
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## Contributions
Contributions are welcome! Please fork the repository, make your changes, and create a pull request.

---

Let me know if you'd like further refinements!
