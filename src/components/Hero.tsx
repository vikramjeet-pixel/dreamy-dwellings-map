
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background images with crossfade */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: currentImage === index ? 1 : 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-2xl animate-slide-in">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
            Discover Your Dream Property
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
            Explore our curated collection of exceptional properties, from modern urban apartments to stunning coastal retreats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/properties"
              className="bg-white hover:bg-white/90 text-primary px-8 py-3 rounded-full inline-flex items-center justify-center font-medium transition-colors"
            >
              Browse Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/map"
              className="bg-transparent hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-full inline-flex items-center justify-center font-medium transition-all"
            >
              View Map
            </Link>
          </div>
        </div>
      </div>

      {/* Image pagination dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImage === index ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
