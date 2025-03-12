# Real Estate Application

## Tech Stack

This project uses a modern web development stack:

### Frontend:
- **React** with **TypeScript**
- **React Router** for navigation
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Vite** as the build tool and development server

### Backend & Database:
- **Supabase** for backend services
- **PostgreSQL** database (hosted by Supabase)
- **Supabase Authentication**
- **Supabase Storage** for property images

### State Management:
- **React Context API** for authentication state
- **React Query** for data fetching and caching
- **React Hook Form** for form handling
- **Zod** for validation

## Key Files and Structure

### Core Files
- `src/App.tsx` - Main application component with routes
- `src/main.tsx` - Entry point for the application

### Pages
- `src/pages/Index.tsx` - Homepage with featured properties
- `src/pages/Properties.tsx` - Property listing page with filters
- `src/pages/PropertyView.tsx` - Detailed view of a single property
- `src/pages/MapView.tsx` - Map-based property browsing
- `src/pages/Auth.tsx` - Authentication page (login/signup)
- `src/pages/AddProperty.tsx` - Form to add new properties
- `src/pages/NotFound.tsx` - 404 page

### Components
- `src/components/Hero.tsx` - Hero section on homepage
- `src/components/Navbar.tsx` - Navigation bar
- `src/components/PropertyCard.tsx` - Property listing card
- `src/components/PropertyDetails.tsx` - Detailed property information
- `src/components/FilterBar.tsx` - Filtering options for properties
- `src/components/Map.tsx` - Interactive property map
- `src/components/ProtectedRoute.tsx` - Route guard for authenticated routes

### Utilities & Services
- `src/utils/propertyService.ts` - Property data fetching & manipulation
- `src/utils/types.ts` - TypeScript interfaces
- `src/integrations/supabase/client.ts` - Supabase client setup
- `src/integrations/supabase/types.ts` - Supabase type definitions

### State Management
- `src/context/AuthContext.tsx` - Authentication context provider

## Features

### Property Browsing

#### Featured Properties Showcase
- Homepage displays a curated selection of featured properties
- Hero section with image carousel and property highlights

#### Comprehensive Property Listings
- Grid and list view options for browsing properties
- Detailed property cards with key information at a glance
- Pagination for navigating through multiple properties

#### Advanced Filtering
- Price range slider
- Bedroom and bathroom count filters
- Property type selection (house, apartment, condo, townhouse)
- Square footage minimum filter
- Amenities filtering
- Property status filtering (sale, rent, sold, pending)

#### Sorting Options
- Featured properties first
- Price: low to high / high to low
- Newest / oldest properties

#### Detailed Property View
- Multiple property images with gallery viewer
- Comprehensive property details (price, beds, baths, sqft, etc.)
- Property description and amenities list
- Location information with map
- Similar properties recommendations

#### Interactive Map View
- Geographic exploration of properties
- Property markers on map
- Quick property preview on marker click
- Navigation between property markers

### User Authentication

#### Secure Authentication
- Email/password registration and login
- Session management using Supabase Auth
- Protected routes for authenticated features

#### User Profile
- Account management
- Saved properties (favorites)

### Property Management

#### Property Creation
- Add new properties with comprehensive details
- Multiple image uploads with preview
- Detailed property information input
- Location selection with map integration

#### Property Editing
- Update existing property information
- Modify images and details

#### Property Ownership
- Row-Level Security ensures users only manage their own properties
- Visibility controls for property listings

### UI/UX Features

#### Responsive Design
- Mobile-friendly interface
- Adaptive layouts for different screen sizes

#### Modern UI Components
- Sleek navigation with dropdown menus
- Toast notifications for user feedback
- Modal dialogs for confirmations
- Loading states with skeletons

#### Accessibility Features
- Semantic HTML structure
- ARIA attributes for screen readers
- Keyboard navigation support

### Technical Features

#### Type Safety
- Full TypeScript implementation
- Interface definitions for all data structures

#### State Management
- Context API for global state
- React Query for server state management
- Form state handling with React Hook Form

#### Performance Optimizations
- Lazy loading of images
- Pagination for large data sets
- Query caching to reduce API calls

#### Security
- Data validation on client and server
- Row-Level Security policies in database
- Protected routes with authentication checks

#### Database Integration
- Supabase PostgreSQL database with RLS
- Efficient data fetching with filters
- Transaction support for data integrity

## Application Workflow

### User Authentication Flow:
1. User visits the site and can browse properties without logging in.
2. For adding properties, user clicks "Sign In" in the navbar.
3. Auth page provides login/signup options.
4. After authentication, user is redirected back to the main site.
5. Protected routes check authentication status via `ProtectedRoute` component.

### Property Browsing Flow:
1. Home page showcases featured properties via `Hero` component and property listings.
2. Properties page shows all properties with filtering options.
3. Users can view detailed property information on the `PropertyView` page.
4. Map view provides geographic browsing of properties.

### Property Management Flow:
1. Authenticated users can add new properties via the `AddProperty` form.
2. Form handles multiple image uploads to Supabase storage.
3. Property data is validated and stored in the database.
4. Row-Level Security ensures users can only modify their own properties.

### Data Flow:
- `propertyService.ts` handles database operations to fetch and filter properties.
- Data is transformed to match TypeScript interfaces.
- Components use the service to render property information.

## Logo

The application features a **lovable logo** named `Lovable`, designed to embody trust, modernity, and professionalism.

---

This architecture provides a responsive, type-safe application with a clear separation of concerns between UI components, data fetching, and state management. Feel free to contribute or fork this project!
