import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { type Order, type OrderStatus } from "@shared/schema";
import { Clock, Package, User, MapPin } from "lucide-react";

const statusOptions: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'placed', label: 'Order Placed', color: 'bg-green-100 text-green-800' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { value: 'preparing', label: 'Preparing', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'cooking', label: 'Cooking', color: 'bg-orange-100 text-orange-800' },
  { value: 'ready', label: 'Ready', color: 'bg-purple-100 text-purple-800' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

export default function AdminOrders() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all orders
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['/api/admin/orders'],
  });

  // Update order status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: OrderStatus }) => {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      return response.json();
    },
    onSuccess: (updatedOrder) => {
      toast({
        title: "Order Status Updated",
        description: `Order #${updatedOrder.id} status updated to: ${statusOptions.find(s => s.value === updatedOrder.status)?.label}`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
      console.error('Status update failed:', error);
    },
  });

  const handleStatusUpdate = (orderId: number, newStatus: OrderStatus) => {
    updateStatusMutation.mutate({ orderId, status: newStatus });
  };

  const getStatusColor = (status: OrderStatus) => {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Package className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Manage and update order statuses in real-time</p>
          </div>

          {orders.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                <p className="text-gray-500">Orders will appear here once customers start placing them.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-orange-600">
                        Order #{order.id}
                      </CardTitle>
                      <Badge className={`${getStatusColor(order.status as OrderStatus)}`}>
                        {statusOptions.find(s => s.value === order.status)?.label || order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Customer Info */}
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <User className="w-4 h-4 mr-2" />
                          <span className="font-medium">Customer</span>
                        </div>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerPhone}</p>
                      </div>

                      {/* Delivery Info */}
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="font-medium">Address</span>
                        </div>
                        <p className="text-sm text-gray-600">{order.customerAddress}</p>
                      </div>

                      {/* Time Info */}
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-medium">Estimated Time</span>
                        </div>
                        <p className="text-sm text-gray-600">{order.estimatedTime} minutes</p>
                        <p className="text-xs text-gray-500">
                          Ordered: {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Order Items</h4>
                      <div className="space-y-1">
                        {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-orange-600">₹{parseFloat(order.totalAmount).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Update */}
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-700">Update Status:</span>
                        <Select
                          value={order.status}
                          onValueChange={(value: OrderStatus) => handleStatusUpdate(order.id, value)}
                          disabled={updateStatusMutation.isPending}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {updateStatusMutation.isPending && (
                          <div className="text-sm text-gray-500">Updating...</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}