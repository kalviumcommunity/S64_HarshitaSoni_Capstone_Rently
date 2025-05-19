import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid, Typography, Card, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  MdDashboard,
  MdHome,
  MdPayment,
  MdBuild,
  MdNotifications,
  MdPerson
} from 'react-icons/md';
import Layout from '../components/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 200;

// Elegant font families
const headingFont = 'Bodoni, Garamond, serif';
const bodyFont = 'Lato, Open Sans, Arial, sans-serif';

// Sophisticated color palette
const palette = {
  darkGray: '#232323', // 深灰色
  olive: '#7B8D42',    // 橄榄绿
  warmWhite: '#F8F6F2',// 暖白色
  terracotta: '#C56A4A', // 赤陶色
  gold: '#D4AF37',     // 金色
};

const theme = createTheme({
  palette: {
    background: { default: palette.warmWhite },
    primary: { main: palette.olive },
    secondary: { main: palette.terracotta },
    text: { primary: palette.darkGray },
  },
  typography: {
    fontFamily: bodyFont,
    h4: { fontFamily: headingFont, fontWeight: 700 },
    h5: { fontFamily: headingFont, fontWeight: 600 },
    h6: { fontFamily: headingFont, fontWeight: 600 },
    body1: { fontFamily: bodyFont },
    body2: { fontFamily: bodyFont },
  },
});

const Sidebar = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: palette.darkGray,
    color: palette.warmWhite,
    paddingTop: theme.spacing(4),
    alignItems: 'center',
    '& .MuiListItemIcon-root': {
      color: palette.olive,
      minWidth: '40px',
    },
    '& .MuiListItemText-primary': {
      color: palette.warmWhite,
      fontSize: '1rem',
      fontFamily: bodyFont,
    },
    '& .MuiListItem-root': {
      marginBottom: theme.spacing(1),
      borderRadius: theme.spacing(1),
      '&:hover': {
        backgroundColor: palette.terracotta,
        color: palette.warmWhite,
      },
      '&.active': {
        backgroundColor: palette.gold,
        color: palette.darkGray,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: palette.darkGray,
        },
      },
    },
  },
}));

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  marginLeft: drawerWidth,
  width: '100%',
  boxSizing: 'border-box',
  padding: '0 !important',
  marginTop: '0 !important',
  background: palette.warmWhite,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(4),
}));

const mockTenant = {
  name: 'John Doe',
  property: {
    name: 'Sunrise Apartments',
    address: '123 Main St, Cityville',
    leaseStart: '2023-06-01',
    leaseEnd: '2024-06-01',
    rent: 2500,
    landlord: {
      name: 'Jane Smith',
      phone: '555-1234',
      email: 'jane.smith@email.com',
    },
    agreementUrl: '/lease-agreement.pdf',
  },
  nextRentDue: '2024-06-01',
  outstandingRent: 0,
  rentHistory: [
    { date: '2024-05-01', amount: 2500, status: 'Paid' },
    { date: '2024-04-01', amount: 2500, status: 'Paid' },
    { date: '2024-03-01', amount: 2500, status: 'Paid' },
  ],
  maintenanceRequests: [
    { id: 1, desc: 'Leaky faucet', status: 'Resolved', date: '2024-04-10' },
    { id: 2, desc: 'Broken window', status: 'In Progress', date: '2024-05-15' },
  ],
  notifications: [
    { id: 1, text: 'Rent due on 2024-06-01', date: '2024-05-25' },
    { id: 2, text: 'Maintenance update: Broken window is being fixed', date: '2024-05-16' },
  ],
};

// Helper to capitalize the first letter of every word
function capitalizeName(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const TenantDashboard = () => {
  // Section refs for smooth scrolling
  const propertyRef = useRef(null);
  const paymentsRef = useRef(null);
  const maintenanceRef = useRef(null);
  const remindersRef = useRef(null);
  const leaseRef = useRef(null);

  const [activeSection, setActiveSection] = useState('property');

  // State for maintenance request form
  const [newRequest, setNewRequest] = useState({ desc: '', image: null });
  const [requests, setRequests] = useState(mockTenant.maintenanceRequests);

  // Get user from localStorage
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { id: 'property', icon: <MdHome size={24} />, text: 'My Property', ref: propertyRef },
    { id: 'payments', icon: <MdPayment size={24} />, text: 'Rent & Payments', ref: paymentsRef },
    { id: 'maintenance', icon: <MdBuild size={24} />, text: 'Maintenance Requests', ref: maintenanceRef },
    { id: 'lease', icon: <MdPerson size={24} />, text: 'Lease Details', ref: leaseRef },
    { id: 'reminders', icon: <MdNotifications size={24} />, text: 'Reminders & Notices', ref: remindersRef },
  ];

  const handleNavigation = (id, ref) => {
    setActiveSection(id);
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRequestChange = (e) => {
    setNewRequest({ ...newRequest, desc: e.target.value });
  };
  const handleRequestImage = (e) => {
    setNewRequest({ ...newRequest, image: e.target.files[0] });
  };
  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!newRequest.desc) return;
    setRequests([
      ...requests,
      { id: Date.now(), desc: newRequest.desc, status: 'Pending', date: new Date().toISOString().slice(0, 10) },
    ]);
    setNewRequest({ desc: '', image: null });
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Box sx={{ display: 'flex', minHeight: '100vh', background: palette.warmWhite }}>
          {/* Sidebar */}
          <Sidebar variant="permanent" anchor="left">
            <Box sx={{ mb: 6 }}>
              <img src="/logo.png" alt="Rently Logo" style={{ height: '40px', width: 'auto', marginBottom: 24 }} />
            </Box>
            <List sx={{ width: '90%' }}>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.id}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => handleNavigation(item.id, item.ref)}
                  sx={{ mb: 1 }}
                >
                  <ListItemIcon sx={{ fontSize: 24 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Sidebar>

          {/* Main Content */}
          <MainContent>
            {/* Welcome Statement */}
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, width: '100%' }}>
              Welcome, {user ? capitalizeName(user.name) : 'Tenant'}!
            </Typography>

            {/* Property Details/Overview */}
            <section ref={propertyRef} style={{ width: '100%' }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Property Overview</Typography>
              <table style={{ width: '100%', marginBottom: 8 }}>
                <thead>
                  <tr style={{ background: '#f0f0f0' }}>
                    <th>Property</th><th>Address</th><th>Lease Start</th><th>Lease End</th><th>Rent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{mockTenant.property.name}</td>
                    <td>{mockTenant.property.address}</td>
                    <td>{mockTenant.property.leaseStart}</td>
                    <td>{mockTenant.property.leaseEnd}</td>
                    <td>${mockTenant.property.rent}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 2. Rent Payment Section */}
            <section ref={paymentsRef} style={{ width: '100%' }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Rent Payment</Typography>
              <Typography sx={{ mb: 1 }}>Current Status: <b>{mockTenant.outstandingRent > 0 ? 'Unpaid' : 'Paid'}</b></Typography>
              {mockTenant.outstandingRent > 0 && (
                <Button variant="contained" color="primary" sx={{ mt: 1, mb: 2 }}>Pay Rent</Button>
              )}
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Rent History</Typography>
              <table style={{ width: '100%', marginBottom: 8 }}>
                <thead>
                  <tr style={{ background: '#f0f0f0' }}>
                    <th>Date</th><th>Amount</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTenant.rentHistory.map((r, i) => (
                    <tr key={i} style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>
                      <td>{r.date}</td><td>${r.amount}</td><td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {mockTenant.outstandingRent > 0 && (
                <Typography color="error" sx={{ mt: 1 }}>Late fee may apply if not paid soon.</Typography>
              )}
            </section>

            {/* 3. Maintenance Requests */}
            <section ref={maintenanceRef} style={{ width: '100%' }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Maintenance Requests</Typography>
              <form onSubmit={handleRequestSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <TextField label="Describe the issue" value={newRequest.desc} onChange={handleRequestChange} fullWidth required size="small" />
                <input type="file" accept="image/*" onChange={handleRequestImage} style={{ alignSelf: 'center' }} />
                <Button type="submit" variant="contained">Submit</Button>
              </form>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Request History</Typography>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ background: '#f0f0f0' }}>
                    <th>Date</th><th>Description</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>
                      <td>{req.date}</td><td>{req.desc}</td><td>{req.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* 4. Lease Details */}
            <section ref={leaseRef} style={{ width: '100%' }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Lease Details</Typography>
              <table style={{ width: '100%', marginBottom: 8 }}>
                <thead>
                  <tr style={{ background: '#f0f0f0' }}>
                    <th>Property</th><th>Address</th><th>Rent</th><th>Lease Start</th><th>Lease End</th><th>Landlord</th><th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{mockTenant.property.name}</td>
                    <td>{mockTenant.property.address}</td>
                    <td>${mockTenant.property.rent}</td>
                    <td>{mockTenant.property.leaseStart}</td>
                    <td>{mockTenant.property.leaseEnd}</td>
                    <td>{mockTenant.property.landlord.name}</td>
                    <td>{mockTenant.property.landlord.phone} / {mockTenant.property.landlord.email}</td>
                  </tr>
                </tbody>
              </table>
              <Button variant="outlined" href={mockTenant.property.agreementUrl} target="_blank" sx={{ mt: 1 }}>View Lease Agreement</Button>
            </section>

            {/* 5. Notifications */}
            <section ref={remindersRef} style={{ width: '100%' }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Notifications</Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {mockTenant.notifications.map((n) => (
                  <li key={n.id}><b>{n.date}:</b> {n.text}</li>
                ))}
              </ul>
            </section>
          </MainContent>
        </Box>
      </Layout>
    </ThemeProvider>
  );
};

export default TenantDashboard; 