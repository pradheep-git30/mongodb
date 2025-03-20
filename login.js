const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/SampleDb1')
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Error connecting to MongoDB"));

// User Schema & Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve Registration Page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

// Registration Handler
app.post('/register', async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await User.create(userData);
    res.send('<h2>Registration Successful. <a href="/login">Login Here</a></h2>');
  } catch (err) {
    res.status(500).send('Error during registration');
  }
});

// Serve Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Login Handler
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.send('<h2>Login Successful</h2>');
    } else {
      res.send('<h2>Invalid Username or Password</h2>');
    }
  } catch (err) {
    res.status(500).send('Error during login');
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000");
});
