
import { useState } from "react";
import { Property } from "@/utils/types";
import { 
  Bed, 
  Bath, 
  Move, 
  Calendar, 
  MapPin, 
  Heart, 
  Share2, 
  ChevronLeft,
  ChevronRight,
  Home
} from "lucide-react";

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    if (property.status === "rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-16 pb-24 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-muted">
            {property.images.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: currentImageIndex === index ? 1 : 0 }}
              >
                <img
                  src={image}
                  alt={`${property.title} - image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            
            {/* Controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/40 text-white text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => selectImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all ${
                  currentImageIndex === index 
                    ? "ring-2 ring-primary ring-offset-2" 
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`${property.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Property Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className={`
                inline-block px-3 py-1 text-xs font-medium rounded-full 
                ${property.status === 'sale' ? 'bg-blue-500 text-white' : ''}
                ${property.status === 'rent' ? 'bg-green-500 text-white' : ''}
                ${property.status === 'pending' ? 'bg-amber-500 text-white' : ''}
                ${property.status === 'sold' ? 'bg-red-500 text-white' : ''}
              `}>
                {property.status === 'sale' ? 'For Sale' : ''}
                {property.status === 'rent' ? 'For Rent' : ''}
                {property.status === 'pending' ? 'Pending' : ''}
                {property.status === 'sold' ? 'Sold' : ''}
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 rounded-full hover:bg-secondary"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>
                
                <button className="p-2 rounded-full hover:bg-secondary">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <h1 className="text-3xl font-semibold mt-2">{property.title}</h1>
            
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}
              </span>
            </div>
            
            <p className="text-3xl font-bold mt-4">{formatPrice(property.price)}</p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
            <div className="text-center">
              <Bed className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">Beds</div>
              <div className="font-medium">{property.beds}</div>
            </div>
            
            <div className="text-center">
              <Bath className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">Baths</div>
              <div className="font-medium">{property.baths}</div>
            </div>
            
            <div className="text-center">
              <Move className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">Area</div>
              <div className="font-medium">{property.sqft.toLocaleString()} sqft</div>
            </div>
            
            <div className="text-center">
              <Home className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">Type</div>
              <div className="font-medium capitalize">{property.type}</div>
            </div>
            
            <div className="text-center">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">Year</div>
              <div className="font-medium">{property.yearBuilt}</div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center py-1">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-colors">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
