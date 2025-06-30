import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Navigation, Clock, Phone, ArrowLeft, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import DeliveryMap from "@/components/delivery-map";
import type { Order } from "@shared/schema";

export default function LiveTracking() {
  const [, setLocation] = useLocation();
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('orderId');
    if (id) {
      setOrderId(parseInt(id));
    } else {
      setLocation('/');
    }
  }, [setLocation]);

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const response = await apiRequest('GET', `/api/orders/${orderId}`);
      return response.json() as Promise<Order>;
    },
    enabled: !!orderId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading tracking information...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getOrderProgress = () => {
    const statusOrder = ['placed', 'confirmed', 'preparing', 'cooking', 'ready', 'out_for_delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  const canShowLiveTracking = order.status === 'out_for_delivery' || order.status === 'ready';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/track-order">
              <Button variant="ghost" className="text-gray-600 hover:text-green-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Order Tracking
              </Button>
            </Link>
            
            <Badge className="bg-green-100 text-green-800 border-green-300">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Tracking
            </Badge>
          </div>

          {/* Order Status Header */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Truck className="w-8 h-8 mr-3 text-green-600" />
                Order #{order.id} - Live Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Delivery to: {order.customerName}</h3>
                  <p className="text-gray-600 mb-1">{order.customerAddress}</p>
                  <p className="text-gray-600">Phone: {order.customerPhone}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Progress</span>
                    <span>{Math.round(getOrderProgress())}%</span>
                  </div>
                  <Progress value={getOrderProgress()} className="h-3" />
                  <div className="text-center">
                    <Badge variant="secondary" className="text-sm">
                      Status: {order.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Tracking Content */}
          {canShowLiveTracking ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <DeliveryMap
                orderId={order.id}
                customerAddress={order.customerAddress}
                estimatedTime={order.estimatedTime}
              />
            </motion.div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <MapPin className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                <h3 className="text-xl font-semibold mb-2">Live Tracking Not Available Yet</h3>
                <p className="text-gray-600 mb-6">
                  Live tracking will be activated once your order is ready for delivery.
                </p>
                <div className="text-sm text-gray-500">
                  Current Status: <strong>{order.status.replace('_', ' ')}</strong>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Summary */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-medium">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{parseFloat(order.totalAmount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}