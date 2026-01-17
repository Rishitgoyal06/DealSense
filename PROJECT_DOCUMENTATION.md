# DealSense - Real Estate CRM Platform

## 📋 Project Overview

DealSense is a comprehensive web-based follow-up and deal intelligence platform designed specifically for real estate brokers. It centralizes lead management, property quotations, follow-ups, and deal tracking in one unified system.

### Problem Statement
Real estate brokers traditionally manage leads and follow-ups using WhatsApp and Excel spreadsheets, leading to:
- Missed opportunities
- Poor lead prioritization
- Inefficient follow-up tracking
- Lack of deal intelligence

### Solution
DealSense provides a centralized platform that:
- Manages leads with detailed tracking
- Provides clear visibility into deal-ready leads
- Automates follow-up scheduling
- Tracks quotations and customer responses
- Offers payment schedule management

---

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **API Communication**: Axios
- **Development**: Nodemon, ESLint, Prettier

### Project Structure
```
DealSense/
├── backend/                 # Node.js API Server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Authentication & validation
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── utils/          # Helper functions
│   │   ├── app.js          # Express app configuration
│   │   └── index.js        # Server entry point
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies
├── frontend/               # Next.js Client Application
│   ├── app/                # App Router pages
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context providers
│   ├── lib/                # Utility libraries
│   ├── services/           # API service functions
│   ├── .env.local          # Frontend environment variables
│   └── package.json        # Dependencies
└── README.md               # Project documentation
```

---

## 🔧 Backend Architecture

### Database Models

#### 1. User Model (`user.model.js`)
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```
**Features:**
- Password hashing with bcrypt
- JWT token generation
- Password comparison method

#### 2. Lead Model (`lead.model.js`)
```javascript
{
  name: String (required),
  phone: String (required),
  leadType: Enum ['buy', 'rent', 'sell', 'club'],
  budgetMin: Number,
  budgetMax: Number,
  preferredLocations: [String],
  status: Enum ['active', 'negotiating', 'closed', 'dropped'],
  readinessScore: Number (default: 0),
  timestamps: true
}
```

#### 3. FollowUp Model (`followUp.model.js`)
```javascript
{
  leadId: ObjectId (ref: Lead),
  scheduledFor: Date (required),
  status: Enum ['pending', 'completed'],
  note: String,
  timestamps: true
}
```

#### 4. Quotation Model (`quotation.model.js`)
```javascript
{
  leadId: ObjectId (ref: Lead),
  brokerName: String (required),
  propertySummary: String,
  quotedPrice: Number (required),
  sharedWithCustomer: Boolean (default: false),
  customerResponse: Enum ['interested', 'no_response', 'rejected'],
  timestamps: true
}
```

#### 5. PaymentSchedule Model (`paymentSchedule.model.js`)
```javascript
{
  leadId: ObjectId (ref: Lead),
  purpose: String (required),
  totalAmount: Number,
  emiAmount: Number,
  totalEmis: Number,
  emisPaid: Number (default: 0),
  nextDueDate: Date,
  status: Enum ['on-track', 'delayed', 'critical'],
  timestamps: true
}
```

### API Endpoints

#### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login

#### Lead Management (`/api/leads`)
- `GET /` - Get all leads (protected)
- `POST /` - Create new lead (protected)
- `GET /:id` - Get lead by ID (protected)
- `PUT /:id` - Update lead (protected)
- `PATCH /:id/status` - Update lead status (protected)
- `DELETE /:id` - Delete lead (protected)

#### Quotation Management (`/api/quotations`)
- `POST /` - Create quotation (protected)
- `GET /lead/:leadId` - Get quotations by lead (protected)
- `PATCH /:id/response` - Update customer response (protected)
- `PATCH /:id/shared` - Mark as shared (protected)

#### Follow-up Management (`/api/followups`)
- `POST /` - Create follow-up (protected)
- `GET /lead/:leadId` - Get follow-ups by lead (protected)
- `GET /today` - Get today's follow-ups (protected)
- `PATCH /:id/complete` - Mark as completed (protected)

### Middleware & Utilities

#### Authentication Middleware (`authMiddleware.js`)
- Validates JWT tokens
- Extracts user information
- Protects routes from unauthorized access

#### Helper Classes
- **ApiError**: Standardized error handling
- **ApiResponse**: Consistent API response format
- **asyncHandler**: Async error wrapper

### Environment Variables
```env
MONGODB_URI=mongodb+srv://...
PORT=5000
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
ACCESS_TOKEN_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=1d
```

---

## 🎨 Frontend Architecture

### Next.js App Router Structure
```
app/
├── login/
│   └── page.tsx           # Login page
├── register/
│   └── page.tsx           # Registration page
├── dashboard/
│   └── page.tsx           # Main dashboard
├── layout.tsx             # Root layout with AuthProvider
├── page.tsx               # Home page (redirects to login)
└── globals.css            # Global styles
```

### Context & State Management

#### AuthContext (`context/AuthContext.tsx`)
Provides global authentication state:
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
```

### API Services

#### API Configuration (`lib/api.ts`)
- Axios instance with base URL configuration
- Automatic JWT token attachment
- Request/response interceptors

#### Auth Service (`services/authService.ts`)
- User registration and login
- Token management in localStorage
- User session handling

#### Lead Service (`services/leadService.ts`)
- CRUD operations for leads
- Status updates
- Lead filtering and sorting

### UI Components

#### Authentication Pages
- **Login Page**: Email/password form with validation
- **Register Page**: Name/email/password form with validation
- **Dashboard**: Protected route with user welcome and logout

#### Features
- Form validation and error handling
- Loading states during API calls
- Responsive design with Tailwind CSS
- Client-side routing with Next.js

---

## 🔐 Security Implementation

### Backend Security
1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **CORS Configuration**: Restricted origins
4. **Input Validation**: Mongoose schema validation
5. **Error Handling**: Sanitized error responses

### Frontend Security
1. **Token Storage**: localStorage with SSR checks
2. **Protected Routes**: Authentication guards
3. **API Security**: Automatic token attachment
4. **Input Sanitization**: Form validation

---

## 🚀 Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Git

### Backend Setup
```bash
cd backend
npm install
npm run dev  # Starts on port 5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Starts on port 3000
```

### Environment Configuration
1. Create `.env` in backend with MongoDB URI and JWT secret
2. Create `.env.local` in frontend with API URL

---

## 📊 Database Design

### Relationships
- **User → Leads**: One-to-many (user can have multiple leads)
- **Lead → FollowUps**: One-to-many (lead can have multiple follow-ups)
- **Lead → Quotations**: One-to-many (lead can have multiple quotations)
- **Lead → PaymentSchedules**: One-to-many (lead can have multiple payment schedules)

### Indexes
- User email (unique)
- Lead status and readinessScore
- FollowUp scheduledFor date
- PaymentSchedule nextDueDate

---

## 🔄 API Flow

### Authentication Flow
1. User submits credentials
2. Backend validates and generates JWT
3. Frontend stores token in localStorage
4. Token sent with subsequent requests
5. Backend validates token on protected routes

### Lead Management Flow
1. User creates/updates lead
2. API validates data and saves to MongoDB
3. Frontend updates UI with response
4. Real-time status tracking

---

## 🎯 Key Features Implemented

### ✅ Completed Features
1. **User Authentication**
   - Registration with validation
   - Login with JWT tokens
   - Protected routes
   - Session management

2. **API Infrastructure**
   - RESTful API design
   - MongoDB integration
   - Error handling
   - CORS configuration

3. **Frontend Foundation**
   - Next.js with TypeScript
   - Tailwind CSS styling
   - Context-based state management
   - Responsive design

### 🚧 Planned Features
1. **Lead Dashboard**
   - Lead listing with filters
   - Search functionality
   - Status-based categorization
   - Bulk operations

2. **Follow-up System**
   - Calendar integration
   - Reminder notifications
   - Follow-up history
   - Performance metrics

3. **Quotation Management**
   - Property details
   - Price comparisons
   - Customer feedback tracking
   - Conversion analytics

4. **Payment Tracking**
   - EMI schedules
   - Payment reminders
   - Default risk analysis
   - Financial reporting

---

## 🧪 Testing Strategy

### Backend Testing
- Unit tests for controllers
- Integration tests for API endpoints
- Database connection testing
- Authentication middleware testing

### Frontend Testing
- Component unit tests
- API integration tests
- User flow testing
- Responsive design testing

---

## 📈 Performance Considerations

### Backend Optimization
- Database indexing
- Query optimization
- Caching strategies
- Rate limiting

### Frontend Optimization
- Code splitting
- Image optimization
- Bundle size optimization
- SSR/SSG implementation

---

## 🔧 Deployment Strategy

### Backend Deployment
- Docker containerization
- AWS/Heroku deployment
- Environment variable management
- Database migration scripts

### Frontend Deployment
- Vercel/Netlify deployment
- Static site generation
- CDN configuration
- Environment-specific builds

---

## 📝 Development Guidelines

### Code Standards
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Consistent naming conventions

### Git Workflow
- Feature branch development
- Pull request reviews
- Conventional commit messages
- Automated testing on CI/CD

---

## 🐛 Troubleshooting

### Common Issues
1. **CORS Errors**: Check backend CORS configuration
2. **Authentication Failures**: Verify JWT secret and token format
3. **Database Connection**: Confirm MongoDB URI and network access
4. **Port Conflicts**: Ensure backend (5000) and frontend (3000) ports are available

### Debug Tools
- Browser DevTools Network tab
- MongoDB Compass for database inspection
- Postman for API testing
- Console logging for debugging

---

## 📚 Learning Resources

### Technologies Used
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [JWT.io](https://jwt.io/)

---

## 🤝 Contributing

### Development Process
1. Fork the repository
2. Create feature branch
3. Implement changes with tests
4. Submit pull request
5. Code review and merge

### Code Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass and coverage maintained
- [ ] Documentation updated
- [ ] Security considerations addressed
- [ ] Performance impact assessed

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

- **Developer**: Rishit Goyal
- **Project Type**: Real Estate CRM Platform
- **Status**: MVP Development Phase

---

*Last Updated: January 2026*