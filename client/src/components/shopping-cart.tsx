import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import OrderCheckout from "./order-checkout";
import OrderTracking from "./order-tracking";
import type { MenuItem } from "@shared/schema";

interface CartItem extends MenuItem {
  quantity: number;
}

interface ShoppingCartProps {
  className?: string;
}

export default function ShoppingCartComponent({ className = "" }: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [itemAddedAnimation, setItemAddedAnimation] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<number>(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart function that can be called from other components
  const addToCart = (item: MenuItem) => {
    console.log('Adding to cart:', item.name);
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        const updated = prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        console.log('Updated cart with existing item:', updated);
        return updated;
      } else {
        const newCart = [...prev, { ...item, quantity: 1 }];
        console.log('Added new item to cart:', newCart);
        return newCart;
      }
    });

    // Trigger animation
    setItemAddedAnimation(item.id);
    setTimeout(() => setItemAddedAnimation(null), 1000);
  };

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  
  // Debug logging (remove in production)
  // console.log('Cart items:', cartItems);
  // console.log('Total items:', totalItems);

  // Make addToCart function available globally
  useEffect(() => {
    (window as any).addToCart = addToCart;
    return () => {
      delete (window as any).addToCart;
    };
  }, [addToCart]);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`relative ${className} bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300`}
          >
            <motion.div
              animate={itemAddedAnimation ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart className="h-5 w-5" />
            </motion.div>
            <AnimatePresence mode="wait">
              {totalItems > 0 && (
                <motion.div
                  key={totalItems}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2"
                >
                  <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Your Cart</span>
              {cartItems.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex-1 overflow-y-auto max-h-[calc(100vh-300px)]">
            <div className="space-y-4 pr-2">
              <AnimatePresence>
                {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Add some delicious items to get started!</p>
                </motion.div>
              ) : (
                cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="relative overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-600 truncate">{item.description}</p>
                            <p className="font-bold text-primary">₹{item.price}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-lg">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
              </AnimatePresence>
            </div>
          </div>

          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 border-t pt-4 space-y-4"
            >
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total ({totalItems} items)</span>
                <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full button-3d success-gradient text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                size="lg"
                onClick={() => {
                  setIsOpen(false);
                  setShowCheckout(true);
                }}
              >
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </motion.div>
          )}
        </SheetContent>
      </Sheet>

      {/* Floating Cart Button for Mobile */}
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="button-3d success-gradient text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
            size="lg"
          >
            <ShoppingCart className="h-6 w-6 mr-2" />
            <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
            <Badge className="ml-2 bg-white text-primary">
              {totalItems}
            </Badge>
          </Button>
        </motion.div>
      )}

      {/* Order Checkout Modal */}
      <OrderCheckout
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        totalAmount={totalPrice}
        onOrderPlaced={(orderId) => {
          setCurrentOrderId(orderId);
          setCartItems([]); // Clear cart after order
          setShowCheckout(false);
          setShowTracking(true);
        }}
      />

      {/* Order Tracking Modal */}
      <OrderTracking
        isOpen={showTracking}
        onClose={() => setShowTracking(false)}
        orderId={currentOrderId}
      />
    </>
  );
}