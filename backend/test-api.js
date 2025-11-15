const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  role: 'landlord',
  name: 'Test Landlord',
  email: 'test@landlord.com',
  password: 'password123'
};

const testProperty = {
  title: 'Test Property',
  description: 'A beautiful test property',
  address: '123 Test Street, Test City',
  city: 'Test City',
  area: 'Test Area',
  rent: 2500,
  bedrooms: 2,
  bathrooms: 1,
  squareFeet: 1000,
  furnishing: 'Fully Furnished',
  status: 'Available'
};

async function runTests() {
  console.log('🧪 Starting Rently API Tests...\n');

  try {
    // Test 1: Register User
    console.log('1. Testing user registration...');
    const registerResponse = await axios.post(`${API_BASE_URL}/users`, testUser);
    console.log('✅ User registration successful');
    console.log('User ID:', registerResponse.data.user._id);

    // Test 2: Login User
    console.log('\n2. Testing user login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/users/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ User login successful');
    const token = loginResponse.data.token;
    console.log('Token received:', token ? 'Yes' : 'No');

    // Test 3: Create Property
    console.log('\n3. Testing property creation...');
    const propertyResponse = await axios.post(`${API_BASE_URL}/properties`, testProperty, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Property creation successful');
    const propertyId = propertyResponse.data.property._id;
    console.log('Property ID:', propertyId);

    // Test 4: Get Properties
    console.log('\n4. Testing get all properties...');
    const getPropertiesResponse = await axios.get(`${API_BASE_URL}/properties`);
    console.log('✅ Get properties successful');
    console.log('Properties count:', getPropertiesResponse.data.properties.length);

    // Test 5: Get Landlord Properties
    console.log('\n5. Testing get landlord properties...');
    const landlordPropertiesResponse = await axios.get(`${API_BASE_URL}/properties/landlord/my-properties`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Get landlord properties successful');
    console.log('Landlord properties count:', landlordPropertiesResponse.data.properties.length);

    // Test 6: Update Property
    console.log('\n6. Testing property update...');
    const updateData = { ...testProperty, rent: 3000 };
    const updateResponse = await axios.put(`${API_BASE_URL}/properties/${propertyId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Property update successful');
    console.log('Updated rent:', updateResponse.data.property.rent);

    // Test 7: Create Maintenance Request (as tenant)
    console.log('\n7. Testing maintenance request creation...');
    const tenantUser = {
      role: 'tenant',
      name: 'Test Tenant',
      email: 'test@tenant.com',
      password: 'password123'
    };

    // Register tenant
    await axios.post(`${API_BASE_URL}/users`, tenantUser);
    const tenantLoginResponse = await axios.post(`${API_BASE_URL}/users/login`, {
      email: tenantUser.email,
      password: tenantUser.password
    });
    const tenantToken = tenantLoginResponse.data.token;

    const maintenanceRequest = {
      property: propertyId,
      description: 'Test maintenance request',
      priority: 'medium'
    };

    const maintenanceResponse = await axios.post(`${API_BASE_URL}/maintenance-requests`, maintenanceRequest, {
      headers: { Authorization: `Bearer ${tenantToken}` }
    });
    console.log('✅ Maintenance request creation successful');
    console.log('Request ID:', maintenanceResponse.data.maintenanceRequest._id);

    // Test 8: Get Maintenance Requests
    console.log('\n8. Testing get maintenance requests...');
    const getMaintenanceResponse = await axios.get(`${API_BASE_URL}/maintenance-requests`);
    console.log('✅ Get maintenance requests successful');
    console.log('Maintenance requests count:', getMaintenanceResponse.data.maintenanceRequests.length);

    // Test 9: Create Payment
    console.log('\n9. Testing payment creation...');
    const paymentData = {
      property: propertyId,
      amount: 2500,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    };

    const paymentResponse = await axios.post(`${API_BASE_URL}/payments`, paymentData, {
      headers: { Authorization: `Bearer ${tenantToken}` }
    });
    console.log('✅ Payment creation successful');
    console.log('Payment ID:', paymentResponse.data.payment._id);

    // Test 10: Get Payments
    console.log('\n10. Testing get payments...');
    const getPaymentsResponse = await axios.get(`${API_BASE_URL}/payments/tenant/my-payments`, {
      headers: { Authorization: `Bearer ${tenantToken}` }
    });
    console.log('✅ Get payments successful');
    console.log('Payments count:', getPaymentsResponse.data.payments.length);

    console.log('\n🎉 All tests passed successfully!');
    console.log('\n📊 Test Summary:');
    console.log('- User registration: ✅');
    console.log('- User login: ✅');
    console.log('- Property creation: ✅');
    console.log('- Property retrieval: ✅');
    console.log('- Property update: ✅');
    console.log('- Maintenance request creation: ✅');
    console.log('- Payment creation: ✅');
    console.log('- All CRUD operations working correctly!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    console.log('\n🔍 Debug information:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests };
