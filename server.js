const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());

// Init Middleware
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/api/index.js'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5050;

const server = app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
});
