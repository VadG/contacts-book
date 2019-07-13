const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Turn on accepting body type data
app.use(express.json({ extended: false }));

// Connect Database
connectDB();

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Contacts Book API...' })
);

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started  http://localhost:${PORT}`));
