
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Upload, X, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [propertyType, setPropertyType] = useState<string>("house");
  const [status, setStatus] = useState<string>("sale");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>(["Air Conditioning"]);
  const [newAmenity, setNewAmenity] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const selectedFiles = Array.from(e.target.files);
    setImages(prev => [...prev, ...selectedFiles]);
    
    // Create preview URLs for the selected images
    const newImageUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...newImageUrls]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imageUrls[index]);
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities(prev => [...prev, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (index: number) => {
    setAmenities(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.get("title")) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.get("description")) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.get("price") || Number(formData.get("price")) <= 0) {
      newErrors.price = "Valid price is required";
    }
    
    if (!formData.get("street")) {
      newErrors.street = "Street address is required";
    }
    
    if (!formData.get("city")) {
      newErrors.city = "City is required";
    }
    
    if (!formData.get("state")) {
      newErrors.state = "State is required";
    }
    
    if (!formData.get("zip")) {
      newErrors.zip = "ZIP code is required";
    }
    
    if (!formData.get("beds") || Number(formData.get("beds")) <= 0) {
      newErrors.beds = "Number of beds is required";
    }
    
    if (!formData.get("baths") || Number(formData.get("baths")) <= 0) {
      newErrors.baths = "Number of baths is required";
    }
    
    if (!formData.get("sqft") || Number(formData.get("sqft")) <= 0) {
      newErrors.sqft = "Square footage is required";
    }
    
    if (!formData.get("year") || Number(formData.get("year")) <= 1800) {
      newErrors.year = "Valid year built is required";
    }
    
    if (!formData.get("lat") || !formData.get("lng")) {
      newErrors.location = "Location coordinates are required";
    }
    
    if (images.length === 0) {
      newErrors.images = "At least one image is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (!validateForm(formData)) {
      setIsLoading(false);
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // 1. Upload images to storage
      const imagePromises = images.map(async (image) => {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${user?.id}/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('property-images')
          .upload(filePath, image);
          
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);
          
        return publicUrl;
      });
      
      const uploadedImageUrls = await Promise.all(imagePromises);
      
      // 2. Create property in database
      const propertyData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        address: {
          street: formData.get("street") as string,
          city: formData.get("city") as string,
          state: formData.get("state") as string,
          zip: formData.get("zip") as string,
        },
        beds: Number(formData.get("beds")),
        baths: Number(formData.get("baths")),
        sqft: Number(formData.get("sqft")),
        type: propertyType,
        year_built: Number(formData.get("year")),
        images: uploadedImageUrls,
        featured: false,
        amenities: amenities,
        location: {
          lat: Number(formData.get("lat")),
          lng: Number(formData.get("lng")),
        },
        status: status,
        user_id: user?.id,
      };
      
      const { error: insertError, data: property } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single();
        
      if (insertError) {
        throw new Error(`Error creating property: ${insertError.message}`);
      }
      
      toast({
        title: "Property Added",
        description: "Your property has been added successfully!",
      });
      
      // Navigate to the newly created property
      navigate(`/property/${property.id}`);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </button>
          
          <h1 className="text-2xl font-semibold">Add New Property</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="e.g. Modern Apartment in Downtown"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  min="0" 
                  placeholder="e.g. 250000"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.price}
                  </p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Describe the property"
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Address */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="street">Street Address</Label>
                <Input 
                  id="street" 
                  name="street" 
                  placeholder="e.g. 123 Main St"
                  className={errors.street ? "border-red-500" : ""}
                />
                {errors.street && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.street}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city" 
                  placeholder="e.g. New York"
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.city}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  name="state" 
                  placeholder="e.g. NY"
                  className={errors.state ? "border-red-500" : ""}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.state}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input 
                  id="zip" 
                  name="zip" 
                  placeholder="e.g. 10001"
                  className={errors.zip ? "border-red-500" : ""}
                />
                {errors.zip && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.zip}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <Input 
                  id="lat" 
                  name="lat" 
                  type="number" 
                  step="any" 
                  placeholder="e.g. 40.7128"
                  className={errors.location ? "border-red-500" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lng">Longitude</Label>
                <Input 
                  id="lng" 
                  name="lng" 
                  type="number" 
                  step="any" 
                  placeholder="e.g. -74.0060"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.location}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Property Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Property Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="beds">Bedrooms</Label>
                <Input 
                  id="beds" 
                  name="beds" 
                  type="number" 
                  min="0" 
                  placeholder="e.g. 3"
                  className={errors.beds ? "border-red-500" : ""}
                />
                {errors.beds && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.beds}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="baths">Bathrooms</Label>
                <Input 
                  id="baths" 
                  name="baths" 
                  type="number" 
                  min="0" 
                  step="0.5" 
                  placeholder="e.g. 2"
                  className={errors.baths ? "border-red-500" : ""}
                />
                {errors.baths && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.baths}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sqft">Square Feet</Label>
                <Input 
                  id="sqft" 
                  name="sqft" 
                  type="number" 
                  min="0" 
                  placeholder="e.g. 1500"
                  className={errors.sqft ? "border-red-500" : ""}
                />
                {errors.sqft && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.sqft}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year Built</Label>
                <Input 
                  id="year" 
                  name="year" 
                  type="number" 
                  min="1800" 
                  max={new Date().getFullYear()} 
                  placeholder={`e.g. ${new Date().getFullYear() - 10}`}
                  className={errors.year ? "border-red-500" : ""}
                />
                {errors.year && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.year}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property-type">Property Type</Label>
                <Select
                  value={propertyType}
                  onValueChange={setPropertyType}
                >
                  <SelectTrigger id="property-type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={setStatus}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Amenities */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Amenities</h2>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {amenities.map((amenity, index) => (
                <div 
                  key={index} 
                  className="bg-secondary flex items-center px-3 py-1 rounded-full"
                >
                  <span>{amenity}</span>
                  <button 
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <Input 
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add an amenity (e.g. Pool, Fireplace)"
              />
              <Button 
                type="button"
                variant="outline"
                onClick={addAmenity}
                disabled={!newAmenity.trim()}
              >
                Add
              </Button>
            </div>
          </div>
          
          {/* Images */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Images</h2>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <Label 
                htmlFor="image-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  Click to upload images or drag and drop
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  JPG, PNG, WebP up to 5MB
                </p>
              </Label>
              
              {errors.images && (
                <p className="text-red-500 text-sm flex items-center justify-center mt-2">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.images}
                </p>
              )}
            </div>
            
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Adding Property...
                </>
              ) : (
                "Add Property"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
