import { motion } from "framer-motion";
import { Utensils, Facebook, Instagram, Twitter, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: MessageCircle, href: "#", label: "WhatsApp" },
  ];

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const menuCategories = [
    { label: "Indian Cuisine", href: "#menu" },
    { label: "Chinese Dishes", href: "#menu" },
    { label: "Italian Favorites", href: "#menu" },
    { label: "Cakes & Desserts", href: "#menu" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "Bhopal, Madhya Pradesh" },
    { icon: Phone, text: "+91 XXXXX XXXXX" },
    { icon: Mail, text: "yashasveesisodiya1@gmail.com" },
    { icon: Clock, text: "11:00 AM - 11:00 PM" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h5 className="text-2xl font-bold mb-4 flex items-center">
              <Utensils className="mr-2 text-primary" />
              Yashavee Cloud Kitchen
            </h5>
            <p className="text-gray-400 mb-4">
              Authentic flavors delivered fresh from our cloud kitchen in Bhopal.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Menu Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h6 className="text-lg font-semibold mb-4">Menu Categories</h6>
            <ul className="space-y-2">
              {menuCategories.map((category) => (
                <li key={category.label}>
                  <button
                    onClick={() => scrollToSection(category.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h6 className="text-lg font-semibold mb-4">Contact Info</h6>
            <ul className="space-y-2">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <li key={index} className="text-gray-400 flex items-center">
                    <IconComponent className="w-4 h-4 mr-2" />
                    {info.text}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">
            © 2024 Yashasvee Sisodiya Cloud Kitchen. All rights reserved. | Made with ❤️ in Bhopal
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
