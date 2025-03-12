
import { Property } from './types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Minimalist Villa',
    description: 'A stunning modern villa with clean lines and minimalist design. Floor-to-ceiling windows flood the space with natural light, while the open concept living area seamlessly connects to a private garden and infinity pool. High-end finishes include custom Italian cabinetry, marble countertops, and smart home technology throughout.',
    price: 1250000,
    address: {
      street: '123 Tranquility Lane',
      city: 'Palm Springs',
      state: 'CA',
      zip: '92262'
    },
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    type: 'house',
    yearBuilt: 2021,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
    ],
    featured: true,
    amenities: ['Pool', 'Smart Home', 'Garden', 'Solar Panels', 'EV Charging'],
    location: {
      lat: 33.8303,
      lng: -116.5453
    },
    status: 'sale'
  },
  {
    id: '2',
    title: 'Luxury Downtown Penthouse',
    description: 'Exclusive penthouse offering breathtaking city views with floor-to-ceiling windows. This luxury residence features a gourmet kitchen with top-of-the-line appliances, a spacious primary suite with walk-in closet, and a private rooftop terrace perfect for entertaining.',
    price: 3500000,
    address: {
      street: '800 Downtown Plaza',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90015'
    },
    beds: 3,
    baths: 3,
    sqft: 2800,
    type: 'apartment',
    yearBuilt: 2019,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop'
    ],
    featured: true,
    amenities: ['Rooftop Terrace', 'Concierge', 'Gym', 'Wine Cellar', 'Sauna'],
    location: {
      lat: 34.0522,
      lng: -118.2437
    },
    status: 'sale'
  },
  {
    id: '3',
    title: 'Coastal Contemporary Home',
    description: 'Magnificent ocean-view property designed for indoor-outdoor living. With retractable glass walls, this home blurs the line between inside and out, allowing you to enjoy the coastal breeze throughout. A chef\'s kitchen, media room, and luxurious primary suite make this the perfect retreat.',
    price: 4200000,
    address: {
      street: '55 Oceanview Drive',
      city: 'Malibu',
      state: 'CA',
      zip: '90265'
    },
    beds: 5,
    baths: 4.5,
    sqft: 4500,
    type: 'house',
    yearBuilt: 2020,
    images: [
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628744424962-386697428c75?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628744448838-6573d697cef7?q=80&w=2070&auto=format&fit=crop'
    ],
    featured: true,
    amenities: ['Ocean View', 'Infinity Pool', 'Media Room', 'Wine Cellar', 'Outdoor Kitchen'],
    location: {
      lat: 34.0259,
      lng: -118.7798
    },
    status: 'sale'
  },
  {
    id: '4',
    title: 'Urban Loft Apartment',
    description: 'Stylish industrial loft in a converted historic building featuring exposed brick walls, high ceilings, and original hardwood floors. This open concept space offers modern amenities while preserving its authentic character.',
    price: 5500,
    address: {
      street: '212 Artist Alley',
      city: 'San Francisco',
      state: 'CA',
      zip: '94110'
    },
    beds: 2,
    baths: 2,
    sqft: 1800,
    type: 'apartment',
    yearBuilt: 1935,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527359443443-84a48aec73d2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1958&auto=format&fit=crop'
    ],
    featured: false,
    amenities: ['Roof Deck', 'Bike Storage', 'Pet Friendly', 'Security System'],
    location: {
      lat: 37.7749,
      lng: -122.4194
    },
    status: 'rent'
  },
  {
    id: '5',
    title: 'Hillside Architectural Masterpiece',
    description: 'Award-winning architectural home with panoramic city views. This showstopping residence features dramatic living spaces, a cantilevered infinity pool, and state-of-the-art smart home technology throughout.',
    price: 6800000,
    address: {
      street: '1555 Skyline Drive',
      city: 'Beverly Hills',
      state: 'CA',
      zip: '90210'
    },
    beds: 6,
    baths: 7,
    sqft: 6200,
    type: 'house',
    yearBuilt: 2018,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2025&auto=format&fit=crop'
    ],
    featured: true,
    amenities: ['City Views', 'Infinity Pool', 'Home Theater', 'Wine Cellar', 'Smart Home'],
    location: {
      lat: 34.0901,
      lng: -118.4065
    },
    status: 'sale'
  },
  {
    id: '6',
    title: 'Mid-Century Modern Classic',
    description: 'Beautifully restored mid-century gem with original architectural details and modern updates. This home offers an open floor plan, walls of glass, terrazzo floors, and a stunning kidney-shaped pool.',
    price: 1950000,
    address: {
      street: '742 Retro Road',
      city: 'Palm Springs',
      state: 'CA',
      zip: '92262'
    },
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: 'house',
    yearBuilt: 1962,
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609766856852-1e764e883ep7f?q=80&w=2070&auto=format&fit=crop'
    ],
    featured: false,
    amenities: ['Pool', 'Mountain Views', 'Fireplace', 'Original Features'],
    location: {
      lat: 33.8302,
      lng: -116.5452
    },
    status: 'pending'
  }
];

export const amenitiesList = [
  'Pool', 
  'Smart Home', 
  'Garden', 
  'Solar Panels', 
  'EV Charging',
  'Rooftop Terrace', 
  'Concierge', 
  'Gym', 
  'Wine Cellar', 
  'Sauna',
  'Ocean View', 
  'Infinity Pool', 
  'Media Room', 
  'Outdoor Kitchen',
  'Roof Deck', 
  'Bike Storage', 
  'Pet Friendly', 
  'Security System',
  'City Views', 
  'Home Theater', 
  'Smart Home',
  'Mountain Views', 
  'Fireplace', 
  'Original Features'
];
