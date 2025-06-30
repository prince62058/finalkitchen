import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type OrderItem } from "@shared/schema";

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface OrderCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  onOrderPlaced: (orderId: number) => void;
}

export default function OrderCheckout({ 
  isOpen, 
  onClose, 
  cartItems, 
  totalAmount, 
  onOrderPlaced 
}: OrderCheckoutProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${data.id} has been placed. Estimated delivery: ${data.estimatedTime} minutes.`,
      });
      onOrderPlaced(data.id);
      onClose();
      // Clear form
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
      console.error("Order creation failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !customerPhone || !customerAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    // Convert cart items to order items format
    const orderItems: OrderItem[] = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Calculate estimated time based on number of items (15-45 minutes)
    const estimatedTime = Math.max(15, Math.min(45, cartItems.length * 5 + 15));

    const orderData = {
      customerName,
      customerPhone,
      customerAddress,
      items: orderItems,
      totalAmount: totalAmount.toString(),
      estimatedTime,
      status: "placed",
    };

    createOrderMutation.mutate(orderData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-600">
            Complete Your Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-medium">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-600">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone Number *</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="customerAddress">Delivery Address *</Label>
              <Textarea
                id="customerAddress"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Enter your complete delivery address"
                rows={3}
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createOrderMutation.isPending}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                {createOrderMutation.isPending ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}