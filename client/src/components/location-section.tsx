import { motion } from "framer-motion";
import { MapPin, Clock, Utensils } from "lucide-react";

export default function LocationSection() {
  const locationFeatures = [
    {
      icon: MapPin,
      title: "Delivery Areas",
      description: "All over Bhopal - Complete city coverage",
    },
    {
      icon: Clock,
      title: "Delivery Time",
      description: "30-45 minutes across Bhopal",
    },
    {
      icon: Utensils,
      title: "Operating Hours",
      description: "Daily 11:00 AM - 11:00 PM",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Location in Bhopal</h3>
          <p className="text-xl text-gray-600">Proudly serving the beautiful city of lakes</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Bhopal City View" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Serving Bhopal with Love</h4>
            <p className="text-gray-600 mb-6">
              Based in the heart of Madhya Pradesh's capital, we understand the diverse culinary preferences of Bhopal's food lovers. Our cloud kitchen is strategically located to ensure quick delivery across the city.
            </p>
            
            <div className="space-y-4">
              {locationFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">{feature.title}</h5>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
