
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  beds: number;
  baths: number;
  sqft: number;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  yearBuilt: number;
  images: string[];
  featured: boolean;
  amenities: string[];
  location: {
    lat: number;
    lng: number;
  };
  status: 'sale' | 'rent' | 'sold' | 'pending';
}

export interface FilterOptions {
  priceRange: [number, number];
  beds: number | null;
  baths: number | null;
  homeType: string[];
  minSqft: number | null;
  amenities: string[];
  status: string[];
}
