const app = require('./app');
const dotenv = require('dotenv')
const { logger } = require('./src/utils/logger');

dotenv.config()

const PORT = process.env.PORT || 3000;

// Middleware for logging requests
app.use(logger); // Log all requests

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
