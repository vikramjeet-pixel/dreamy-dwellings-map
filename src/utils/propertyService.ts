
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/utils/types";
import { Json } from "@/integrations/supabase/types";

interface FetchPropertiesOptions {
  filters?: {
    priceRange?: [number, number];
    beds?: number | null;
    baths?: number | null;
    homeType?: string[];
    minSqft?: number | null;
    amenities?: string[];
    status?: string[];
  };
  sortBy?: string;
  limit?: number;
  featured?: boolean;
}

// Helper function to transform address JSON
const transformAddress = (addressJson: Json): { street: string; city: string; state: string; zip: string } => {
  if (typeof addressJson === 'object' && addressJson !== null) {
    return {
      street: (addressJson as any).street || '',
      city: (addressJson as any).city || '',
      state: (addressJson as any).state || '',
      zip: (addressJson as any).zip || '',
    };
  }
  // Default fallback if the data is malformed
  return { street: '', city: '', state: '', zip: '' };
};

// Helper function to transform location JSON
const transformLocation = (locationJson: Json): { lat: number; lng: number } => {
  if (typeof locationJson === 'object' && locationJson !== null) {
    return {
      lat: parseFloat((locationJson as any).lat) || 0,
      lng: parseFloat((locationJson as any).lng) || 0,
    };
  }
  // Default fallback if the data is malformed
  return { lat: 0, lng: 0 };
};

// Helper function to ensure type is one of the allowed values
const transformPropertyType = (type: string): "house" | "apartment" | "condo" | "townhouse" => {
  const validTypes = ["house", "apartment", "condo", "townhouse"];
  return validTypes.includes(type) ? (type as "house" | "apartment" | "condo" | "townhouse") : "house";
};

// Helper function to ensure status is one of the allowed values
const transformPropertyStatus = (status: string): "sale" | "rent" | "sold" | "pending" => {
  const validStatuses = ["sale", "rent", "sold", "pending"];
  return validStatuses.includes(status) ? (status as "sale" | "rent" | "sold" | "pending") : "sale";
};

export const fetchProperties = async (options: FetchPropertiesOptions = {}): Promise<Property[]> => {
  try {
    let query = supabase
      .from('properties')
      .select('*');
    
    // Apply filters if provided
    if (options.filters) {
      const { priceRange, beds, baths, homeType, minSqft, amenities, status } = options.filters;
      
      if (priceRange) {
        query = query
          .gte('price', priceRange[0])
          .lte('price', priceRange[1]);
      }
      
      if (beds !== null && beds !== undefined) {
        query = query.gte('beds', beds);
      }
      
      if (baths !== null && baths !== undefined) {
        query = query.gte('baths', baths);
      }
      
      if (homeType && homeType.length > 0) {
        query = query.in('type', homeType);
      }
      
      if (minSqft !== null && minSqft !== undefined) {
        query = query.gte('sqft', minSqft);
      }
      
      if (status && status.length > 0) {
        query = query.in('status', status);
      }
      
      // For amenities, we need to check if all required amenities are present
      if (amenities && amenities.length > 0) {
        // This is a simplified approach since PostgreSQL array contains operator doesn't
        // directly support checking if an array contains all elements of another array
        amenities.forEach(amenity => {
          query = query.contains('amenities', [amenity]);
        });
      }
    }
    
    // Apply featured filter if specified
    if (options.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }
    
    // Apply sorting
    if (options.sortBy) {
      switch (options.sortBy) {
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('year_built', { ascending: false });
          break;
        case 'oldest':
          query = query.order('year_built', { ascending: true });
          break;
        default:
          query = query.order('featured', { ascending: false });
      }
    } else {
      // Default sort by featured
      query = query.order('featured', { ascending: false });
    }
    
    // Apply limit if specified
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
    
    // Transform the data to match our Property interface
    const properties: Property[] = data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: Number(item.price),
      address: transformAddress(item.address),
      beds: item.beds,
      baths: item.baths,
      sqft: item.sqft,
      type: transformPropertyType(item.type),
      yearBuilt: item.year_built,
      images: item.images,
      featured: item.featured || false,
      amenities: item.amenities,
      location: transformLocation(item.location),
      status: transformPropertyStatus(item.status),
    }));
    
    return properties;
  } catch (error) {
    console.error('Error in fetchProperties:', error);
    return [];
  }
};

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching property:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    // Transform the data to match our Property interface
    const property: Property = {
      id: data.id,
      title: data.title,
      description: data.description,
      price: Number(data.price),
      address: transformAddress(data.address),
      beds: data.beds,
      baths: data.baths,
      sqft: data.sqft,
      type: transformPropertyType(data.type),
      yearBuilt: data.year_built,
      images: data.images,
      featured: data.featured || false,
      amenities: data.amenities,
      location: transformLocation(data.location),
      status: transformPropertyStatus(data.status),
    };
    
    return property;
  } catch (error) {
    console.error('Error in fetchPropertyById:', error);
    return null;
  }
};

export const fetchSimilarProperties = async (property: Property, limit = 3): Promise<Property[]> => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .neq('id', property.id)
      .or(`type.eq.${property.type},address->>city.eq.${property.address.city}`)
      .limit(limit);
    
    if (error) {
      console.error('Error fetching similar properties:', error);
      return [];
    }
    
    // Transform the data to match our Property interface
    const properties: Property[] = data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: Number(item.price),
      address: transformAddress(item.address),
      beds: item.beds,
      baths: item.baths,
      sqft: item.sqft,
      type: transformPropertyType(item.type),
      yearBuilt: item.year_built,
      images: item.images,
      featured: item.featured || false,
      amenities: item.amenities,
      location: transformLocation(item.location),
      status: transformPropertyStatus(item.status),
    }));
    
    return properties;
  } catch (error) {
    console.error('Error in fetchSimilarProperties:', error);
    return [];
  }
};
