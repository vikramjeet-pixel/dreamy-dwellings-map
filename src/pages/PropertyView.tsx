
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/utils/types";
import { fetchPropertyById, fetchSimilarProperties } from "@/utils/propertyService";
import { ArrowLeft, Home } from "lucide-react";

const PropertyView = () => {
  const { id } = useParams<{ id: string }>();
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(id || ''),
    enabled: !!id,
  });

  useEffect(() => {
    // Fetch similar properties when the main property is loaded
    if (property) {
      fetchSimilarProperties(property).then(data => {
        setSimilarProperties(data);
      });
    }
  }, [property]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-20 w-20 bg-secondary rounded-full mb-4"></div>
            <div className="h-6 w-40 bg-secondary rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
          <Home className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-semibold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/properties"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link
            to="/properties"
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Properties
          </Link>
          
          <span className="text-muted-foreground">/</span>
          
          <span className="text-muted-foreground line-clamp-1">
            {property.title}
          </span>
        </div>
      </div>
      
      <PropertyDetails property={property} />
      
      {similarProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-8">Similar Properties</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      )}
      
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

export default PropertyView;
