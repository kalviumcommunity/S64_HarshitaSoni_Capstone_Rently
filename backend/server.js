const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
