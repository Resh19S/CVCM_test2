# Caste Document Verification System - Next.js

A comprehensive government portal for caste document verification built with Next.js, React, and Tailwind CSS.

## Features

- **Four-step verification process**: Login → Upload → Processing → Results
- **Enhanced authentication** with tabbed login/signup interface
- **File upload system** with drag-and-drop support and validation
- **Real-time processing simulation** with progress tracking
- **Comprehensive results display** with legal analysis and precedents
- **Responsive design** with professional government portal styling
- **Backend integration ready** with API service layer

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (main app)
├── components/            # React components
│   ├── LoginSection.tsx   # Authentication component
│   ├── UploadSection.tsx  # File upload component
│   ├── StatusSection.tsx  # Processing status component
│   ├── ResultsSection.tsx # Results display component
│   ├── ProfileHeader.tsx  # User profile header
│   ├── DraftViewer.tsx    # Administrative draft viewer
│   ├── figma/            # Image components
│   └── ui/               # Reusable UI components (ShadCN)
├── styles/
│   └── globals.css       # Global styles with Tailwind V4
└── guidelines/
    └── Guidelines.md     # Development guidelines
```

## Key Components

### Authentication System
- Tabbed interface for login/signup
- Form validation and error handling
- User profile management across all sections

### File Upload System
- Drag-and-drop interface
- File type restrictions (PDF, Word documents only)
- File size validation (10MB limit)
- Visual file list with remove functionality

### Processing Simulation
- Multi-stage progress tracking
- Real-time status updates
- Estimated completion times

### Results Display
- Comprehensive legal analysis
- Supporting and contradicting precedents
- Assessment with strengths/weaknesses
- Success probability visualization
- Administrative decision draft

## Technology Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS V4** - Styling framework
- **ShadCN UI** - Component library
- **Lucide React** - Icon library

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend Integration

The application includes a comprehensive API service layer ready for backend integration. To connect to a real backend:

1. Update API endpoints in the component logic
2. Replace mock data with actual API calls
3. Configure authentication tokens and headers

## Deployment

The application is ready for deployment on Vercel, Netlify, or any platform that supports Next.js.

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Connect your GitHub repository
2. Vercel will automatically detect it's a Next.js app
3. Deploy with default settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is built for educational and demonstration purposes.