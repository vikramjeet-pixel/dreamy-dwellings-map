
import { useEffect, useRef, useState } from "react";
import { Property } from "@/utils/types";
import { Home, X, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";

interface MapProps {
  properties: Property[];
}

export default function Map({ properties }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showInfoCard, setShowInfoCard] = useState(false);

  // This is a simplified map implementation
  // In a real app, you would use a library like Mapbox GL JS or Google Maps
  useEffect(() => {
    // Here would be map initialization code
    console.log("Map initialized with properties:", properties);
  }, [properties]);

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
    setShowInfoCard(true);
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] bg-muted/20 rounded-xl overflow-hidden border border-border">
      {/* Map container */}
      <div ref={mapRef} className="w-full h-full">
        {/* Placeholder map visualization */}
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
          <div className="text-center p-6 max-w-md">
            <Home className="mx-auto h-12 w-12 mb-4 text-primary/70" />
            <h3 className="text-lg font-medium mb-2">Map View</h3>
            <p className="text-muted-foreground">
              This is a placeholder for the interactive map. In a real implementation, 
              this would display an interactive map with property markers using 
              a service like Mapbox GL JS or Google Maps.
            </p>
          </div>
        </div>

        {/* Property markers (simplified for demonstration) */}
        <div className="absolute inset-0 p-6">
          {properties.map((property) => (
            <button
              key={property.id}
              className="absolute bg-primary text-primary-foreground p-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{
                left: `${30 + Math.random() * 60}%`,
                top: `${30 + Math.random() * 40}%`
              }}
              onClick={() => handleMarkerClick(property)}
            >
              <Home className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Selected property info card */}
      {selectedProperty && showInfoCard && (
        <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-[400px] glass-card p-4 animate-slide-in">
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
