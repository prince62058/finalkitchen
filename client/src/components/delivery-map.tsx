import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Clock, Phone, Truck, Locate, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DeliveryLocation {
  lat: number;
  lng: number;
  timestamp: number;
}

interface DeliveryMapProps {
  orderId: number;
  customerAddress: string;
  estimatedTime: number;
  deliveryPersonName?: string;
  deliveryPersonPhone?: string;
}

export default function DeliveryMap({ 
  orderId, 
  customerAddress, 
  estimatedTime,
  deliveryPersonName = "Raj Kumar",
  deliveryPersonPhone = "+91 98765 43210"
}: DeliveryMapProps) {
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState("2.3 km");
  const [estimatedArrival, setEstimatedArrival] = useState(estimatedTime);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [trackingStarted, setTrackingStarted] = useState(false);

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      return;
    }

    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        console.log('User location obtained:', { lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError(error.message);
        // Fallback to Bhopal coordinates
        setUserLocation({ lat: 23.2599, lng: 77.4126 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  // Start real-time location tracking
  const startTracking = () => {
    setIsTracking(true);
    setTrackingStarted(true);
    getCurrentLocation();
  };

  // Simulate delivery tracking with realistic movement
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      // Simulate delivery person moving towards customer
      // Starting from restaurant (Bhopal center) moving to customer location
      const restaurantLat = 23.2599; // Yashavee Cloud Kitchen location
      const restaurantLng = 77.4126;
      
      const targetLat = userLocation?.lat || 23.2699; // Customer location
      const targetLng = userLocation?.lng || 77.4226;
      
      // Simulate gradual movement towards customer
      const progress = Math.min((Date.now() % 600000) / 600000, 1); // 10 minute cycle
      const currentLat = restaurantLat + (targetLat - restaurantLat) * progress;
      const currentLng = restaurantLng + (targetLng - restaurantLng) * progress;
      
      // Add some random movement to simulate real tracking
      const jitterLat = currentLat + (Math.random() - 0.5) * 0.002;
      const jitterLng = currentLng + (Math.random() - 0.5) * 0.002;

      setDeliveryLocation({
        lat: jitterLat,
        lng: jitterLng,
        timestamp: Date.now()
      });

      // Update distance and arrival time based on progress
      const remainingDistance = (2.5 * (1 - progress)).toFixed(1);
      const remainingTime = Math.max(5, Math.round(estimatedTime * (1 - progress)));
      
      setDistance(`${remainingDistance} km`);
      setEstimatedArrival(remainingTime);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isTracking, userLocation, estimatedTime]);

  // Generate Google Maps URL for directions
  const getGoogleMapsUrl = () => {
    if (!deliveryLocation) return "#";
    
    const userLat = userLocation?.lat || 23.2699;
    const userLng = userLocation?.lng || 77.4226;
    
    return `https://www.google.com/maps/dir/${deliveryLocation.lat},${deliveryLocation.lng}/${userLat},${userLng}`;
  };

  // Generate map view URL
  const getMapViewUrl = () => {
    const centerLat = userLocation?.lat || 23.2599;
    const centerLng = userLocation?.lng || 77.4126;
    
    let markersParam = `markers=color:blue%7Clabel:You%7C${centerLat},${centerLng}`;
    
    if (deliveryLocation) {
      markersParam += `&markers=color:red%7Clabel:Delivery%7C${deliveryLocation.lat},${deliveryLocation.lng}`;
    }
    
    return `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLng}&zoom=13&size=600x300&${markersParam}&key=YOUR_GOOGLE_MAPS_API_KEY`;
  };

  return (
    <div className="space-y-6">
      {/* Delivery Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="w-5 h-5 mr-2 text-primary" />
            Live Delivery Tracking
            {isTracking && (
              <Badge className="ml-2 bg-green-500 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full mr-1" />
                LIVE
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Delivery Person Info */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">{deliveryPersonName.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold">{deliveryPersonName}</p>
                <p className="text-sm text-gray-600">Delivery Partner</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:${deliveryPersonPhone}`)}
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
          </div>

          {/* Location Status */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Navigation className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-gray-600">Distance</p>
              <p className="font-semibold">{distance}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-gray-600">ETA</p>
              <p className="font-semibold">{estimatedArrival} min</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold text-green-600">
                {isTracking ? "En Route" : "Preparing"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {!trackingStarted ? (
              <Button
                onClick={startTracking}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Locate className="w-4 h-4 mr-2" />
                Start Live Tracking
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={() => setIsTracking(!isTracking)}
                  variant={isTracking ? "destructive" : "default"}
                  className="w-full"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isTracking ? 'animate-spin' : ''}`} />
                  {isTracking ? "Stop Tracking" : "Resume Tracking"}
                </Button>
                
                {deliveryLocation && (
                  <Button
                    onClick={() => window.open(getGoogleMapsUrl(), '_blank')}
                    variant="outline"
                    className="w-full"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Location Error */}
          {locationError && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Location Note:</strong> {locationError}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Using approximate location for demo purposes.
              </p>
            </div>
          )}

          {/* Delivery Status Updates */}
          {isTracking && deliveryLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <p className="text-sm text-blue-800">
                <strong>Latest Update:</strong> Your delivery partner is on the way!
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Last updated: {new Date(deliveryLocation.timestamp).toLocaleTimeString()}
              </p>
            </motion.div>
          )}

          {/* Customer Address */}
          <div className="p-3 border rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Delivering to:</p>
            <p className="font-medium">{customerAddress}</p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map Placeholder */}
      {trackingStarted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Live Location Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Static Map as placeholder - replace with actual Google Maps API */}
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">
                    Real-time tracking with Google Maps
                  </p>
                  {deliveryLocation && (
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Delivery: {deliveryLocation.lat.toFixed(4)}, {deliveryLocation.lng.toFixed(4)}</p>
                      {userLocation && (
                        <p>Your Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Live indicator */}
              {isTracking && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-red-500 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-1" />
                    LIVE
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <Button
                onClick={() => window.open(getGoogleMapsUrl(), '_blank')}
                variant="outline"
                className="w-full"
                disabled={!deliveryLocation}
              >
                <Navigation className="w-4 h-4 mr-2" />
                View Full Map & Directions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}