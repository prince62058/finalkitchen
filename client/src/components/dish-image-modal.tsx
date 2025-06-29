import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Heart, Share2, ZoomIn, Star } from "lucide-react";
import type { MenuItem } from "@shared/schema";

interface DishImageModalProps {
  dish: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (dish: MenuItem) => void;
}

export default function DishImageModal({ dish, isOpen, onClose, onAddToCart }: DishImageModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!dish) return null;

  const handleAddToCart = () => {
    onAddToCart(dish);
    onClose();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'indian': return 'bg-orange-100 text-orange-800';
      case 'chinese': return 'bg-red-100 text-red-800';
      case 'italian': return 'bg-green-100 text-green-800';
      case 'desserts': return 'bg-pink-100 text-pink-800';
      case 'south-indian': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'south-indian': return 'South Indian';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Image Section */}
          <div className="relative bg-gray-100 flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
            <AnimatePresence>
              {!imageLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-200"
                >
                  <div className="animate-pulse">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.img
              src={dish.image}
              alt={dish.name}
              className={`w-full h-full object-cover cursor-zoom-in transition-all duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              onLoad={() => setImageLoaded(true)}
              onClick={() => setIsZoomed(!isZoomed)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.9 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Image Controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/90 hover:bg-white"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className={`bg-white/90 hover:bg-white ${isFavorite ? 'text-red-500' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/90 hover:bg-white"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge className={`${getCategoryColor(dish.category)} border-0 font-semibold`}>
                {getCategoryName(dish.category)}
              </Badge>
            </div>

            {/* Zoom Indicator */}
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm"
              >
                Click to zoom out
              </motion.div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <DialogHeader className="space-y-4 mb-6">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {dish.name}
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <DialogDescription className="text-gray-600">
                  View detailed information about {dish.name} including ingredients, preparation time, and nutritional details.
                </DialogDescription>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.2 rating)</span>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed">{dish.description}</p>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Prep Time</h5>
                    <p className="text-sm text-gray-600">15-20 mins</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Serves</h5>
                    <p className="text-sm text-gray-600">1-2 people</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Spice Level</h5>
                    <p className="text-sm text-gray-600">
                      {dish.category === 'chinese' ? 'Medium' : 
                       dish.category === 'indian' || dish.category === 'south-indian' ? 'Mild to Medium' : 
                       'Mild'}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Type</h5>
                    <p className="text-sm text-gray-600">
                      {dish.name.toLowerCase().includes('chicken') || dish.name.toLowerCase().includes('mutton') ? 'Non-Veg' : 'Vegetarian'}
                    </p>
                  </div>
                </div>

                {/* Ingredients Highlight */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {dish.category === 'indian' && (
                      <>
                        <Badge variant="outline">Aromatic Spices</Badge>
                        <Badge variant="outline">Fresh Herbs</Badge>
                        <Badge variant="outline">Premium Oil</Badge>
                      </>
                    )}
                    {dish.category === 'chinese' && (
                      <>
                        <Badge variant="outline">Soy Sauce</Badge>
                        <Badge variant="outline">Fresh Vegetables</Badge>
                        <Badge variant="outline">Sesame Oil</Badge>
                      </>
                    )}
                    {dish.category === 'italian' && (
                      <>
                        <Badge variant="outline">Italian Herbs</Badge>
                        <Badge variant="outline">Fresh Cheese</Badge>
                        <Badge variant="outline">Olive Oil</Badge>
                      </>
                    )}
                    {dish.category === 'south-indian' && (
                      <>
                        <Badge variant="outline">Coconut</Badge>
                        <Badge variant="outline">Curry Leaves</Badge>
                        <Badge variant="outline">Traditional Spices</Badge>
                      </>
                    )}
                    {dish.category === 'desserts' && (
                      <>
                        <Badge variant="outline">Premium Chocolate</Badge>
                        <Badge variant="outline">Fresh Cream</Badge>
                        <Badge variant="outline">Natural Sweeteners</Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="border-t pt-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-primary">₹{dish.price}</span>
                  <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-green-700 bg-green-100">
                    Available
                  </Badge>
                </div>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="w-full button-3d success-gradient text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}