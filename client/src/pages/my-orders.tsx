import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Package, 
  Clock, 
  Phone, 
  MapPin, 
  Search,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Order } from "@shared/schema";

export default function MyOrders() {
  const [, setLocation] = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get phone from localStorage if available
  useEffect(() => {
    const savedPhone = localStorage.getItem('userPhone');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
      setSearchTriggered(true);
    }
  }, []);

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['orders-by-phone', phoneNumber],
    queryFn: async () => {
      if (!phoneNumber) return [];
      const response = await apiRequest('GET', `/api/orders/phone/${phoneNumber}`);
      return response.json() as Promise<Order[]>;
    },
    enabled: searchTriggered && !!phoneNumber,
  });

  // Cancel order mutation
  const cancelOrderMutation = useMutation({
    mutationFn: async (orderId: number) => {
      const response = await apiRequest('PATCH', `/api/orders/${orderId}/cancel`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Order Cancelled",
        description: `Order #${data.order.id} has been cancelled successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['orders-by-phone', phoneNumber] });
    },
    onError: (error: any) => {
      toast({
        title: "Cancellation Failed",
        description: error.message || "Failed to cancel order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCancelOrder = (orderId: number, orderStatus: string) => {
    const cancellableStatuses = ['placed', 'confirmed', 'preparing'];
    if (!cancellableStatuses.includes(orderStatus)) {
      toast({
        title: "Cannot Cancel Order",
        description: "This order cannot be cancelled at its current stage.",
        variant: "destructive",
      });
      return;
    }
    
    if (confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
      cancelOrderMutation.mutate(orderId);
    }
  };

  const handleSearch = () => {
    if (phoneNumber.trim()) {
      localStorage.setItem('userPhone', phoneNumber);
      setSearchTriggered(true);
      refetch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'cooking': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-purple-100 text-purple-800';
      case 'out_for_delivery': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'placed': return 'Order Placed';
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'Preparing';
      case 'cooking': return 'Cooking';
      case 'ready': return 'Ready';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const canTrackLive = (status: string) => {
    return status === 'out_for_delivery' || status === 'ready';
  };

  const canCancelOrder = (status: string) => {
    return ['placed', 'confirmed', 'preparing'].includes(status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-gray-600 hover:text-orange-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <Package className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track all your orders in one place</p>
          </div>

          {/* Phone Number Search */}
          <Card className="mb-8 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-orange-600">Find Your Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Enter Your Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number (e.g., 9876543210)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSearch}
                    disabled={!phoneNumber.trim()}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Find Your Orders</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Enter the phone number you used during checkout</li>
                  <li>• All orders placed with this number will be displayed</li>
                  <li>• You can track each order individually</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">Searching for your orders...</p>
            </div>
          )}

          {/* Orders List */}
          {searchTriggered && !isLoading && (
            <div className="space-y-6">
              {orders && orders.length > 0 ? (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Found {orders.length} order{orders.length > 1 ? 's' : ''}
                    </h2>
                    <p className="text-gray-600">for phone number: {phoneNumber}</p>
                  </div>

                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                          <div className="mb-4 lg:mb-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">
                                Order #{order.id}
                              </h3>
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusText(order.status)}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                Placed: {new Date(order.createdAt).toLocaleString()}
                              </p>
                              <p className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                {order.customerPhone}
                              </p>
                              <p className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {order.customerAddress}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600 mb-2">
                              ₹{parseFloat(order.totalAmount).toFixed(2)}
                            </div>
                            <div className="space-y-2">
                              <div className="flex flex-col lg:flex-row gap-2">
                                <Button
                                  onClick={() => setLocation(`/live-tracking?orderId=${order.id}`)}
                                  className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700"
                                >
                                  {canTrackLive(order.status) ? (
                                    <>
                                      <Truck className="w-4 h-4 mr-2" />
                                      Live Tracking
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Order
                                    </>
                                  )}
                                </Button>
                                
                                {canCancelOrder(order.status) && (
                                  <Button
                                    onClick={() => handleCancelOrder(order.id, order.status)}
                                    disabled={cancelOrderMutation.isPending}
                                    variant="destructive"
                                    className="flex-1 lg:flex-none"
                                  >
                                    {cancelOrderMutation.isPending ? (
                                      <>
                                        <AlertTriangle className="w-4 h-4 mr-2 animate-spin" />
                                        Cancelling...
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Cancel Order
                                      </>
                                    )}
                                  </Button>
                                )}
                              </div>
                              
                              {order.status === 'delivered' && (
                                <div className="flex items-center text-green-600 text-sm">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Delivered Successfully
                                </div>
                              )}
                              
                              {order.status === 'cancelled' && (
                                <div className="flex items-center text-red-600 text-sm">
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Order Cancelled
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Order Items */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Order Items:</h4>
                          <div className="grid gap-3">
                            {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-600">₹{item.price} each</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">Qty: {item.quantity}</p>
                                  <p className="text-green-600 font-bold">
                                    ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
                    <p className="text-gray-600 mb-6">
                      No orders found for phone number: <strong>{phoneNumber}</strong>
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        • Make sure you entered the correct phone number
                      </p>
                      <p className="text-sm text-gray-500">
                        • Orders are only stored during the current session
                      </p>
                    </div>
                    <Link href="/">
                      <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                        Start Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Quick Track Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-center">Quick Track by Order ID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Have an Order ID? Track it directly
                </p>
                <Link href="/track-order">
                  <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                    <Search className="w-4 h-4 mr-2" />
                    Track by Order ID
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}