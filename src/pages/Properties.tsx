
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";
import { FilterOptions, Property } from "@/utils/types";
import { properties } from "@/utils/mockData";
import { GridIcon, List, SlidersHorizontal } from "lucide-react";

const Properties = () => {
  const location = useLocation();
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    beds: null,
    baths: null,
    homeType: [],
    minSqft: null,
    amenities: [],
    status: ['sale', 'rent'],
  });
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Parse URL parameters for initial filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    
    if (status) {
      setFilters(prev => ({
        ...prev,
        status: [status]
      }));
    }
  }, [location.search]);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...properties];
    
    // Apply price filter
    result = result.filter(
      property => 
        property.price >= filters.priceRange[0] && 
        property.price <= filters.priceRange[1]
    );
    
    // Apply beds filter
    if (filters.beds !== null) {
      result = result.filter(property => property.beds >= filters.beds!);
    }
    
    // Apply baths filter
    if (filters.baths !== null) {
      result = result.filter(property => property.baths >= filters.baths!);
    }
    
    // Apply home type filter
    if (filters.homeType.length > 0) {
      result = result.filter(property => 
        filters.homeType.includes(property.type)
      );
    }
    
    // Apply sqft filter
    if (filters.minSqft !== null) {
      result = result.filter(property => property.sqft >= filters.minSqft!);
    }
    
    // Apply amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(property => 
        filters.amenities.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }
    
    // Apply status filter
    if (filters.status.length > 0) {
      result = result.filter(property => 
        filters.status.includes(property.status)
      );
    }
    
    // Sort results
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.yearBuilt - a.yearBuilt);
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => a.yearBuilt - b.yearBuilt);
    } else {
      // Default sorting by featured
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setFilteredProperties(result);
  }, [filters, sortBy]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold">Properties</h1>
            <p className="text-muted-foreground mt-2">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} available
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center border border-input rounded-md overflow-hidden">
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 ${
                  viewType === 'grid' 
                    ? 'bg-secondary text-foreground' 
                    : 'bg-transparent text-muted-foreground'
                }`}
              >
                <GridIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-2 ${
                  viewType === 'list' 
                    ? 'bg-secondary text-foreground' 
                    : 'bg-transparent text-muted-foreground'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="p-2 border border-input rounded-md"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-input rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className={`hidden md:block w-64 shrink-0 sticky top-24 self-start rounded-xl border border-border p-4 bg-card`}>
            <h2 className="font-medium mb-4">Filters</h2>
            <FilterBar onFilterChange={handleFilterChange} />
          </div>
          
          {/* Filters - Mobile */}
          {mobileFiltersOpen && (
            <div className="md:hidden sticky top-20 z-30 rounded-xl border border-border p-4 bg-card animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
              </div>
              <FilterBar onFilterChange={handleFilterChange} />
            </div>
          )}
          
          {/* Property Listings */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-16 bg-secondary/30 rounded-xl">
                <h3 className="text-xl font-medium mb-2">No properties found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find properties.
                </p>
              </div>
            ) : (
              <div className={
                viewType === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} SkylineEstate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Properties;
