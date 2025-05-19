import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  IconButton,
  Paper,
  Button,
  Divider,
  Autocomplete,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocationOn,
  Bed,
  Bathtub,
  SquareFoot,
  Home as HomeIcon,
  CurrencyRupee,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const DiscoverProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    propertyType: 'all',
    priceRange: [0, 5000],
    bedrooms: 'all',
    bathrooms: 'all',
    location: '',
    city: '',
    area: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [budget, setBudget] = useState('all');
  const [userCity, setUserCity] = useState('');
  const [areaInput, setAreaInput] = useState('');
  const [cityLoading, setCityLoading] = useState(true);

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        console.log('Fetched properties:', data);
        setProperties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      }
    };

    fetchProperties();
  }, []);

  // Geolocation and reverse geocoding for city
  useEffect(() => {
    let didSet = false;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || '';
          setUserCity(city || 'Jaipur');
          setSearchLocation(city || 'Jaipur');
          didSet = true;
        } catch {
          setUserCity('Jaipur');
          setSearchLocation('Jaipur');
        }
      }, () => {
        setUserCity('Jaipur');
        setSearchLocation('Jaipur');
      });
    } else {
      setUserCity('Jaipur');
      setSearchLocation('Jaipur');
    }
    // Fallback in case nothing is set after 2 seconds
    setTimeout(() => {
      if (!didSet) setUserCity('Jaipur');
    }, 2000);
  }, []);

  // Extract all unique area names for the detected city from property addresses
  const allCityAreas = Array.from(new Set(
    properties
      .filter(p => userCity && p.address.toLowerCase().includes(userCity.toLowerCase()))
      .map(p => {
        // Area is the first part of the address before the first comma
        const area = p.address.split(',')[0].trim();
        return area && area.toLowerCase() !== userCity.toLowerCase() ? area : null;
      })
      .filter(Boolean)
  ));

  // Type-ahead filtering for area suggestions, only area names
  const areaOptions = areaInput
    ? allCityAreas.filter(option => option.toLowerCase().includes(areaInput.toLowerCase()))
    : allCityAreas;

  // Filter properties based on search query and filters
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !filters.location || 
      property.address.toLowerCase().includes(filters.location.toLowerCase()) ||
      (property.city && property.city.toLowerCase().includes(filters.location.toLowerCase())) ||
      (property.area && property.area.toLowerCase().includes(filters.location.toLowerCase()));
    
    const matchesPropertyType = filters.propertyType === 'all' || property.type === filters.propertyType;
    const matchesPrice = property.rent >= filters.priceRange[0] && property.rent <= filters.priceRange[1];
    const matchesBedrooms = filters.bedrooms === 'all' || property.bedrooms === parseInt(filters.bedrooms);
    const matchesBathrooms = filters.bathrooms === 'all' || property.bathrooms === parseInt(filters.bathrooms);

    return matchesSearch && matchesLocation && matchesPropertyType && matchesPrice && matchesBedrooms && matchesBathrooms;
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  // New search handler
  const handleSearch = () => {
    setFilters({
      ...filters,
      location: searchLocation,
      propertyType,
      priceRange: budget === 'all' ? [0, 5000] : budget.split('-').map(Number),
    });
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Modern Search Bar with City Chip and Area Autocomplete */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            borderRadius: '32px',
            boxShadow: 1,
            px: 2,
            py: 1,
            mb: 4,
            gap: 2,
            minHeight: 64,
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          {/* City Chip */}
          <Chip
            icon={<LocationOn sx={{ color: 'red' }} />}
            label={userCity || 'Jaipur'}
            sx={{ background: '#fbeaea', color: '#222', fontWeight: 500, fontSize: 16, px: 1.5, borderRadius: 2 }}
          />
          {/* Area/Locality Autocomplete */}
          <Autocomplete
            freeSolo
            options={areaOptions}
            inputValue={areaInput}
            onInputChange={(e, newValue) => {
              setAreaInput(newValue);
              setFilters(prev => ({
                ...prev,
                location: newValue
              }));
            }}
            sx={{ minWidth: 180, flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Enter area or locality"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  style: { fontWeight: 500, background: areaInput ? '#fbeaea' : 'transparent', borderRadius: 16, padding: '4px 12px' },
                }}
              />
            )}
          />
          <Typography sx={{ color: '#aaa', fontWeight: 400, fontSize: 16 }}>Add more...</Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          {/* Property Type */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HomeIcon sx={{ color: 'red' }} />
            <Select
              variant="standard"
              value={propertyType}
              onChange={e => {
                setPropertyType(e.target.value);
                setFilters(prev => ({
                  ...prev,
                  propertyType: e.target.value
                }));
              }}
              disableUnderline
              sx={{ fontWeight: 500, minWidth: 90, '& .MuiSelect-select': { padding: '4px 12px' } }}
            >
              <MenuItem value="all">Flat +1</MenuItem>
              <MenuItem value="apartment">Apartment</MenuItem>
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="condo">Condo</MenuItem>
              <MenuItem value="studio">Studio</MenuItem>
            </Select>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          {/* Budget */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CurrencyRupee sx={{ color: 'red' }} />
            <Select
              variant="standard"
              value={budget}
              onChange={e => {
                setBudget(e.target.value);
                const [min, max] = e.target.value === 'all' ? [0, 5000] : e.target.value.split('-').map(Number);
                setFilters(prev => ({
                  ...prev,
                  priceRange: [min, max]
                }));
              }}
              disableUnderline
              sx={{ fontWeight: 500, minWidth: 90, '& .MuiSelect-select': { padding: '4px 12px' } }}
            >
              <MenuItem value="all">Budget</MenuItem>
              <MenuItem value="0-1000">0 - 1,000</MenuItem>
              <MenuItem value="1000-2000">1,000 - 2,000</MenuItem>
              <MenuItem value="2000-3000">2,000 - 3,000</MenuItem>
              <MenuItem value="3000-5000">3,000 - 5,000</MenuItem>
            </Select>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          {/* Search Button */}
          <Button
            variant="contained"
            sx={{
              background: 'red',
              color: '#fff',
              borderRadius: '32px',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: 18,
              boxShadow: 'none',
              '&:hover': { background: '#c62828' },
            }}
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        {/* Properties Grid */}
        <Grid container spacing={3}>
          {filteredProperties.map((property) => (
            <Grid item key={property._id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
                onClick={() => handlePropertyClick(property._id)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={property.image || '/placeholder-property.jpg'}
                  alt={property.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {property.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                    {property.address}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Chip 
                      icon={<Bed />} 
                      label={`${property.bedrooms} bed`} 
                      size="small" 
                    />
                    <Chip 
                      icon={<Bathtub />} 
                      label={`${property.bathrooms} bath`} 
                      size="small" 
                    />
                    <Chip 
                      icon={<SquareFoot />} 
                      label={`${property.area} sqft`} 
                      size="small" 
                    />
                  </Box>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    ${property.rent}/month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredProperties.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No properties found matching your criteria
            </Typography>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default DiscoverProperties; 