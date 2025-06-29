import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DishImageModal from "./dish-image-modal";
import type { MenuItem } from "@shared/schema";

export default function FeaturedDishes() {
  const { toast } = useToast();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: featuredItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/featured"],
  });

  const handleAddToCart = async (item: MenuItem) => {
    setAddingToCart(item.id);
    
    // Add to cart using global function
    if ((window as any).addToCart) {
      (window as any).addToCart(item);
    }
    
    setTimeout(() => {
      toast({
        title: "Added to Cart!",
        description: `${item.name} has been added to your cart.`,
      });
      setAddingToCart(null);
    }, 1000);
  };

  const handleImageClick = (dish: MenuItem) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleModalAddToCart = (dish: MenuItem) => {
    handleAddToCart(dish);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Signature Dishes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Signature Dishes</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most loved dishes crafted with authentic ingredients and traditional cooking methods
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="food-card-3d bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border-0">
                <div className="relative overflow-hidden image-container group cursor-pointer" onClick={() => handleImageClick(item)}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <Eye className="h-6 w-6 text-gray-700" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-medium text-gray-700">Preview</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">₹{typeof item.price === 'number' ? item.price : parseFloat(item.price)}</span>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={addingToCart === item.id}
                      className="button-3d bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                    >
                      {addingToCart === item.id ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Plus className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Dish Image Modal */}
        <DishImageModal
          dish={selectedDish}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleModalAddToCart}
        />
      </div>
    </section>
  );
}
