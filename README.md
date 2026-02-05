# Hire-Link

A modern, full-stack job portal application built with Next.js, connecting recruiters with job seekers through an intuitive platform.

## 🚀 Overview

Hire-Link is a comprehensive job portal that enables recruiters to post job listings and manage applications, while allowing candidates to browse opportunities, apply for positions, and track their application status. The platform includes premium membership features, real-time feed interactions, and secure authentication.

## ✨ Features

### For Recruiters
- **Post Job Listings** - Create and manage job postings with detailed requirements
- **Application Management** - Review, filter, and update candidate applications
- **Candidate Profiles** - View comprehensive candidate information including resumes and portfolios
- **Premium Membership** - Access advanced features with subscription plans via Stripe
- **Activity Dashboard** - Track job performance and application metrics

### For Candidates
- **Job Search** - Browse and filter job listings by location, type, and experience level
- **Quick Apply** - Submit applications with saved profile information
- **Application Tracking** - Monitor application status across multiple opportunities
- **Profile Management** - Maintain detailed professional profiles with resume uploads
- **Social Feed** - Share updates, interact with posts, and network with others

### Platform Features
- **Secure Authentication** - Powered by Clerk for robust user management
- **Real-time Updates** - Dynamic content with server-side rendering
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Premium Subscriptions** - Integrated Stripe payment processing
- **File Storage** - Secure resume and image uploads via Supabase

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI component library
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon system

### Backend
- **Next.js Server Actions** - Server-side data mutations
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Services
- **Clerk** - User authentication and management
- **Stripe** - Payment processing for subscriptions
- **Supabase** - File storage and real-time features

### UI Components
- **shadcn/ui** - Re-usable component library
- **next-themes** - Dark/light mode support
- **Vaul** - Mobile drawer component

## 📁 Project Structure

```
Hire-link-master/
├── src/
│   ├── actions/           # Server actions for data mutations
│   │   └── index.js       # All server-side business logic
│   ├── app/               # Next.js App Router pages
│   │   ├── account/       # User account management
│   │   ├── activity/      # Activity tracking dashboard
│   │   ├── companies/     # Company listings
│   │   ├── feed/          # Social feed
│   │   ├── jobs/          # Job listings and search
│   │   ├── membership/    # Premium subscription management
│   │   ├── onboard/       # User onboarding flow
│   │   ├── sign-in/       # Authentication pages
│   │   ├── sign-up/       # Registration pages
│   │   ├── layout.js      # Root layout with providers
│   │   └── page.js        # Homepage
│   ├── components/        # React components
│   │   ├── ui/            # Reusable UI primitives
│   │   ├── account-info/  # Account settings component
│   │   ├── candidate-*    # Candidate-specific components
│   │   ├── common-*       # Shared components
│   │   ├── feed/          # Feed functionality
│   │   ├── job-*/         # Job-related components
│   │   ├── membership/    # Subscription components
│   │   └── on-board/      # Onboarding components
│   ├── database/          # Database connection
│   │   └── index.js       # MongoDB connection setup
│   ├── models/            # Mongoose schemas
│   │   ├── application.js # Job application schema
│   │   ├── feed.js        # Social feed post schema
│   │   ├── job.js         # Job listing schema
│   │   └── profile.js     # User profile schema
│   ├── lib/               # Utility functions
│   │   └── utils.js       # Helper utilities
│   ├── utils/             # Additional utilities
│   │   └── index.js       # Common utility functions
│   └── middleware.js      # Clerk authentication middleware
├── public/                # Static assets
├── .env.local             # Environment variables (not tracked)
├── components.json        # shadcn/ui configuration
├── next.config.mjs        # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher (20.x recommended)
- npm or yarn package manager
- MongoDB Atlas account
- Clerk account for authentication
- Stripe account for payments (optional)
- Supabase account for file storage (optional)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/likhith2366/Hire-Link.git
   cd Hire-Link/Hire-link-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # MongoDB Database
   MONGODB_URL=your_mongodb_connection_string

   # Stripe Payments
   STRIPE_SECRET_KEY=your_stripe_secret_key

   # Supabase Storage
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Application
   URL=http://localhost:3000
   ```

4. **Set up MongoDB**
   - Create a MongoDB Atlas cluster at https://cloud.mongodb.com/
   - Create a database user with read/write permissions
   - Whitelist your IP address or allow access from anywhere (0.0.0.0/0)
   - Copy the connection string to your `.env.local`

5. **Set up Clerk**
   - Create an application at https://clerk.com/
   - Configure sign-in and sign-up pages
   - Copy your API keys to `.env.local`

6. **Set up Stripe (Optional)**
   - Create a Stripe account at https://stripe.com/
   - Get your test API keys from the dashboard
   - Add to `.env.local` for payment functionality

7. **Set up Supabase (Optional)**
   - Create a project at https://supabase.com/
   - Create a storage bucket named `job-board-public`
   - Make the bucket public for file access
   - Copy URL and anon key to `.env.local`

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## 🔐 Security Features

This application implements several security best practices:

- ✅ **Secure Authentication** - Clerk integration with OAuth support
- ✅ **Authorization Checks** - User ownership validation on all update operations
- ✅ **Environment Variables** - Sensitive credentials stored securely
- ✅ **Input Validation** - Server-side validation on all form submissions
- ✅ **SQL Injection Protection** - Mongoose ORM with parameterized queries
- ✅ **XSS Prevention** - React's built-in escaping and sanitization
- ✅ **HTTPS Only** - Secure communication in production
- ✅ **Updated Dependencies** - Regular security patches and updates

## 📊 Data Models

### Profile Schema
```javascript
{
  userId: String,
  role: String,              // "candidate" or "recruiter"
  email: String,
  isPremiumUser: Boolean,
  memberShipType: String,
  recruiterInfo: {
    name, companyName, companyRole
  },
  candidateInfo: {
    name, location, salary, skills, experience,
    resume, linkedinProfile, githubProfile
  }
}
```

### Job Schema
```javascript
{
  companyName: String,
  title: String,
  location: String,
  type: String,              // "full-time", "part-time", etc.
  experience: String,
  description: String,
  skills: String,
  recruiterId: String,
  applicants: Array
}
```

### Application Schema
```javascript
{
  recruiterUserID: String,
  candidateUserID: String,
  jobID: String,
  name: String,
  email: String,
  status: Array,             // Application status history
  jobAppliedDate: String
}
```

### Feed Schema
```javascript
{
  userId: String,
  userName: String,
  message: String,
  image: String,
  likes: Array               // { reactorUserId, reactorUserName }
}
```

## 🎨 Key Components

### Server Actions (`src/actions/index.js`)
- Profile management (create, read, update)
- Job posting and filtering
- Application submission and tracking
- Feed post creation and interactions
- Stripe payment processing

### Pages
- **Homepage** - Landing page with role selection
- **Jobs** - Job listings with filtering and search
- **Feed** - Social networking and updates
- **Account** - Profile and settings management
- **Activity** - Application tracking dashboard
- **Membership** - Premium subscription plans

## 🔧 Configuration

### Tailwind CSS
Custom configuration with shadcn/ui integration, supporting dark mode and custom color schemes.

### Next.js
- App Router for file-based routing
- Server Actions for mutations
- Environment variable support
- Optimized production builds

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Author

**Likhith**
- GitHub: [@likhith2366](https://github.com/likhith2366)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Clerk for authentication services
- shadcn/ui for the component library
- Vercel for hosting platform

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainer.

---

**Note:** This project is under active development. Features and documentation may be updated frequently.
