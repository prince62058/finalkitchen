import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, ShoppingCart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
// Stripe is optional for development mode
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface CheckoutData {
  cartItems: CartItem[];
  totalAmount: number;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
}

// Development-only checkout form for when Stripe is not configured
const DevCheckoutForm = ({ 
  checkoutData, 
  onPaymentSuccess 
}: { 
  checkoutData: CheckoutData;
  onPaymentSuccess: (orderId: number) => void;
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create the order directly (mock payment success)
      const orderData = {
        customerName: checkoutData.customerDetails.name,
        customerPhone: checkoutData.customerDetails.phone,
        customerAddress: checkoutData.customerDetails.address,
        items: checkoutData.cartItems,
        totalAmount: checkoutData.totalAmount.toString(),
        estimatedTime: 30,
        status: "placed" as const
      };

      const response = await apiRequest("POST", "/api/orders", orderData);
      const order = await response.json();

      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed (development mode).",
      });

      onPaymentSuccess(order.id);
    } catch (error: any) {
      toast({
        title: "Order Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <CreditCard className="w-6 h-6 mr-2 text-primary" />
            Development Mode - Order Placement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              Development Mode: Payment processing is simulated. 
              Your order will be placed without actual payment.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        disabled={isProcessing}
        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            Processing Order...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Place Order - ₹{checkoutData.totalAmount.toFixed(2)}
          </>
        )}
      </Button>
    </motion.form>
  );
};

const CheckoutForm = ({ 
  checkoutData, 
  onPaymentSuccess 
}: { 
  checkoutData: CheckoutData;
  onPaymentSuccess: (orderId: number) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Payment succeeded, create the order
        const orderData = {
          customerName: checkoutData.customerDetails.name,
          customerPhone: checkoutData.customerDetails.phone,
          customerAddress: checkoutData.customerDetails.address,
          items: checkoutData.cartItems,
          totalAmount: checkoutData.totalAmount.toString(),
          estimatedTime: 30,
          status: "placed" as const
        };

        const response = await apiRequest("POST", "/api/orders", orderData);
        const order = await response.json();

        toast({
          title: "Payment Successful!",
          description: "Your order has been placed successfully.",
        });

        onPaymentSuccess(order.id);
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <CreditCard className="w-6 h-6 mr-2 text-primary" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentElement 
            options={{
              layout: "tabs"
            }}
          />
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Pay ₹{checkoutData.totalAmount.toFixed(2)}
          </>
        )}
      </Button>
    </motion.form>
  );
};

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    // Get checkout data from localStorage
    const savedCheckoutData = localStorage.getItem('checkoutData');
    if (!savedCheckoutData) {
      setLocation('/');
      return;
    }

    const data: CheckoutData = JSON.parse(savedCheckoutData);
    setCheckoutData(data);

    // Create PaymentIntent
    apiRequest("POST", "/api/create-payment-intent", {
      amount: data.totalAmount,
      customerName: data.customerDetails.name,
      items: data.cartItems
    })
      .then((res) => res.json())
      .then((paymentData) => {
        setClientSecret(paymentData.clientSecret);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
        setLocation('/');
      });
  }, [setLocation]);

  const handlePaymentSuccess = (orderId: number) => {
    // Clear cart and checkout data
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutData');
    
    // Redirect to live tracking page with order ID
    setLocation(`/live-tracking?orderId=${orderId}`);
  };

  // For development mode (no Stripe), we don't need to wait for clientSecret
  const isDevMode = !import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  
  if (!checkoutData || (!isDevMode && !clientSecret)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">
            {isDevMode ? "Loading checkout..." : "Preparing checkout..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/')}
              className="text-gray-600 hover:text-orange-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <ShoppingCart className="w-6 h-6 mr-2 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Customer Details */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Delivery Details</h3>
                    <p className="text-sm text-gray-600">
                      <strong>Name:</strong> {checkoutData.customerDetails.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Phone:</strong> {checkoutData.customerDetails.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Address:</strong> {checkoutData.customerDetails.address}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {checkoutData.cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">×{item.quantity}</Badge>
                          <span className="font-semibold">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{checkoutData.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {isDevMode ? (
                <DevCheckoutForm 
                  checkoutData={checkoutData}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              ) : (
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#f97316',
                      }
                    }
                  }}
                >
                  <CheckoutForm 
                    checkoutData={checkoutData}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </Elements>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}