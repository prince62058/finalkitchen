import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, ShoppingCart, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Order by phone or WhatsApp",
      contact: "+91 XXXXX XXXXX",
      href: "tel:+91XXXXXXXXXX",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your queries",
      contact: "yashasveesisodiya1@gmail.com",
      href: "mailto:yashasveesisodiya1@gmail.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Cloud Kitchen Location",
      contact: "Bhopal, Madhya Pradesh",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h3>
          <p className="text-xl text-gray-600">Ready to order? We're here to serve you!</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300 border-0">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{method.title}</h4>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <a 
                      href={method.href} 
                      className="text-primary font-semibold hover:underline"
                    >
                      {method.contact}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center space-x-4"
        >
          <Button className="button-3d order-btn success-gradient text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Order Now
          </Button>
          
          <Button 
            variant="outline"
            className="button-3d border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
