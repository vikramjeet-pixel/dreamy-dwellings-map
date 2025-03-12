
import { useState } from "react";
import { Property } from "@/utils/types";
import { Link } from "react-router-dom";
import { Bed, Bath, Move, MapPin, Heart } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    if (property.status === "rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div 
      className={`group overflow-hidden rounded-xl bg-card border border-border shadow-sm transition-all duration-300 ${
        featured ? "md:col-span-2" : ""
      } hover-scale`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {/* Image */}
        <div className="relative w-full h-full">
          {property.images.length > 0 && (
            <>
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isLoading ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-full h-full image-loading" />
              </div>
              <img
                src={property.images[0]}
                alt={property.title}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
                loading="lazy"
              />
            </>
          )}

          {/* Property status badge */}
          <div className="absolute top-4 left-4">
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
          </div>

          {/* Favorite button */}
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Image counter */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 right-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-black/60 text-white">
                <span>{property.images.length} photos</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <Link to={`/property/${property.id}`} className="block p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>
            {property.address.city}, {property.address.state}
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">
            {formatPrice(property.price)}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span>{property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center">
            <Move className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
