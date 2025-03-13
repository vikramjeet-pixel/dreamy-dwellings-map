import { useState } from "react";
import { Property } from "@/utils/types";
import { Home, X, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";

interface MapProps {
  properties: Property[];
}

export default function Map({ properties }: MapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showInfoCard, setShowInfoCard] = useState(false);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowInfoCard(true);
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] rounded-xl overflow-hidden border border-border">
      {/* Basic placeholder for the map */}
      <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
        <Home className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-muted-foreground">Map functionality has been removed</p>
        
        {/* Grid to display property cards instead of map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto mt-4 w-full max-h-[70%]">
          {properties.map((property) => (
            <div 
              key={property.id}
              onClick={() => handlePropertyClick(property)}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {/* Selected property info card */}
      {selectedProperty && showInfoCard && (
        <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-[400px] glass-card p-4 animate-slide-in bg-card/95 backdrop-blur-sm z-[1000]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{selectedProperty.title}</h3>
            <button 
              onClick={() => setShowInfoCard(false)}
              className="p-1 hover:bg-secondary rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <PropertyCard property={selectedProperty} />
          
          <div className="flex justify-between mt-2">
            <button 
              onClick={() => {
                const currentIndex = properties.findIndex(p => p.id === selectedProperty.id);
                const prevIndex = (currentIndex - 1 + properties.length) % properties.length;
                setSelectedProperty(properties[prevIndex]);
              }}
              className="p-2 hover:bg-secondary rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <button 
              onClick={() => {
                const currentIndex = properties.findIndex(p => p.id === selectedProperty.id);
                const nextIndex = (currentIndex + 1) % properties.length;
                setSelectedProperty(properties[nextIndex]);
              }}
              className="p-2 hover:bg-secondary rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
