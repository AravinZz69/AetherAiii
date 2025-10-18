import { Cloud, Droplets, Wind, Sun, Thermometer } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

const WeatherWidget = () => {
  const { weather, location } = useLocation();

  if (!weather) {
    return (
      <div className="glass-card rounded-xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Weather</h2>
            <p className="text-sm text-muted-foreground">
              {location.city ? `${location.city} conditions` : 'Current conditions'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Thermometer className="w-8 h-8 text-primary" />
              <span className="text-5xl font-bold text-glow">{weather.temperature}°</span>
            </div>
            <p className="text-muted-foreground mt-2">{weather.condition}</p>
          </div>
          <Sun className="w-16 h-16 text-warning opacity-80" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Humidity</span>
            </div>
            <p className="text-lg font-bold">{weather.humidity}%</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Wind</span>
            </div>
            <p className="text-lg font-bold">{weather.windSpeed} km/h</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Cloud className="w-4 h-4 text-secondary" />
              <span className="text-xs text-muted-foreground">Pressure</span>
            </div>
            <p className="text-lg font-bold">{weather.pressure} hPa</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          {weather.forecast.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-muted-foreground">{day.day}</p>
              <p className="font-bold mt-1">{day.high}° / {day.low}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
