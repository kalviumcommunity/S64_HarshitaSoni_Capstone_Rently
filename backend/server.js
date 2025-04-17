const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

dotenv.config()
connectDB();

// Dummy data for properties
const properties = [
  {
    id: 1,
    name: "Sunset Villas",
    address: "789 Pine Road, Gotham",
    rent: 1800,
    available: true
  }
];

// GET endpoint to return all properties
app.get('/properties', (req, res) => {
  res.status(200).json(properties);
});

// POST endpoint to add a new property
app.post('/properties', (req, res) => {
  const newProperty = {
    id: properties.length + 1,
    ...req.body
  };
  properties.push(newProperty);
  res.status(201).json({ message: 'Property added successfully', data: newProperty });
});

// ✅ PUT endpoint to update a property by ID
app.put('/properties/:id', (req, res) => {
  const propertyId = parseInt(req.params.id);
  const propertyIndex = properties.findIndex(p => p.id === propertyId);

  if (propertyIndex === -1) {
    return res.status(404).json({ message: 'Property not found' });
  }

  properties[propertyIndex] = {
    ...properties[propertyIndex],
    ...req.body
  };

  res.status(200).json({ message: 'Property updated successfully', data: properties[propertyIndex] });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
