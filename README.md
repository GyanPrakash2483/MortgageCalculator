# 🏡 Mortgage Calculator Platform

A comprehensive, production-ready financial planning platform with private user dashboard, dual-currency support, and advanced mortgage calculations.

## ✨ Features

### 🔐 Authentication (Optional)
- **Public Access**: All calculators work without login
- **Sign-in Required Only For**: Saving and managing calculation history
- **NextAuth v5** with dual provider support:
  - Google OAuth (one-click sign-in)
  - Credentials (email/password with mandatory email verification)
- Email verification using Nodemailer with Gmail SMTP
- Smart authentication flow - prompts only when needed

### 💰 Financial Calculators

#### 1. Mortgage Calculator
- Complete EMI calculation using standard amortization formula
- Year-by-year breakdown table
- Interactive visualizations:
  - Donut chart: Principal vs Interest
  - Area chart: Loan balance over time
- Rent vs Buy comparison analysis (10-20 year projection)
- Full amortization schedule

#### 2. Rent Calculator
- Monthly, yearly, 5-year, and 10-year projections
- Simple and intuitive interface

#### 3. Prorated Rent Calculator
- **Actual Days in Month method**
- Formula: `(Monthly Rent / Days in Current Month) × Number of Days Occupied`
- Handles varying month lengths (28, 30, 31 days)
- Move-in date selection
- Daily rate calculation

### 🌍 Dual-Currency System
- **USD ($)** and **INR (₹)** support
- Global currency toggle
- INR formatting using Indian numbering system (Lakhs/Crores)
  - Example: ₹1,00,000 (1 Lakh), ₹1 Cr (1 Crore)

### 📊 Data Visualization
- **Recharts** integration for interactive charts
- Donut charts for composition analysis
- Area charts for time-series data
- Responsive and animated charts

### 💾 Private User Dashboard
- MongoDB-backed data persistence
- One-to-many relationship: User → Calculations
- Save calculations with one click
- View saved calculation history
- Delete saved calculations
- All data is private and user-specific

### 🎨 UI/UX Design
- **Modern Fintech Luxury** dark theme
- Glassmorphism effects with backdrop blur
- Cyan/Blue gradient accents (#06b6d4 → #3b82f6)
- Inter + Geist Sans typography
- Smooth Framer Motion transitions
- Fully responsive (mobile-first)
- Real-time chart updates on input changes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: NextAuth.js v5
- **Database**: MongoDB with Mongoose ODM
- **Email**: Nodemailer (Gmail SMTP)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React + React Icons
- **Validation**: Zod
- **Date Utilities**: date-fns

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth handlers
│   │   │   ├── signup/route.ts           # User registration
│   │   │   └── verify-email/route.ts     # Email verification
│   │   └── calculations/
│   │       ├── save/route.ts             # Save calculation
│   │       ├── list/route.ts             # List user calculations
│   │       └── delete/[id]/route.ts      # Delete calculation
│   ├── auth/
│   │   └── page.tsx                      # Auth page (Sign In/Up)
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Main calculator page (public)
│   └── globals.css                       # Global styles + Tailwind
├── components/
│   ├── auth/
│   │   ├── SignInForm.tsx
│   │   ├── SignUpForm.tsx
│   │   └── OAuthButtons.tsx
│   ├── dashboard/
│   │   ├── Header.tsx
│   │   ├── CurrencyToggle.tsx
│   │   ├── TabNavigation.tsx
│   │   ├── MortgageCalculator.tsx
│   │   ├── RentCalculator.tsx
│   │   ├── ProratedRentCalculator.tsx
│   │   ├── RentVsBuyComparison.tsx
│   │   └── SavedCalculations.tsx
│   ├── calculators/
│   │   ├── SliderInput.tsx
│   │   ├── FinancialChart.tsx
│   │   └── AmortizationTable.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── GlassCard.tsx
├── lib/
│   ├── auth.ts                           # NextAuth configuration
│   ├── db.ts                             # MongoDB connection
│   ├── mailer.ts                         # Email utilities
│   ├── calculations.ts                   # Financial logic
│   └── formatters.ts                     # Currency formatters
├── models/
│   ├── User.ts                           # User model
│   └── Calculation.ts                    # Calculation model
├── store/
│   └── calculator.ts                     # Zustand store
└── types/
    └── next-auth.d.ts                    # NextAuth type extensions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email verification
- Google OAuth credentials

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables are already set in `.env.local`:**
   - MongoDB URI
   - NextAuth configuration
   - Google OAuth credentials
   - Gmail SMTP credentials

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**
   - 🎉 **No login required!** Start calculating immediately
   - Sign in only if you want to save your calculations

## 📖 Usage Guide

### Getting Started (No Account Required!)
1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Start using any calculator immediately - **no sign-up required**
3. All calculators work fully without authentication
4. Sign in only when you want to save your calculations

### Sign Up (Optional - For Saving Calculations)
1. Click "Sign In" button in the header
2. Switch to "Sign Up" tab
3. Enter your name, email, and password
4. Check your email for verification link
5. Click the verification link
6. Return and sign in

### Using Calculators

#### Mortgage Calculator
1. Adjust sliders for:
   - Home Price
   - Down Payment
   - Interest Rate
   - Loan Tenure
2. View monthly payment and breakdown
3. Analyze charts and amortization table
4. Compare Rent vs Buy scenarios
5. Click "Save Calculation" to store

#### Rent Calculator
1. Set monthly rent amount
2. View yearly and multi-year projections
3. Save for future reference

#### Prorated Rent Calculator
1. Enter monthly rent
2. Select move-in date
3. Adjust days occupied
4. View prorated amount and daily rate

### Currency Toggle
- Click USD/INR toggle in header
- All values update instantly
- Formatting adapts to selected currency

## 🔒 Security Features
- Bcrypt password hashing
- Email verification requirement for credentials signup
- Protected API routes with session validation
- MongoDB ObjectId validation
- User-specific data isolation

## 🎯 Key Formulas

### Mortgage EMI
```
EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)

Where:
  P = Principal (loan amount)
  r = Monthly interest rate (annual rate / 12 / 100)
  n = Number of months (tenure × 12)
```

### Prorated Rent
```
Prorated Rent = (Monthly Rent / Days in Month) × Days Occupied
```

## 🌐 Environment Variables

All environment variables are pre-configured in `.env.local`:

- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_URL`: Application URL
- `NEXTAUTH_SECRET`: Secret for session encryption
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `EMAIL`: Gmail address for sending emails
- `EMAIL_PASSWORD`: Gmail app password

## 📱 Responsive Design

- Mobile: Optimized for phones (320px+)
- Tablet: Enhanced layout (768px+)
- Desktop: Full feature set (1024px+)

## 🎨 Design Tokens

### Colors
- Background Primary: `#0a0a0f`
- Background Secondary: `#151520`
- Accent Cyan: `#06b6d4`
- Accent Blue: `#3b82f6`
- Accent Purple: `#a78bfa`

### Typography
- Font Sans: Inter
- Font Display: Geist Sans

### Border Radius
- Small: 12px
- Medium: 16px
- Large: 24px

## 📄 License

This project is private and for demonstration purposes.

## 🙏 Acknowledgments

- NextAuth.js for authentication
- Recharts for visualizations
- Tailwind CSS for styling
- Framer Motion for animations

---

**Built with ❤️ using Next.js 15, Tailwind v4, and MongoDB**
