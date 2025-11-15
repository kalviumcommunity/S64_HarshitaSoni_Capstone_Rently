const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User API
  async login(credentials) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getUserProfile() {
    return this.request('/users/profile');
  }

  // Property API
  async getProperties() {
    return this.request('/properties');
  }

  async getPropertyById(id) {
    return this.request(`/properties/${id}`);
  }

  async createProperty(propertyData) {
    return this.request('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData)
    });
  }

  async updateProperty(id, propertyData) {
    return this.request(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData)
    });
  }

  async deleteProperty(id) {
    return this.request(`/properties/${id}`, {
      method: 'DELETE'
    });
  }

  async getLandlordProperties() {
    return this.request('/properties/landlord/my-properties');
  }

  async assignTenant(propertyId, tenantData) {
    return this.request(`/properties/${propertyId}/assign-tenant`, {
      method: 'POST',
      body: JSON.stringify(tenantData)
    });
  }

  // Maintenance API
  async getMaintenanceRequests() {
    return this.request('/maintenance-requests');
  }

  async getMaintenanceRequestById(id) {
    return this.request(`/maintenance-requests/${id}`);
  }

  async createMaintenanceRequest(requestData) {
    return this.request('/maintenance-requests', {
      method: 'POST',
      body: JSON.stringify(requestData)
    });
  }

  async updateMaintenanceRequestStatus(id, statusData) {
    return this.request(`/maintenance-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    });
  }

  async deleteMaintenanceRequest(id) {
    return this.request(`/maintenance-requests/${id}`, {
      method: 'DELETE'
    });
  }

  async getTenantMaintenanceRequests() {
    return this.request('/maintenance-requests/tenant/my-requests');
  }

  async getLandlordMaintenanceRequests() {
    return this.request('/maintenance-requests/landlord/my-requests');
  }

  // Payment API
  async getPayments() {
    return this.request('/payments');
  }

  async getPaymentById(id) {
    return this.request(`/payments/${id}`);
  }

  async createPayment(paymentData) {
    return this.request('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  }

  async updatePaymentStatus(id, statusData) {
    return this.request(`/payments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    });
  }

  async getTenantPayments() {
    return this.request('/payments/tenant/my-payments');
  }

  async getLandlordPayments() {
    return this.request('/payments/landlord/my-payments');
  }

  async generateRentReminders() {
    return this.request('/payments/landlord/reminders');
  }

  async calculateLateFees(paymentId, lateFeeData) {
    return this.request(`/payments/${paymentId}/calculate-late-fee`, {
      method: 'POST',
      body: JSON.stringify(lateFeeData)
    });
  }
}

export default new ApiService();
