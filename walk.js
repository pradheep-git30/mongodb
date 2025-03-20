const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/MilesDB')
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Error connecting to MongoDB"));

const walkSchema = new mongoose.Schema({
  name: String,
  email: String,
  distanceInKm: Number
});
const Walk = mongoose.model('Walk', walkSchema);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/walk.html');
});

app.post('/submit', async (req, res) => {
  const { name, email, miles } = req.body;
  const km = parseFloat(miles) * 1.609 ;
  try {
    await Walk.create({ name, email, distanceInKm: km });
    res.send('<h2>Details Saved Successfully</h2>');
  } catch (err) {
    res.status(500).send('Error saving data');
  }
});

app.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
