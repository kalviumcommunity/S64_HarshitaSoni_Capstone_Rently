import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../components/Layout';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  Build as BuildIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

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

// Dummy data (should match dashboard)
const properties = [
  {
    id: 1,
    name: 'Sunrise Apartments',
    image: '/property1.jpg',
    address: '123 Main St, Cityville',
    status: 'Available',
    availableDate: '2024-06-01',
    description: 'Spacious 2BHK with balcony and park view.',
    rent: 2500,
  },
  {
    id: 2,
    name: 'Mountain View Villa',
    image: '/property2.jpg',
    address: '456 Hill Rd, Mountain City',
    status: 'Occupied',
    availableDate: '2024-08-15',
    description: 'Luxury villa with private garden and garage.',
    rent: 3200,
  },
];
const tenantsData = [
  { id: 1, name: 'John Doe', email: 'john.doe@email.com', leaseStart: '2023-06-01', leaseEnd: '2024-06-01', propertyId: 1 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', leaseStart: '2023-07-01', leaseEnd: '2024-07-01', propertyId: 2 },
];
const maintenanceData = [
  { id: 1, propertyId: 1, date: '2024-05-02', desc: 'Plumbing issue in Apt 101', status: 'Open' },
  { id: 2, propertyId: 2, date: '2024-04-15', desc: 'Broken window in Villa', status: 'Resolved' },
];

export default function PropertyOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === Number(id));
  const tenants = tenantsData.filter(t => t.propertyId === Number(id));
  const maintenance = maintenanceData.filter(m => m.propertyId === Number(id));

  if (!property) return <Typography>Property not found.</Typography>;

  return (
    <Layout>
      <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
        {/* Sidebar */}
        <Sidebar variant="permanent" anchor="left">
          <Box sx={{ mb: 6 }}>
            <img src="/logo.png" alt="Rently Logo" style={{ height: '40px', width: 'auto', marginBottom: 24 }} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <List>
              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Properties" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Tenants" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><PaymentIcon /></ListItemIcon>
                <ListItemText primary="Rent & Payments" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><BuildIcon /></ListItemIcon>
                <ListItemText primary="Maintenance Requests" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><NotificationsIcon /></ListItemIcon>
                <ListItemText primary="Reminders & Notices" />
              </ListItem>
            </List>
          </Box>
        </Sidebar>
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, pl: { xs: 2, md: 4 }, pr: { xs: 2, md: 4 }, pt: 4, pb: 4, maxWidth: 1100, margin: '0 auto' }}>
          <img src={property.image} alt={property.name} style={{ width: '100%', maxHeight: 350, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>{property.name}</Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>{property.address}</Typography>
          <Typography variant="body1" sx={{ mb: 1 }}><b>Status:</b> {property.status}</Typography>
          <Typography variant="body1" sx={{ mb: 1 }}><b>Available:</b> {property.availableDate}</Typography>
          <Typography variant="body1" sx={{ mb: 1 }}><b>Rent:</b> ₹{property.rent}</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}><b>Description:</b> {property.description}</Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h4" sx={{ mb: 2 }}>Tenants</Typography>
          <Paper elevation={2} sx={{ borderRadius: 2, mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#f5f5f5' }}>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Lease Start</b></TableCell>
                  <TableCell><b>Lease End</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tenants.map(t => (
                  <TableRow key={t.id} hover>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.email}</TableCell>
                    <TableCell>{t.leaseStart}</TableCell>
                    <TableCell>{t.leaseEnd}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Typography variant="h4" sx={{ mb: 2 }}>Maintenance Requests</Typography>
          <Paper elevation={2} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#f5f5f5' }}>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Description</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {maintenance.map(m => (
                  <TableRow key={m.id} hover>
                    <TableCell>{m.date}</TableCell>
                    <TableCell>{m.desc}</TableCell>
                    <TableCell>{m.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
} 