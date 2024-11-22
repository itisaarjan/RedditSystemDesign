const Subreddit = require('../model/subReddit');

// Fetch subreddit by name
const getSubredditByName = async (req, res) => {
    try {
        const subreddit = await Subreddit.findOne({ name: req.query.name });
        if (!subreddit) {
            return res.status(404).json({ error: 'Subreddit not found' });
        }
        res.status(200).json(subreddit);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching subreddit' });
    }
};

// Create a new subreddit
const createSubreddit = async (req, res) => {
    try {
        const { name } = req.body;
        const existingSubreddit = await Subreddit.findOne({ name });
        if (existingSubreddit) {
            return res.status(400).json({ error: 'Subreddit already exists' });
        }

        const subreddit = new Subreddit({ name });
        await subreddit.save();
        res.status(201).json(subreddit);
    } catch (error) {
        res.status(500).json({ error: 'Error creating subreddit' });
    }
};

module.exports = {
    getSubredditByName,
    createSubreddit,
};
