import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carrot, Coffee, Pizza, Cake, Utensils, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DishImageModal from "./dish-image-modal";
import type { MenuItem } from "@shared/schema";

const categories = [
  { id: "indian", name: "Indian", icon: Carrot, color: "orange", count: "9+" },
  { id: "chinese", name: "Chinese", icon: Coffee, color: "red", count: "10+" },
  { id: "italian", name: "Italian", icon: Pizza, color: "green", count: "8+" },
  { id: "desserts", name: "Desserts", icon: Cake, color: "pink", count: "8+" },
  { id: "south-indian", name: "South Indian", icon: Utensils, color: "purple", count: "8+" },
];

export default function MenuSection() {
  const { toast } = useToast();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("indian");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allMenuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
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

  const getCategoryItems = (category: string) => {
    return allMenuItems?.filter(item => item.category === category) || [];
  };

  if (isLoading) {
    return (
      <section id="menu" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Complete Menu</h3>
          </div>
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-60"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Complete Menu</h3>
          <p className="text-xl text-gray-600">Explore our diverse collection of authentic dishes from around the world</p>
        </motion.div>
        
        {/* Menu Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const itemCount = getCategoryItems(category.id).length;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="menu-category-3d bg-white rounded-2xl shadow-lg p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-xl border-0">
                  <CardContent className="p-0">
                    <div className={`w-20 h-20 bg-${category.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 text-${category.color}-600`} />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h4>
                    <p className="text-gray-600 mb-4">
                      {category.id === "indian" && "Traditional curries, biryanis & tandoor specialties"}
                      {category.id === "chinese" && "Stir-fries, noodles & authentic Asian flavors"}
                      {category.id === "italian" && "Pizzas, pastas & Mediterranean delights"}
                      {category.id === "desserts" && "Cakes, sweets & delightful treats"}
                      {category.id === "south-indian" && "Dosas, idlis & authentic South Indian flavors"}
                    </p>
                    <span className="text-primary font-semibold">{itemCount}+ Items</span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Menu Items Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm font-medium">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {getCategoryItems(category.id).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="food-card-3d bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-0">
                      <div className="relative image-container group cursor-pointer" onClick={() => handleImageClick(item)}>
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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
                        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs font-medium text-gray-700">View Details</span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h5 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h5>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-primary">₹{typeof item.price === 'number' ? item.price : parseFloat(item.price)}</span>
                          <Button
                            onClick={() => handleAddToCart(item)}
                            disabled={addingToCart === item.id}
                            className="button-3d success-gradient text-white px-4 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300"
                          >
                            {addingToCart === item.id ? "Adding..." : "Add to Cart"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button className="button-3d order-btn success-gradient text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <Coffee className="mr-2 h-5 w-5" />
            View Complete Menu
          </Button>
        </motion.div>

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
