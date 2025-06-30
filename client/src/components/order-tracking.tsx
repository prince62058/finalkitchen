import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, ChefHat, Truck, Package, MapPin } from "lucide-react";
import { type Order, type OrderStatus } from "@shared/schema";

interface OrderTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
}

export default function OrderTracking({ isOpen, onClose, orderId }: OrderTrackingProps) {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const { data: currentOrder, isLoading, refetch } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await fetch(`/api/orders/${orderId}`);
      if (!response.ok) {
        throw new Error('Order not found');
      }
      return response.json() as Promise<Order>;
    },
    enabled: isOpen && !!orderId,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (!isOpen) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log('WebSocket connected for order tracking');
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'orderUpdate' && data.data.id === orderId) {
          refetch();
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [isOpen, orderId, refetch]);

  const orderSteps = [
    { status: 'placed', label: 'Order Placed', icon: Package, color: 'bg-blue-500' },
    { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, color: 'bg-green-500' },
    { status: 'preparing', label: 'Preparing', icon: ChefHat, color: 'bg-yellow-500' },
    { status: 'cooking', label: 'Cooking', icon: ChefHat, color: 'bg-orange-500' },
    { status: 'ready', label: 'Ready for Pickup', icon: CheckCircle, color: 'bg-green-500' },
    { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, color: 'bg-blue-500' },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'bg-green-600' },
  ];

  const getStatusBadgeColor = (status: OrderStatus) => {
    const statusColors = {
      'placed': 'bg-blue-100 text-blue-800 border-blue-300',
      'confirmed': 'bg-green-100 text-green-800 border-green-300',
      'preparing': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'cooking': 'bg-orange-100 text-orange-800 border-orange-300',
      'ready': 'bg-green-100 text-green-800 border-green-300',
      'out_for_delivery': 'bg-blue-100 text-blue-800 border-blue-300',
      'delivered': 'bg-green-100 text-green-800 border-green-300',
      'cancelled': 'bg-red-100 text-red-800 border-red-300',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mr-3" />
            <span>Loading order details...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!currentOrder) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Order Not Found</h3>
            <p className="text-gray-600 mb-4">We couldn't find the order you're looking for.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const currentStepIndex = orderSteps.findIndex(step => step.status === currentOrder.status);
  const progressPercentage = ((currentStepIndex + 1) / orderSteps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-600">
            Order Tracking #{currentOrder.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status Header */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Hello, {currentOrder.customerName}!</h3>
                <p className="text-gray-600">Your order is being prepared with love</p>
              </div>
              <Badge className={`text-sm px-3 py-1 ${getStatusBadgeColor(currentOrder.status as OrderStatus)}`}>
                {orderSteps.find(step => step.status === currentOrder.status)?.label || currentOrder.status}
              </Badge>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>

          {/* Order Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Order Timeline</h4>
              {(currentOrder.status === 'out_for_delivery' || currentOrder.status === 'ready') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/live-tracking?orderId=${currentOrder.id}`, '_blank')}
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Live Tracking
                </Button>
              )}
            </div>
            
            <div className="relative">
              {orderSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.status}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center pb-8 last:pb-0"
                  >
                    {/* Timeline Line */}
                    {index < orderSteps.length - 1 && (
                      <div className="absolute left-4 top-8 w-px h-full bg-gray-200" />
                    )}

                    {/* Step Icon */}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? `${step.color} text-white` 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <AnimatePresence>
                        {isCurrent && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-orange-500"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity, 
                              repeatType: "reverse" 
                            }}
                          />
                        )}
                      </AnimatePresence>
                      <Icon size={16} />
                    </div>

                    {/* Step Label */}
                    <div className="ml-4">
                      <h5 className={`font-medium ${
                        isCompleted ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </h5>
                      {isCurrent && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-orange-600 font-medium"
                        >
                          Currently in progress...
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-blue-50 p-4 rounded-lg flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h5 className="font-medium text-blue-900">Estimated Delivery Time</h5>
              <p className="text-blue-700">
                {currentOrder.status === 'delivered' 
                  ? 'Your order has been delivered!'
                  : `${currentOrder.estimatedTime} minutes remaining`
                }
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium mb-3">Order Details</h5>
            <div className="space-y-2">
              {Array.isArray(currentOrder.items) && currentOrder.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-medium">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">₹{parseFloat(currentOrder.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium mb-2">Delivery Address</h5>
            <p className="text-gray-700">{currentOrder.customerAddress}</p>
            <p className="text-sm text-gray-600 mt-1">Phone: {currentOrder.customerPhone}</p>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}