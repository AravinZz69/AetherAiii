import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  country: string | null;
  isLoading: boolean;
  error: string | null;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
  }>;
}

interface TrafficData {
  areas: Array<{
    area: string;
    level: number;
    status: "clear" | "moderate" | "busy" | "congested";
    trend: "up" | "down";
  }>;
  averageSpeed: number;
  activeVehicles: number;
}

interface MetricsData {
  population: string;
  populationChange: string;
  energyUsage: string;
  energyChange: string;
  waterSupply: string;
  waterChange: string;
  networkCoverage: string;
  networkStatus: string;
}

interface LocationContextType {
  location: LocationData;
  weather: WeatherData | null;
  traffic: TrafficData | null;
  metrics: MetricsData | null;
  getCurrentLocation: () => Promise<void>;
  refreshLocationData: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const defaultWeatherData: WeatherData = {
  temperature: 24,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  pressure: 1013,
  forecast: [
    { day: "Tomorrow", high: 26, low: 18 },
    { day: "Tue", high: 25, low: 17 },
    { day: "Wed", high: 23, low: 16 },
  ]
};

const defaultTrafficData: TrafficData = {
  areas: [
    { area: "Main Street", level: 75, status: "busy", trend: "up" },
    { area: "Highway 101", level: 45, status: "moderate", trend: "down" },
    { area: "Downtown", level: 90, status: "congested", trend: "up" },
    { area: "Suburbs", level: 25, status: "clear", trend: "down" },
  ],
  averageSpeed: 45,
  activeVehicles: 12456
};

const defaultMetricsData: MetricsData = {
  population: "2.1M",
  populationChange: "+2.3%",
  energyUsage: "1,254 MW",
  energyChange: "-5.2%",
  waterSupply: "98.5%",
  waterChange: "+1.1%",
  networkCoverage: "96.2%",
  networkStatus: "Optimal"
};

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    city: null,
    country: null,
    isLoading: false,
    error: null,
  });

  const [weather, setWeather] = useState<WeatherData | null>(defaultWeatherData);
  const [traffic, setTraffic] = useState<TrafficData | null>(defaultTrafficData);
  const [metrics, setMetrics] = useState<MetricsData | null>(defaultMetricsData);

  const getCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: "Geolocation is not supported by this browser.",
        isLoading: false,
      }));
      return;
    }

    setLocation(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000, // 10 minutes
        });
      });

      const { latitude, longitude } = position.coords;

      // Get city name from coordinates using reverse geocoding
      const cityData = await getCityFromCoordinates(latitude, longitude);

      setLocation({
        latitude,
        longitude,
        city: cityData.city,
        country: cityData.country,
        isLoading: false,
        error: null,
      });

      // Refresh location-based data
      await refreshLocationData();
    } catch (error) {
      let errorMessage = "Failed to get location.";
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
      }

      setLocation(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  const getCityFromCoordinates = async (lat: number, lon: number) => {
    try {
      // Using a free geocoding service (you can replace with your preferred service)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await response.json();
      
      return {
        city: data.city || data.locality || "Unknown City",
        country: data.countryName || "Unknown Country"
      };
    } catch (error) {
      console.error("Failed to get city name:", error);
      return {
        city: "Unknown City",
        country: "Unknown Country"
      };
    }
  };

  const refreshLocationData = useCallback(async () => {
    if (!location.latitude || !location.longitude) return;

    try {
      // Simulate fetching location-specific data
      // In a real app, you would make API calls to get actual data for the coordinates
      
      // Update weather data with location-specific variations
      const locationWeather: WeatherData = {
        ...defaultWeatherData,
        temperature: Math.round(defaultWeatherData.temperature + (Math.random() - 0.5) * 10),
        humidity: Math.round(defaultWeatherData.humidity + (Math.random() - 0.5) * 20),
        windSpeed: Math.round(defaultWeatherData.windSpeed + (Math.random() - 0.5) * 10),
      };

      // Update traffic data with location-specific variations
      const locationTraffic: TrafficData = {
        ...defaultTrafficData,
        areas: defaultTrafficData.areas.map(area => ({
          ...area,
          level: Math.max(0, Math.min(100, area.level + (Math.random() - 0.5) * 30)),
        })),
        averageSpeed: Math.round(defaultTrafficData.averageSpeed + (Math.random() - 0.5) * 20),
        activeVehicles: Math.round(defaultTrafficData.activeVehicles + (Math.random() - 0.5) * 5000),
      };

      // Update metrics with location-specific variations
      const locationMetrics: MetricsData = {
        ...defaultMetricsData,
        population: `${(2.1 + (Math.random() - 0.5) * 0.8).toFixed(1)}M`,
        energyUsage: `${Math.round(1254 + (Math.random() - 0.5) * 500)} MW`,
        waterSupply: `${(98.5 + (Math.random() - 0.5) * 5).toFixed(1)}%`,
        networkCoverage: `${(96.2 + (Math.random() - 0.5) * 8).toFixed(1)}%`,
      };

      setWeather(locationWeather);
      setTraffic(locationTraffic);
      setMetrics(locationMetrics);
    } catch (error) {
      console.error("Failed to refresh location data:", error);
    }
  }, [location.latitude, location.longitude]);

  return (
    <LocationContext.Provider value={{
      location,
      weather,
      traffic,
      metrics,
      getCurrentLocation,
      refreshLocationData,
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};