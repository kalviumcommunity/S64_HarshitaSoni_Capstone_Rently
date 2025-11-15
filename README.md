# Rently - Tenant & Rent Management System

A comprehensive MERN stack web application that streamlines rental property management, enabling landlords to manage properties, collect rent online, track maintenance requests, and send automated payment reminders.

## 🚀 Features

### For Landlords
- **Property Management**: Add, edit, delete, and view property listings
- **Tenant Management**: Assign tenants to properties and track lease agreements
- **Maintenance Tracking**: Monitor and update maintenance request status
- **Payment Management**: Track rent payments and generate reminders
- **Dashboard Analytics**: Overview of properties, tenants, and payments

### For Tenants
- **Property Discovery**: Browse and search available properties
- **Rent Payment**: Pay rent online through multiple payment methods
- **Maintenance Requests**: Submit and track maintenance requests
- **Lease Management**: View lease details and payment history
- **Notifications**: Receive payment reminders and updates

## 🛠 Tech Stack

- **Frontend**: React.js, Material-UI, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: PayPal, PhonePe integration
- **Hosting**: Vercel (Frontend), Render (Backend)

## 📁 Project Structure

```
rently/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── propertyController.js
│   │   ├── maintenanceController.js
│   │   └── paymentController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── MaintenanceRequest.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── maintenanceRoutes.js
│   │   └── paymentRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Map.jsx
│   │   │   └── PaymentModal.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── LandlordDashboard.jsx
│   │   │   ├── TenantDashboard.jsx
│   │   │   ├── DiscoverProperties.jsx
│   │   │   └── PropertyPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── config/
│   │   │   └── cloudinary.template.js
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rently
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the application**
   
   **Backend:**
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## 🔧 API Endpoints

### Authentication
- `POST /api/users` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property (Landlord only)
- `PUT /api/properties/:id` - Update property (Landlord only)
- `DELETE /api/properties/:id` - Delete property (Landlord only)
- `GET /api/properties/landlord/my-properties` - Get landlord's properties

### Maintenance Requests
- `GET /api/maintenance-requests` - Get all maintenance requests
- `POST /api/maintenance-requests` - Create maintenance request (Tenant only)
- `PUT /api/maintenance-requests/:id` - Update maintenance request status
- `GET /api/maintenance-requests/tenant/my-requests` - Get tenant's requests
- `GET /api/maintenance-requests/landlord/my-requests` - Get landlord's requests

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create payment (Tenant only)
- `PUT /api/payments/:id/status` - Update payment status
- `GET /api/payments/tenant/my-payments` - Get tenant's payments
- `GET /api/payments/landlord/my-payments` - Get landlord's payments

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 💳 Payment Integration

### PayPal Integration
- Configure PayPal SDK in the frontend
- Set up PayPal webhook endpoints in the backend
- Handle payment success/failure callbacks

### PhonePe Integration
- Integrate PhonePe UPI payment gateway
- Handle UPI payment callbacks
- Process payment confirmations

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Configure build and start commands
4. Deploy automatically on push to main branch

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📱 Features Roadmap

### Phase 2 Enhancements
- [ ] Late fee calculation automation
- [ ] Expense and bill tracking for landlords
- [ ] Tenant ratings and reviews system
- [ ] Multi-property dashboard for landlords
- [ ] Email/SMS notifications
- [ ] Document management (lease agreements, receipts)
- [ ] Advanced reporting and analytics
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Harshita Soni** - Full Stack Developer
- **Project**: S64 Capstone - Rently

## 📞 Support

For support, email support@rently.com or create an issue in the repository.

---

**Rently** - Making rental management simple, efficient, and transparent.