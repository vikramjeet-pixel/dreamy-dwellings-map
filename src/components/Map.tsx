
import { useEffect, useRef, useState } from "react";
import { Property } from "@/utils/types";
import { Home, X, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with webpack/vite
// This is needed because the default markers reference images from the leaflet directory
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Create custom marker icon
const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Set default icon for all markers
L.Marker.prototype.options.icon = defaultIcon;

interface MapProps {
  properties: Property[];
}

// Component to automatically adjust map view based on properties
function MapBoundsAdjuster({ properties }: { properties: Property[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(
        properties.map(property => [
          property.location.lat,
          property.location.lng
        ])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties, map]);
  
  return null;
}

export default function Map({ properties }: MapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showInfoCard, setShowInfoCard] = useState(false);

  // Calculate center based on properties or use a default
  const getDefaultCenter = () => {
    if (properties.length > 0) {
      return [
        properties[0].location.lat,
        properties[0].location.lng
      ] as [number, number];
    }
    return [34.0522, -118.2437] as [number, number]; // Default: Los Angeles
  };

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
    setShowInfoCard(true);
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] rounded-xl overflow-hidden border border-border">
      {/* OpenStreetMap container */}
      <MapContainer
        center={getDefaultCenter()}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.location.lat, property.location.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(property),
            }}
          >
            <Popup>
              <div className="text-sm font-medium">{property.title}</div>
              <div className="text-muted-foreground">${property.price.toLocaleString()}</div>
            </Popup>
          </Marker>
        ))}
        
        <MapBoundsAdjuster properties={properties} />
      </MapContainer>

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
