import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Utensils, Play, Pizza, Cake, Carrot, Coffee, ChefHat, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToMenu = () => {
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Floating Food Icons with 3D Effects */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 z-10"
      >
        <div className="food-card-3d p-4 bg-white/20 backdrop-blur-sm rounded-full">
          <Pizza className="w-8 h-8 text-accent drop-shadow-lg" />
        </div>
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 right-20 z-10"
      >
        <div className="food-card-3d p-4 bg-white/20 backdrop-blur-sm rounded-full">
          <Cake className="w-8 h-8 text-accent drop-shadow-lg" />
        </div>
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 left-20 z-10"
      >
        <div className="food-card-3d p-4 bg-white/20 backdrop-blur-sm rounded-full">
          <Carrot className="w-8 h-8 text-accent drop-shadow-lg" />
        </div>
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-60 left-1/4 z-10"
      >
        <div className="food-card-3d p-3 bg-white/20 backdrop-blur-sm rounded-full">
          <Coffee className="w-6 h-6 text-accent drop-shadow-lg" />
        </div>
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-40 right-1/4 z-10"
      >
        <div className="food-card-3d p-3 bg-white/20 backdrop-blur-sm rounded-full">
          <ChefHat className="w-6 h-6 text-accent drop-shadow-lg" />
        </div>
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-1/3 right-10 z-10"
      >
        <div className="food-card-3d p-2 bg-white/20 backdrop-blur-sm rounded-full">
          <Sparkles className="w-5 h-5 text-accent drop-shadow-lg" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Authentic Flavors
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block text-accent"
          >
            Delivered Fresh
          </motion.span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 opacity-90"
        >
          Experience the finest Indian, Chinese, Italian cuisine & delectable desserts from Bhopal's premium cloud kitchen
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToContact}
            className="button-3d order-btn success-gradient text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Utensils className="mr-2 h-5 w-5" />
            Order Now
          </Button>
          
          <Button
            onClick={scrollToMenu}
            variant="outline"
            className="button-3d border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300 bg-transparent"
          >
            <Play className="mr-2 h-5 w-5" />
            View Menu
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
