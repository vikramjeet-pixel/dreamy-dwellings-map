
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import FilterBar from "@/components/FilterBar";
import { FilterOptions } from "@/utils/types";
import { properties } from "@/utils/mockData";
import { SlidersHorizontal, X } from "lucide-react";

const MapView = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    beds: null,
    baths: null,
    homeType: [],
    minSqft: null,
    amenities: [],
    status: ['sale', 'rent'],
  });
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    // Apply filters to properties
    let result = [...properties];
    
    // Price filter
    result = result.filter(
      property => 
        property.price >= newFilters.priceRange[0] && 
        property.price <= newFilters.priceRange[1]
    );
    
    // Beds filter
    if (newFilters.beds !== null) {
      result = result.filter(property => property.beds >= newFilters.beds!);
    }
    
    // Baths filter
    if (newFilters.baths !== null) {
      result = result.filter(property => property.baths >= newFilters.baths!);
    }
    
    // Home type filter
    if (newFilters.homeType.length > 0) {
      result = result.filter(property => 
        newFilters.homeType.includes(property.type)
      );
    }
    
    // Sqft filter
    if (newFilters.minSqft !== null) {
      result = result.filter(property => property.sqft >= newFilters.minSqft!);
    }
    
    // Amenities filter
    if (newFilters.amenities.length > 0) {
      result = result.filter(property => 
        newFilters.amenities.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }
    
    // Status filter
    if (newFilters.status.length > 0) {
      result = result.filter(property => 
        newFilters.status.includes(property.status)
      );
    }
    
    setFilteredProperties(result);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="h-screen pt-16">
        <div className="h-full flex flex-col">
          {/* Top bar with filters toggle */}
          <div className="p-4 border-b border-border flex justify-between items-center bg-background z-10">
            <h1 className="text-xl font-semibold">Map View</h1>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </span>
              
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="p-2 rounded-full hover:bg-secondary"
                aria-label={mobileFiltersOpen ? "Close filters" : "Open filters"}
              >
                {mobileFiltersOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <SlidersHorizontal className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Filters drawer */}
          {mobileFiltersOpen && (
            <div className="p-4 border-b border-border bg-card animate-fade-in">
              <FilterBar onFilterChange={handleFilterChange} />
            </div>
          )}
          
          {/* Map container */}
          <div className="flex-1 overflow-hidden">
            <Map properties={filteredProperties} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapView;
