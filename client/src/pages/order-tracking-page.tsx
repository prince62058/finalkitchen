import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderTracking from "@/components/order-tracking";
import { Search, Package, ArrowLeft, Home } from "lucide-react";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [showTracking, setShowTracking] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState(0);

  const handleTrackOrder = () => {
    const id = parseInt(orderId);
    if (id && id > 0) {
      setTrackingOrderId(id);
      setShowTracking(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back to Home Button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="text-gray-600 hover:text-orange-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <Package className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-gray-600">Enter your order ID to get real-time updates</p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-orange-600">Order Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="orderId"
                    type="number"
                    placeholder="Enter your order ID (e.g., 12345)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleTrackOrder}
                    disabled={!orderId || parseInt(orderId) <= 0}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Track
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">How to find your Order ID?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Check your order confirmation message</li>
                  <li>• Look for the order number in your SMS or email</li>
                  <li>• Contact us at +91-XXXXXXXXXX if you need help</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Need help? Contact our support team for assistance with your order.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order Tracking Modal */}
      <OrderTracking
        isOpen={showTracking}
        onClose={() => setShowTracking(false)}
        orderId={trackingOrderId}
      />
    </div>
  );
}