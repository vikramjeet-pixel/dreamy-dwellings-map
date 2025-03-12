
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled
          ? "py-4 bg-white/80 backdrop-blur-md shadow-sm"
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-medium tracking-tight transition-opacity hover:opacity-80"
        >
          Skyline<span className="text-primary/80">Estate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/properties"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Properties
          </Link>
          <Link
            to="/map"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Map View
          </Link>
          <div className="relative rounded-full bg-secondary/80 backdrop-blur-sm px-4 py-2 flex items-center space-x-2 hover:bg-secondary transition-colors duration-200">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search properties..."
              className="bg-transparent border-none outline-none text-sm w-32 placeholder:text-muted-foreground/70"
            />
          </div>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 py-2 text-sm font-medium transition-colors">
            Sign In
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md animate-fade-in">
          <div className="px-6 py-4 space-y-4">
            <Link
              to="/"
              className="block text-foreground/80 hover:text-foreground py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="block text-foreground/80 hover:text-foreground py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              to="/map"
              className="block text-foreground/80 hover:text-foreground py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Map View
            </Link>
            <div className="relative rounded-full bg-secondary px-4 py-2 flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search properties..."
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70"
              />
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 py-2 text-sm font-medium transition-colors">
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
