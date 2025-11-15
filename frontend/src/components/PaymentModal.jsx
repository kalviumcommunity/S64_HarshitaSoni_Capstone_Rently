import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: '90vw',
  background: '#fff',
  borderRadius: 12,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
}));

const PaymentCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  border: '2px solid #e0e0e0',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    cursor: 'pointer'
  },
  '&.selected': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + '10'
  }
}));

const PaymentModal = ({ open, onClose, paymentData, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay securely with PayPal',
      icon: '💳',
      fee: '2.9% + $0.30'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      description: 'Pay with PhonePe UPI',
      icon: '📱',
      fee: '1.5%'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: '🏦',
      fee: 'Free'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with actual payment gateways
      if (selectedMethod === 'paypal') {
        // PayPal integration would go here
        console.log('Processing PayPal payment...');
      } else if (selectedMethod === 'phonepe') {
        // PhonePe integration would go here
        console.log('Processing PhonePe payment...');
      }

      // Update payment status in backend
      const response = await fetch(`http://localhost:5000/api/payments/${paymentData.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          status: 'paid',
          paymentMethod: selectedMethod,
          transactionId: `TXN_${Date.now()}`
        })
      });

      const data = await response.json();
      
      if (data.success) {
        onPaymentSuccess(data.payment);
        onClose();
      } else {
        setError(data.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedMethod('');
    setError('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          Pay Rent
        </Typography>

        {paymentData && (
          <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Payment Details
            </Typography>
            <Typography variant="body1">
              Amount: ₹{paymentData.amount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due Date: {new Date(paymentData.dueDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Property: {paymentData.property?.title}
            </Typography>
          </Box>
        )}

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Select Payment Method
        </Typography>

        {paymentMethods.map((method) => (
          <PaymentCard
            key={method.id}
            className={selectedMethod === method.id ? 'selected' : ''}
            onClick={() => setSelectedMethod(method.id)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4">{method.icon}</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {method.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {method.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Fee: {method.fee}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </PaymentCard>
        ))}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            fullWidth
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePayment}
            fullWidth
            disabled={!selectedMethod || loading}
            sx={{ fontWeight: 600 }}
          >
            {loading ? 'Processing...' : `Pay ₹${paymentData?.amount || 0}`}
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
};

export default PaymentModal;
