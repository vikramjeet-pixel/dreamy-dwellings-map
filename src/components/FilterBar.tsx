
import { useState } from "react";
import { FilterOptions } from "@/utils/types";
import { amenitiesList } from "@/utils/mockData";
import { 
  Sliders, 
  X, 
  Home, 
  Building2, 
  DollarSign, 
  Bed, 
  Bath, 
  Move, 
  Check 
} from "lucide-react";

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    beds: null,
    baths: null,
    homeType: [],
    minSqft: null,
    amenities: [],
    status: ['sale', 'rent'],
  });

  const homeTypes = [
    { id: 'house', label: 'House', icon: Home },
    { id: 'apartment', label: 'Apartment', icon: Building2 },
    { id: 'condo', label: 'Condo', icon: Building2 },
    { id: 'townhouse', label: 'Townhouse', icon: Home },
  ];

  const statusOptions = [
    { id: 'sale', label: 'For Sale' },
    { id: 'rent', label: 'For Rent' },
    { id: 'pending', label: 'Pending' },
    { id: 'sold', label: 'Sold' },
  ];

  const handleHomeTypeToggle = (type: string) => {
    setFilters(prev => {
      const updatedTypes = prev.homeType.includes(type) 
        ? prev.homeType.filter(t => t !== type)
        : [...prev.homeType, type];
      
      return { ...prev, homeType: updatedTypes };
    });
  };

  const handleStatusToggle = (status: string) => {
    setFilters(prev => {
      const updatedStatus = prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status];
      
      return { ...prev, status: updatedStatus };
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => {
      const updatedAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      
      return { ...prev, amenities: updatedAmenities };
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters: FilterOptions = {
      priceRange: [0, 10000000],
      beds: null,
      baths: null,
      homeType: [],
      minSqft: null,
      amenities: [],
      status: ['sale', 'rent'],
    };
    
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-4 py-2 bg-secondary rounded-full text-sm font-medium transition-colors hover:bg-secondary/80"
        >
          <Sliders className="h-4 w-4 mr-2" />
          Filters
        </button>
        
        {isOpen && (
          <button
            onClick={handleResetFilters}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Reset all
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mt-4 p-6 bg-card rounded-xl border border-border shadow-sm animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Filters</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Price Range */}
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <DollarSign className="h-4 w-4 mr-1.5" />
                Price Range
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                    })}
                    className="w-full pl-7 pr-3 py-2 border border-input rounded-md text-sm"
                    placeholder="Min"
                  />
                </div>
                <span className="text-muted-foreground">-</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [filters.priceRange[0], parseInt(e.target.value) || 0]
                    })}
                    className="w-full pl-7 pr-3 py-2 border border-input rounded-md text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Beds & Baths */}
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Bed className="h-4 w-4 mr-1.5" />
                Bedrooms
              </label>
              <div className="flex space-x-2">
                {[null, 1, 2, 3, 4, 5].map((num, i) => (
                  <button
                    key={i}
                    onClick={() => setFilters({ ...filters, beds: num })}
                    className={`flex-1 py-2 border ${
                      filters.beds === num
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-input hover:border-primary/50'
                    } rounded-md text-sm transition-colors`}
                  >
                    {num === null ? 'Any' : num === 5 ? '5+' : num}
                  </button>
                ))}
              </div>

              <label className="flex items-center text-sm font-medium mt-4 mb-2">
                <Bath className="h-4 w-4 mr-1.5" />
                Bathrooms
              </label>
              <div className="flex space-x-2">
                {[null, 1, 2, 3, 4, 5].map((num, i) => (
                  <button
                    key={i}
                    onClick={() => setFilters({ ...filters, baths: num })}
                    className={`flex-1 py-2 border ${
                      filters.baths === num
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-input hover:border-primary/50'
                    } rounded-md text-sm transition-colors`}
                  >
                    {num === null ? 'Any' : num === 5 ? '5+' : num}
                  </button>
                ))}
              </div>
            </div>

            {/* Home Type */}
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Home className="h-4 w-4 mr-1.5" />
                Home Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {homeTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleHomeTypeToggle(type.id)}
                    className={`py-2 px-3 border rounded-md flex items-center text-sm ${
                      filters.homeType.includes(type.id)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-input hover:border-primary/50'
                    } transition-colors`}
                  >
                    <type.icon className="h-4 w-4 mr-1.5" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Square Footage */}
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Move className="h-4 w-4 mr-1.5" />
                Square Footage
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={filters.minSqft || ''}
                  onChange={(e) => setFilters({
                    ...filters,
                    minSqft: parseInt(e.target.value) || null
                  })}
                  className="w-full pl-3 pr-12 py-2 border border-input rounded-md text-sm"
                  placeholder="Minimum sqft"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  sqft
                </span>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleStatusToggle(option.id)}
                    className={`py-2 px-3 border rounded-md flex items-center text-sm ${
                      filters.status.includes(option.id)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-input hover:border-primary/50'
                    } transition-colors`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="text-sm font-medium mb-2 block">Amenities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {amenitiesList.slice(0, 8).map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`py-2 px-3 border rounded-md flex items-center text-sm ${
                      filters.amenities.includes(amenity)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-input hover:border-primary/50'
                    } transition-colors`}
                  >
                    {filters.amenities.includes(amenity) && (
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                    )}
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-input rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
