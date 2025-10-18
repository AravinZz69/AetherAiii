import { MapPin, Navigation, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";
import { useState } from "react";

const CityMap = () => {
  const { location, getCurrentLocation } = useLocation();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      await getCurrentLocation();
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">City Overview</h2>
            {location.city && (
              <p className="text-sm text-muted-foreground">
                {location.city}, {location.country}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-accent" />
            <Button
              onClick={handleGetCurrentLocation}
              disabled={isGettingLocation}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-primary/10"
            >
              <Crosshair className={`w-4 h-4 ${isGettingLocation ? 'animate-spin' : ''}`} />
              {isGettingLocation ? 'Locating...' : 'My Location'}
            </Button>
          </div>
        </div>
        
        {location.error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{location.error}</p>
          </div>
        )}
        
        <div className="relative h-[400px] bg-muted/30 rounded-lg overflow-hidden border border-border/50">
          {/* Simplified map visualization */}
          <svg className="w-full h-full" viewBox="0 0 400 400">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#grid)" />
            
            {/* Roads */}
            <line x1="0" y1="200" x2="400" y2="200" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.6" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.6" />
            <line x1="100" y1="0" x2="100" y2="400" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
            <line x1="300" y1="0" x2="300" y2="400" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
            
            {/* Clickable polygon areas */}
            <polygon 
              points="50,50 150,50 150,150 50,150" 
              fill="hsl(var(--accent))" 
              opacity="0.3" 
              stroke="hsl(var(--accent))" 
              strokeWidth="2"
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={handleGetCurrentLocation}
            />
            <polygon 
              points="250,100 350,100 350,200 250,200" 
              fill="hsl(var(--warning))" 
              opacity="0.3" 
              stroke="hsl(var(--warning))" 
              strokeWidth="2"
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={handleGetCurrentLocation}
            />
            <polygon 
              points="100,250 200,250 200,350 100,350" 
              fill="hsl(var(--success))" 
              opacity="0.3" 
              stroke="hsl(var(--success))" 
              strokeWidth="2"
              className="cursor-pointer hover:opacity-50 transition-opacity"
              onClick={handleGetCurrentLocation}
            />
            
            {/* Location markers */}
            <circle cx="150" cy="150" r="8" fill="hsl(var(--accent))" className="animate-pulse" />
            <circle cx="250" cy="250" r="8" fill="hsl(var(--warning))" className="animate-pulse" />
            <circle cx="300" cy="120" r="8" fill="hsl(var(--success))" className="animate-pulse" />
            <circle cx="120" cy="280" r="8" fill="hsl(var(--accent))" className="animate-pulse" />
            
            {/* User location marker */}
            {location.latitude && location.longitude && (
              <g>
                <circle cx="200" cy="200" r="12" fill="hsl(var(--primary))" className="animate-pulse" />
                <circle cx="200" cy="200" r="6" fill="white" />
                <text x="200" y="185" textAnchor="middle" className="text-xs fill-primary font-bold">You</text>
              </g>
            )}
          </svg>
          
          {/* Location pins */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="w-6 h-6 text-accent drop-shadow-lg" fill="currentColor" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/90 px-2 py-1 rounded text-xs whitespace-nowrap border border-accent/30">
                Downtown
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <MapPin className="w-6 h-6 text-warning drop-shadow-lg" fill="currentColor" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/90 px-2 py-1 rounded text-xs whitespace-nowrap border border-warning/30">
                High Traffic
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <span className="text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
            <span className="text-muted-foreground">Busy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground">Clear</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-muted-foreground text-xs">Click polygons or button to get your location</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityMap;
