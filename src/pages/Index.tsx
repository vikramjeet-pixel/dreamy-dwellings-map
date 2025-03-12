
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";
import { FilterOptions, Property } from "@/utils/types";
import { properties } from "@/utils/mockData";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    beds: null,
    baths: null,
    homeType: [],
    minSqft: null,
    amenities: [],
    status: ['sale', 'rent'],
  });
  
  const featuredProperties = properties.filter(property => property.featured);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    console.log("Applied filters:", newFilters);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold">Featured Properties</h2>
            <p className="text-muted-foreground mt-2">
              Discover our handpicked selection of exceptional properties
            </p>
          </div>
          
          <Link 
            to="/properties"
            className="mt-4 md:mt-0 group inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            View all properties
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <FilterBar onFilterChange={handleFilterChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} featured={property.id === '1'} />
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold mb-4">Find Your Dream Home</h2>
            <p className="text-muted-foreground">
              Whether you're looking for a modern apartment in the heart of the city, 
              a spacious family home in the suburbs, or a luxury retreat by the coast, 
              we have the perfect property for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=100&auto=format&fit=crop"
                  alt="Search"
                  className="w-6 h-6 object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Search Properties</h3>
              <p className="text-muted-foreground mb-4">
                Browse our extensive collection of properties with our intuitive search tools.
              </p>
              <Link
                to="/properties"
                className="text-primary hover:text-primary/80 inline-flex items-center"
              >
                Start browsing
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=100&auto=format&fit=crop"
                  alt="Map"
                  className="w-6 h-6 object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Map View</h3>
              <p className="text-muted-foreground mb-4">
                Explore properties by location with our interactive map view.
              </p>
              <Link
                to="/map"
                className="text-primary hover:text-primary/80 inline-flex items-center"
              >
                View map
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=100&auto=format&fit=crop"
                  alt="Contact"
                  className="w-6 h-6 object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Contact Us</h3>
              <p className="text-muted-foreground mb-4">
                Have questions? Our team of experienced agents is here to help.
              </p>
              <button className="text-primary hover:text-primary/80 inline-flex items-center">
                Get in touch
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium text-xl mb-4">Skyline<span className="text-primary/80">Estate</span></h3>
              <p className="text-muted-foreground">
                Luxury real estate at your fingertips. Find your dream property with our curated selection.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Properties</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/properties" className="text-muted-foreground hover:text-foreground transition-colors">
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link to="/properties?status=sale" className="text-muted-foreground hover:text-foreground transition-colors">
                    For Sale
                  </Link>
                </li>
                <li>
                  <Link to="/properties?status=rent" className="text-muted-foreground hover:text-foreground transition-colors">
                    For Rent
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/map" className="text-muted-foreground hover:text-foreground transition-colors">
                    Map View
                  </Link>
                </li>
                <li>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    Saved Properties
                  </button>
                </li>
                <li>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact Agent
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    Our Team
                  </button>
                </li>
                <li>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} SkylineEstate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
