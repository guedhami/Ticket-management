const express = require('express');
const database = require('./src/database/db.config');
const cors = require('cors');
require('dotenv').config();
const client = require('prom-client');  // Import Prometheus client

const app = express();

// Set up Prometheus registry and metrics
const register = client.register;
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();  // Collect default system metrics

// Create a custom metric (example: request duration in seconds)
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Histogram of HTTP request duration in seconds',
  buckets: [0.1, 0.3, 1.5, 5, 10]  // You can customize the buckets
});

// Middleware to track request duration
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, status_code: res.statusCode });
  });
  next();
});

app.use(express.urlencoded({ extended: true }));
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

// Add /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});
