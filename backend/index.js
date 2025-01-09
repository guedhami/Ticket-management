const express = require('express');
const database = require('./src/database/db.config');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true })); // Corrected from unsubscribe
app.use(express.json());
app.use(cors());

database.mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log('Database connection error:', err);
});

app.get('/', (req, res) => {
    res.send({ message: 'Hello, world' });
});

// Import and use routes
require('./src/api/routes/routes')(app);

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT); // Corrected case
});