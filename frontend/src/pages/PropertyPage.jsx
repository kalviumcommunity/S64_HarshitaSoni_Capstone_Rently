import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import {
  People as PeopleIcon,
  Payment as PaymentIcon,
  Build as BuildIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
}));

const PropertyDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#1C1C1C',
    color: '#F8F9F9',
  },
}));

const PropertyPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedSection, setSelectedSection] = useState('tenants');

  const sections = [
    { id: 'tenants', label: 'Tenants', icon: <PeopleIcon /> },
    { id: 'payments', label: 'Payments', icon: <PaymentIcon /> },
    { id: 'maintenance', label: 'Maintenance', icon: <BuildIcon /> },
    { id: 'notices', label: 'Notices', icon: <NotificationsIcon /> },
  ];

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
    navigate(`/property/${propertyId}/${sectionId}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <PropertyDrawer variant="permanent">
        <Box sx={{ overflow: 'auto', mt: 8 }}>
          <List>
            {sections.map((section) => (
              <ListItem
                button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                selected={selectedSection === section.id}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#F8F9F9' }}>
                  {section.icon}
                </ListItemIcon>
                <ListItemText primary={section.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </PropertyDrawer>
      <MainContent>
        <Box sx={{ mt: 8 }}>
          {selectedSection === 'tenants' && (
            <Typography variant="h4">Tenants</Typography>
          )}
          {selectedSection === 'payments' && (
            <Typography variant="h4">Payments</Typography>
          )}
          {selectedSection === 'maintenance' && (
            <Typography variant="h4">Maintenance</Typography>
          )}
          {selectedSection === 'notices' && (
            <Typography variant="h4">Notices</Typography>
          )}
        </Box>
      </MainContent>
    </Box>
  );
};

export default PropertyPage; 