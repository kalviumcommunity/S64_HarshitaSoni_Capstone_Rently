const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/maintenance-requests', maintenanceRoutes);

app.get('/', (req, res) => {
  res.send('Rently Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
