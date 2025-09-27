import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, List, ListItem, ListItemText, ListItemIcon, Drawer, IconButton, Menu, MenuItem, Modal, TextField, Chip, Avatar, ListSubheader, Divider, ListItemAvatar, Stepper, Step, StepLabel, StepConnector, CardMedia, Tooltip, Table, TableHead, TableRow, TableCell, TableBody, Paper, Link as MuiLink, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaArrowLeft } from 'react-icons/fa';
import {
  Payment as PaymentIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  Build as BuildIcon,
  AccountBalanceWallet as WalletIcon,
  Edit,
  Delete,
  AccountCircle,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CLOUDINARY_CONFIG, { isCloudinaryConfigured } from '../config/cloudinary';

const drawerWidth = 200;

const Sidebar = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#1C1C1C',
    color: '#F8F9F9',
    paddingTop: theme.spacing(4),
    alignItems: 'center',
    '& .MuiListItemIcon-root': {
      color: '#AAB2B3',
    },
    '& .MuiListItemText-primary': {
      color: '#F8F9F9',
    },
    '& .MuiListItem-root:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
}));

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  margin: '0 auto',
  padding: theme.spacing(4, 0, 0, 0),
  maxWidth: 900,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ScrollRow = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  overflowX: 'auto',
  gap: theme.spacing(4),
  mb: theme.spacing(4),
  pb: theme.spacing(1),
  '::-webkit-scrollbar': { height: 8 },
  '::-webkit-scrollbar-thumb': { background: '#ccc', borderRadius: 4 },
}));

const PropertyCard = styled(Card)(({ theme }) => ({
  minWidth: 260,
  maxWidth: 320,
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(2),
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const AddPropertyCard = styled(Card)(({ theme }) => ({
  minWidth: 260,
  maxWidth: 320,
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  cursor: 'pointer',
  border: '2px dashed #aaa',
  color: '#888',
  background: '#fafafa',
  transition: 'background 0.2s',
  '&:hover': {
    background: '#f0f0f0',
  },
}));

const SummaryRow = styled(Grid)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  marginBottom: theme.spacing(5),
  justifyContent: 'center',
}));

const SummaryCard = styled(Card)(({ theme }) => ({
  minWidth: 180,
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const BlockRow = styled(Grid)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  justifyContent: 'center',
}));

const BlockCard = styled(Card)(({ theme }) => ({
  minHeight: 220,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: theme.spacing(4),
  width: '100%',
}));

const QuickActionButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  justifyContent: 'flex-start',
  padding: theme.spacing(2),
  backgroundColor: '#F8F9F9',
  color: '#1C1C1C',
  '&:hover': {
    backgroundColor: '#E8E8E8'
  }
}));

const statusColors = {
  Available: 'success',
  Occupied: 'warning',
  'Maintenance Issue': 'error',
};

const AddButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  alignSelf: 'flex-end',
}));

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: '#fff',
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
}));

// Timeline connector styling
const TimelineConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    minHeight: 32,
    borderLeftWidth: 2,
    borderColor: theme.palette.grey[400],
    marginLeft: 10,
  },
}));

const LandlordDashboard = () => {
  // Section refs
  const propertiesRef = useRef(null);
  const tenantsRef = useRef(null);
  const paymentsRef = useRef(null);
  const maintenanceRef = useRef(null);
  const remindersRef = useRef(null);

  // Get current user (landlord) from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const landlordKey = user && user.email ? `landlord_properties_${user.email}` : 'landlord_properties';

  // Load properties for this landlord from localStorage or start with an empty array
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem(landlordKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist properties to localStorage for this landlord whenever they change
  useEffect(() => {
    localStorage.setItem(landlordKey, JSON.stringify(properties));
  }, [properties, landlordKey]);

  const [recentActivities] = useState([
    { type: 'payment', description: 'John Doe paid rent for May', date: '2024-05-01' },
    { type: 'maintenance', description: 'New maintenance request: Plumbing issue', date: '2024-05-02' },
    { type: 'lease', description: 'Lease renewal for Apartment 101', date: '2024-05-03' }
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '',
    image: '',
    address: '',
    city: '',
    area: '',
    status: 'Available',
    availableDate: '',
    description: '',
    rent: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);

  // Dummy tenants and maintenance requests for overview
  const tenantsData = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', leaseStart: '2023-06-01', leaseEnd: '2024-06-01', propertyId: 1 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', leaseStart: '2023-07-01', leaseEnd: '2024-07-01', propertyId: 2 },
  ];
  const maintenanceData = [
    { id: 1, propertyId: 1, date: '2024-05-02', desc: 'Plumbing issue in Apt 101', status: 'Open' },
    { id: 2, propertyId: 2, date: '2024-04-15', desc: 'Broken window in Villa', status: 'Resolved' },
  ];

  const navigate = useNavigate();

  // Add state for multiple images
  const [propertyImages, setPropertyImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Enhanced image upload handler
  const handleImageUpload = async (files) => {
    if (!isCloudinaryConfigured) {
      alert('Image uploads are currently disabled because Cloudinary is not configured. Please set VITE_CLOUDINARY_* env vars and restart the app.');
      return;
    }

    setUploadingImages(true);
    setUploadProgress(0);
    const uploadedUrls = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
        formData.append('public_id', `rently_properties/${uuidv4()}`);

        const response = await fetch(CLOUDINARY_CONFIG.uploadUrl, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        uploadedUrls.push(data.secure_url);
        
        // Update progress
        setUploadProgress(((i + 1) / files.length) * 100);
      }

      setPropertyImages(prev => [...prev, ...uploadedUrls]);
      setNewProperty(prev => ({
        ...prev,
        images: [...prev.images || [], ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploadingImages(false);
      setUploadProgress(0);
    }
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    setPropertyImages(prev => prev.filter((_, i) => i !== index));
    setNewProperty(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    // Split address into area and city
    const [area, ...cityParts] = newProperty.address.split(',').map(part => part.trim());
    const city = cityParts.join(',');
    
    setProperties((prev) => [
      ...prev,
      { 
        ...newProperty, 
        id: Date.now(), 
        rent: Number(newProperty.rent),
        area,
        city,
        bedrooms: Number(newProperty.bedrooms),
        bathrooms: Number(newProperty.bathrooms),
        squareFeet: Number(newProperty.squareFeet)
      }
    ]);
    setNewProperty({ 
      name: '', 
      image: '', 
      address: '', 
      city: '',
      status: 'Available', 
      availableDate: '', 
      description: '', 
      rent: '',
      bedrooms: '',
      bathrooms: '',
      squareFeet: ''
    });
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setPropertyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyToDelete));
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  const handleEdit = (property) => {
    setEditMode(true);
    setPropertyToEdit(property);
    setNewProperty({
      name: property.name || '',
      image: property.image || '',
      images: property.images || [],
      address: property.address || '',
      status: property.status || 'Available',
      availableDate: property.availableDate || '',
      description: property.description || '',
      rent: property.rent || '',
      bhk: property.bhk || '',
      furnishing: property.furnishing || '',
      localities: property.localities || [],
    });
    setPropertyImages(property.images || []);
    setModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyToEdit.id
          ? { ...p, ...newProperty, id: propertyToEdit.id }
          : p
      )
    );
    setEditMode(false);
    setPropertyToEdit(null);
    setNewProperty({ name: '', image: '', address: '', status: 'Available', availableDate: '', description: '', rent: '' });
    handleCloseModal();
  };

  // Sidebar scroll handler
  const handleSidebarNav = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add new state for selected property
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Add handler for property selection
  const handlePropertySelect = (property) => {
    navigate(`/property/${property.id}`);
  };

  // Add handler to go back to properties list
  const handleBackToList = () => {
    setSelectedProperty(null);
  };

  const [localityInput, setLocalityInput] = useState('');

  return (
    <Layout>
      <Box sx={{ display: 'flex', minHeight: '100vh', background: '#F8F9F9' }}>
        {/* Sidebar */}
        <Sidebar variant="permanent" anchor="left">
          <Box sx={{ mb: 6 }}>
            <img src="/logo.png" alt="Rently Logo" style={{ height: '40px', width: 'auto', marginBottom: 24 }} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <List>
              <ListItem button onClick={() => handleSidebarNav(propertiesRef)}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Properties" />
              </ListItem>
              <ListItem button onClick={() => handleSidebarNav(tenantsRef)}>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Tenants" />
              </ListItem>
              <ListItem button onClick={() => handleSidebarNav(paymentsRef)}>
                <ListItemIcon><PaymentIcon /></ListItemIcon>
                <ListItemText primary="Rent & Payments" />
              </ListItem>
              <ListItem button onClick={() => handleSidebarNav(maintenanceRef)}>
                <ListItemIcon><BuildIcon /></ListItemIcon>
                <ListItemText primary="Maintenance Requests" />
              </ListItem>
              <ListItem button onClick={() => handleSidebarNav(remindersRef)}>
                <ListItemIcon><NotificationsIcon /></ListItemIcon>
                <ListItemText primary="Reminders & Notices" />
              </ListItem>
            </List>
          </Box>
        </Sidebar>
        <MainContent>
          {/* Welcome Statement */}
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, width: '100%' }}>
            Welcome, {(() => {
              const user = JSON.parse(localStorage.getItem('user'));
              const capitalizeName = (str) => str ? str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
              return user && user.name ? capitalizeName(user.name) : 'Landlord';
            })()}!
          </Typography>

          {!selectedProperty ? (
            // Properties List View
            <section ref={propertiesRef} style={{ width: '100%', marginTop: 24 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Properties</Typography>
              <Grid container spacing={3} sx={{ mb: 2, flexWrap: 'nowrap', overflowX: 'auto' }}>
                {properties.map((property) => (
                  <Grid item key={property.id} sx={{ minWidth: 270, maxWidth: 320 }}>
                    <Card 
                      sx={{ 
                        borderRadius: 3, 
                        boxShadow: 2, 
                        position: 'relative', 
                        minHeight: 260,
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          transition: 'transform 0.2s'
                        }
                      }}
                      onClick={() => handlePropertySelect(property)}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={Array.isArray(property.images) && property.images.length > 0 ? property.images[0] : property.image || '/placeholder-property.jpg'}
                        alt={property.name}
                        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                      />
                      <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1, zIndex: 2 }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(property);
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(property.id);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <CardContent sx={{ pb: '16px !important' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{property.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{property.address}</Typography>
                        <Typography variant="body2" sx={{ 
                          color: property.status === 'Available' ? 'green' : 
                                 property.status === 'Occupied' ? 'gray' : 'red',
                          fontWeight: 500, 
                          mt: 1 
                        }}>
                          {property.status}
                    </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          ₹{property.rent && property.rent.toLocaleString ? property.rent.toLocaleString() : property.rent}/month
                    </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item sx={{ minWidth: 270, maxWidth: 320 }}>
                  <Card 
                    sx={{ 
                      borderRadius: 3, 
                      boxShadow: 2, 
                      minHeight: 260, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      cursor: 'pointer', 
                      color: '#888', 
                      border: '2px dashed #ccc',
                      '&:hover': {
                        background: '#f5f5f5'
                      }
                    }} 
                    onClick={handleOpenModal}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <AddIcon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="body1">Add New Property</Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </section>
          ) : (
            // Property Detail View
            <Box sx={{ width: '100%' }}>
              <Button
                startIcon={<FaArrowLeft />}
                onClick={handleBackToList}
                sx={{ mb: 3 }}
              >
                Back to Properties
              </Button>
              
              {/* Image Gallery */}
              <Card sx={{ mb: 4, borderRadius: 3 }}>
                <CardContent>
                  {/* Airbnb-style Image Grid (non-clickable) */}
                  {Array.isArray(selectedProperty.images) && selectedProperty.images.length > 0 ? (
                    <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '100%', height: 320 }}>
                      {/* Large main image */}
                      <Box sx={{ flex: 2, height: '100%', borderRadius: 2, overflow: 'hidden', boxShadow: 1, bgcolor: '#eee', minWidth: 0 }}>
                        <img
                          src={selectedProperty.images[0]}
                          alt={`Property ${selectedProperty.name} 1`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </Box>
                      {/* 2x2 grid for next 4 images */}
                      <Box sx={{ flex: 1, display: 'grid', gridTemplateRows: '1fr 1fr', gridTemplateColumns: '1fr 1fr', gap: 1, height: '100%', minWidth: 0 }}>
                        {[1,2,3,4].map((idx) => {
                          const img = selectedProperty.images[idx];
                          if (!img) return <Box key={idx} sx={{ bgcolor: '#eee', borderRadius: 2 }} />;
                          // If this is the 5th image and there are more, show overlay
                          if (idx === 4 && selectedProperty.images.length > 5) {
                            return (
                              <Box key={idx} sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', height: '100%' }}>
                                <img
                                  src={img}
                                  alt={`Property ${selectedProperty.name} ${idx + 1}`}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.7)' }}
                                />
                                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 20, bgcolor: 'rgba(0,0,0,0.3)' }}>
                                  +{selectedProperty.images.length - 5} more
                                </Box>
                              </Box>
                            );
                          }
                          return (
                            <Box key={idx} sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
                              <img
                                src={img}
                                alt={`Property ${selectedProperty.name} ${idx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ width: '100%', height: 320, bgcolor: '#eee', borderRadius: 2, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography color="text.secondary">No images available</Typography>
                    </Box>
                  )}
                  {/* Property Title and Address */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>{selectedProperty.name}</Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        {selectedProperty.address}
                    </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => handleEdit(selectedProperty)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(selectedProperty.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Property Overview */}
              <Card sx={{ mb: 4, borderRadius: 3 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={selectedProperty.image}
                  alt={selectedProperty.name}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent>
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6">₹{selectedProperty.rent}/month</Typography>
                        <Typography variant="body2" color="text.secondary">Monthly Rent</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Property Details Tabs */}
              <Grid container spacing={3}>
                {/* Tenants Section */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ borderRadius: 3, p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Current Tenants</Typography>
                    {tenantsData
                      .filter(tenant => tenant.propertyId === selectedProperty.id)
                      .map(tenant => (
                        <Box key={tenant.id} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                          <Typography variant="subtitle1">{tenant.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{tenant.email}</Typography>
                          <Typography variant="body2">
                            Lease: {tenant.leaseStart} - {tenant.leaseEnd}
                          </Typography>
                        </Box>
                      ))}
                  </Card>
                </Grid>

                {/* Maintenance Requests Section */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ borderRadius: 3, p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Maintenance Requests</Typography>
                    {maintenanceData
                      .filter(request => request.propertyId === selectedProperty.id)
                      .map(request => (
                        <Box key={request.id} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                          <Typography variant="subtitle1">{request.desc}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {request.date}
                          </Typography>
                          <Typography variant="body2">
                            Status: {request.status}
                          </Typography>
              </Box>
                      ))}
                  </Card>
                </Grid>

                {/* Payment History Section */}
                <Grid item xs={12}>
                  <Card sx={{ borderRadius: 3, p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Payment History</Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Tenant</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* Add payment history data here */}
                      </TableBody>
                    </Table>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Delete Confirmation Dialog */}
          <Modal open={deleteDialogOpen} onClose={cancelDelete}>
            <ModalBox>
              <Typography variant="h6" sx={{ mb: 2 }}>Confirm Delete</Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>Are you sure you want to delete this property?</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={cancelDelete} variant="outlined">Cancel</Button>
                <Button onClick={confirmDelete} variant="contained" color="error">Delete</Button>
              </Box>
            </ModalBox>
          </Modal>

          {/* Add/Edit Property Modal */}
          <Modal open={modalOpen} onClose={() => { handleCloseModal(); setEditMode(false); setPropertyToEdit(null); }}>
            <ModalBox component="form" onSubmit={editMode ? handleSaveEdit : handleAddProperty} sx={{ background: '#fff', borderRadius: 4, boxShadow: 6, p: 4, maxWidth: 600, minWidth: 320, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, fontFamily: 'Playfair Display, serif', color: '#222', textAlign: 'center' }}>
                {editMode ? 'Edit Property' : 'Add New Property'}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>Title</Typography>
                  <TextField name="name" value={newProperty.name} onChange={handleInputChange} fullWidth required size="medium" sx={{ borderRadius: 2 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>Rent (₹/month)</Typography>
                  <TextField
                    name="rent"
                    value={newProperty.rent}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    size="medium"
                    type="number"
                    InputProps={{
                      startAdornment: <span style={{ color: '#888', marginRight: 4 }}>₹</span>,
                      inputProps: { style: { MozAppearance: 'textfield' }, min: 0 },
                    }}
                    sx={{
                      borderRadius: 2,
                      '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield',
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>Address</Typography>
                  <TextField 
                    name="address" 
                    value={newProperty.address} 
                    onChange={handleInputChange} 
                    fullWidth 
                    required
                    size="medium" 
                    sx={{ borderRadius: 2 }} 
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>BHK</Typography>
                  <TextField
                    name="bhk"
                    value={newProperty.bhk || ''}
                    onChange={handleInputChange}
                    select
                    fullWidth
                    required
                    size="medium"
                    sx={{ borderRadius: 2 }}
                  >
                    {[1,2,3,4,5,6].map(n => (
                      <MenuItem key={n} value={`${n} BHK`}>{n} BHK</MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>Description</Typography>
                  <TextField
                    name="description"
                    value={newProperty.description}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    size="medium"
                    multiline
                    minRows={3}
                    sx={{ borderRadius: 2 }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>Property Images</Typography>
                  <Box sx={{ 
                    border: '2px dashed #ccc', 
                    borderRadius: 2, 
                    p: 2, 
                    textAlign: 'center',
                    bgcolor: '#fafafa',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#f5f5f5'
                    }
                  }}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => {
                        const files = Array.from(e.target.files).slice(0, 20 - propertyImages.length);
                        if (files.length > 0) handleImageUpload(files);
                      }}
                      style={{ display: 'none' }}
                      id="property-images"
                      disabled={uploadingImages || propertyImages.length >= 20}
                    />
                    <label htmlFor="property-images" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <img src="/upload-icon.png" alt="Upload" style={{ width: 48, height: 48 }} />
                        <Typography variant="body1" color="text.secondary">
                          {uploadingImages ? 'Uploading...' : 'Click to upload images'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Supports multiple images (max 20)
                        </Typography>
                      </Box>
                    </label>
                  </Box>

                  {/* Upload Progress */}
                  {uploadingImages && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress variant="determinate" value={uploadProgress} />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        Uploading... {Math.round(uploadProgress)}%
                      </Typography>
                    </Box>
                  )}

                  {/* Image Preview Grid */}
                  {propertyImages.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Uploaded Images:</Typography>
                      <Grid container spacing={1}>
                        {propertyImages.map((image, index) => (
                          <Grid item xs={4} key={index}>
                            <Box sx={{ position: 'relative' }}>
                              <img
                                src={image}
                                alt={`Property ${index + 1}`}
                                style={{
                                  width: '100%',
                                  height: 100,
                                  objectFit: 'cover',
                                  borderRadius: 8
                                }}
                              />
                              <IconButton
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  bgcolor: 'rgba(255,255,255,0.8)',
                                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                                }}
                                onClick={() => handleRemoveImage(index)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>Status</Typography>
                  <TextField select name="status" value={newProperty.status} onChange={handleInputChange} fullWidth size="medium" sx={{ borderRadius: 2 }}>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Occupied">Occupied</MenuItem>
                <MenuItem value="Maintenance Issue">Maintenance Issue</MenuItem>
              </TextField>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>Availability Date</Typography>
                  <TextField
                    name="availableDate"
                    type="date"
                    value={newProperty.availableDate}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                    sx={{ borderRadius: 2 }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>Furnishing</Typography>
                  <TextField
                    name="furnishing"
                    value={newProperty.furnishing || ''}
                    onChange={handleInputChange}
                    select
                    fullWidth
                    required
                    size="medium"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="Fully Furnished">Fully Furnished</MenuItem>
                    <MenuItem value="Semi Furnished">Semi Furnished</MenuItem>
                    <MenuItem value="Not Furnished">Not Furnished</MenuItem>
                  </TextField>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>Locality (max 6)</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                    {(newProperty.localities || []).map((loc, idx) => (
                      <Chip
                        key={loc + idx}
                        label={loc}
                        onDelete={() => {
                          setNewProperty(prev => ({
                            ...prev,
                            localities: prev.localities.filter((_, i) => i !== idx)
                          }));
                        }}
                        color="primary"
                      />
                    ))}
                  </Box>
                  <TextField
                    value={localityInput}
                    onChange={e => setLocalityInput(e.target.value)}
                    onKeyDown={e => {
                      if ((e.key === 'Enter' || e.key === ',') && localityInput.trim() && (newProperty.localities || []).length < 6) {
                        e.preventDefault();
                        setNewProperty(prev => ({
                          ...prev,
                          localities: [...(prev.localities || []), localityInput.trim()]
                        }));
                        setLocalityInput('');
                      }
                    }}
                    placeholder="Type and press Enter (max 6)"
                    fullWidth
                    size="small"
                    disabled={(newProperty.localities || []).length >= 6}
                    sx={{ borderRadius: 2 }}
                  />
                </Box>
                <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}>
                  {editMode ? 'Save Changes' : 'Add Property'}
                </Button>
              </Box>
            </ModalBox>
          </Modal>
        </MainContent>
      </Box>
    </Layout>
  );
};

export default LandlordDashboard; 