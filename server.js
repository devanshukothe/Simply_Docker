const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3030;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://admin:password@localhost:27017/my-sample-db?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB: my-sample-db"))
.catch(err => console.log("MongoDB connection error:", err));

// Schema & Model (with fixed collection name "User")
const userSchema = new mongoose.Schema({
    name: String,
    email: String
}, { collection: 'User' });

const User = mongoose.model('User', userSchema);

// POST API to add user
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.json(user);
        console.log(user)
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// GET API to fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
