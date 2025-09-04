const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const { errorHandler } = require('./middleware/error');

dotenv.config();

const app = express();
const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: clientURL, credentials: true }));
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '50kb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT);
  });
}

module.exports = app;
