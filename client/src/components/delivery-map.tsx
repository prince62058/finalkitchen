import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";
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

  // Simulate delivery tracking
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      // Simulate moving delivery location (around Bhopal area)
      const baseLatitude = 23.2599; // Bhopal coordinates
      const baseLongitude = 77.4126;
      
      const randomLat = baseLatitude + (Math.random() - 0.5) * 0.02;
      const randomLng = baseLongitude + (Math.random() - 0.5) * 0.02;

      setDeliveryLocation({
        lat: randomLat,
        lng: randomLng,
        timestamp: Date.now()
      });

      // Simulate decreasing distance and time
      setDistance(prev => {
        const currentDist = parseFloat(prev);
        const newDist = Math.max(0.1, currentDist - 0.1);
        return `${newDist.toFixed(1)} km`;
      });

      setEstimatedArrival(prev => Math.max(2, prev - 1));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isTracking]);

  const startTracking = () => {
    setIsTracking(true);
    // Initial location
    setDeliveryLocation({
      lat: 23.2599,
      lng: 77.4126,
      timestamp: Date.now()
    });
  };

  return (
    <div className="space-y-6">
      {/* Delivery Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Navigation className="w-6 h-6 mr-2 text-green-600" />
            Live Delivery Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto text-green-600 mb-1" />
              <p className="text-sm text-gray-600">Estimated Arrival</p>
              <p className="font-bold text-green-600">{estimatedArrival} mins</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <MapPin className="w-6 h-6 mx-auto text-blue-600 mb-1" />
              <p className="text-sm text-gray-600">Distance</p>
              <p className="font-bold text-blue-600">{distance}</p>
            </div>
          </div>

          {!isTracking ? (
            <Button 
              onClick={startTracking}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Start Live Tracking
            </Button>
          ) : (
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Tracking Active
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivery Person Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Phone className="w-5 h-5 mr-2 text-orange-600" />
            Delivery Partner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                {deliveryPersonName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold">{deliveryPersonName}</p>
                <p className="text-sm text-gray-600">Delivery Executive</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:${deliveryPersonPhone}`, '_self')}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Visualization */}
      {deliveryLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                Delivery Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Simple map placeholder with coordinates */}
              <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-lg text-center space-y-4">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto text-red-500 mb-2 animate-bounce" />
                      <p className="font-semibold">Delivery Partner Location</p>
                      <p className="text-sm text-gray-600">
                        Lat: {deliveryLocation.lat.toFixed(4)}, 
                        Lng: {deliveryLocation.lng.toFixed(4)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Last updated: {new Date(deliveryLocation.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p><strong>Delivering to:</strong> {customerAddress}</p>
                  <p className="mt-2 text-green-600 font-medium">
                    🚗 Your delivery partner is on the way!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Delivery Instructions */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Delivery Instructions</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Please be available at the delivery address
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Keep your phone accessible for delivery updates
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Have exact change ready (if paying cash)
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}