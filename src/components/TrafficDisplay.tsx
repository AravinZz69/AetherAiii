import { Car, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "@/contexts/LocationContext";

const TrafficDisplay = () => {
  const { traffic, location } = useLocation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "clear": return "text-success";
      case "moderate": return "text-accent";
      case "busy": return "text-warning";
      case "congested": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getProgressColor = (level: number) => {
    if (level < 40) return "bg-success";
    if (level < 70) return "bg-accent";
    if (level < 85) return "bg-warning";
    return "bg-destructive";
  };

  if (!traffic) {
    return (
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-muted-foreground">Loading traffic data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Car className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Traffic Status</h2>
          <p className="text-sm text-muted-foreground">
            {location.city ? `${location.city} monitoring` : 'Real-time monitoring'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {traffic.areas.map((trafficArea, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{trafficArea.area}</span>
                {trafficArea.status === "congested" && (
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${getStatusColor(trafficArea.status)}`}>
                  {Math.round(trafficArea.level)}%
                </span>
                {trafficArea.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-destructive" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-success" />
                )}
              </div>
            </div>
            <div className="relative">
              <Progress value={trafficArea.level} className="h-2" />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor(trafficArea.level)}`}
                style={{ width: `${trafficArea.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Average Speed</span>
          <span className="font-bold text-accent">{traffic.averageSpeed} km/h</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Active Vehicles</span>
          <span className="font-bold text-primary">{traffic.activeVehicles.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficDisplay;
