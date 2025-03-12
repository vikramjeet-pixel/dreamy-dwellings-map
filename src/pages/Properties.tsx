
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";
import { FilterOptions, Property } from "@/utils/types";
import { fetchProperties } from "@/utils/propertyService";
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

  // Fetch properties with filtering
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties', filters, sortBy],
    queryFn: () => fetchProperties({
      filters: {
        priceRange: filters.priceRange,
        beds: filters.beds,
        baths: filters.baths,
        homeType: filters.homeType,
        minSqft: filters.minSqft,
        amenities: filters.amenities,
        status: filters.status,
      },
      sortBy,
    }),
  });

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
              {isLoading ? "Loading properties..." : `${properties.length} ${properties.length === 1 ? 'property' : 'properties'} available`}
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
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                    <div className="w-full h-48 bg-muted"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-6 bg-muted rounded w-1/3"></div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : properties.length === 0 ? (
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
                {properties.map(property => (
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
