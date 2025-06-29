import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';

dotenv.config();

const menuItems = [
  // Indian Dishes
  {
    name: "Traditional Thali",
    description: "Complete Indian meal with curries, dal, rice & bread",
    price: 349,
    category: "indian",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: true
  },
  {
    name: "Butter Chicken",
    description: "Creamy tomato-based chicken curry",
    price: 399,
    category: "indian",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with spiced chicken",
    price: 449,
    category: "indian",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Paneer Makhani",
    description: "Cottage cheese in rich tomato gravy",
    price: 329,
    category: "indian",
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked to perfection",
    price: 279,
    category: "indian",
    image: "https://images.unsplash.com/photo-1559847844-d98a0601900a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Tandoori Chicken",
    description: "Clay oven roasted chicken with Indian spices",
    price: 429,
    category: "indian",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Chole Bhature",
    description: "Spicy chickpeas with fluffy fried bread",
    price: 289,
    category: "indian",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Samosa Chaat",
    description: "Crispy samosas with tangy chutneys and yogurt",
    price: 199,
    category: "indian",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Mutton Curry",
    description: "Tender mutton in aromatic spice gravy",
    price: 499,
    category: "indian",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },

  // Chinese Dishes
  {
    name: "Veg Fried Rice",
    description: "Wok-tossed rice with fresh vegetables & sauces",
    price: 249,
    category: "chinese",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: true
  },
  {
    name: "Chicken Fried Rice",
    description: "Wok-tossed rice with tender chicken pieces",
    price: 299,
    category: "chinese",
    image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Veg Manchurian",
    description: "Crispy vegetable balls in tangy sauce",
    price: 279,
    category: "chinese",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Chicken Chowmein",
    description: "Stir-fried noodles with chicken and vegetables",
    price: 319,
    category: "chinese",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Sweet & Sour Chicken",
    description: "Crispy chicken in sweet and tangy sauce",
    price: 369,
    category: "chinese",
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Honey Chilli Chicken",
    description: "Crispy chicken tossed in honey chilli sauce",
    price: 389,
    category: "chinese",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Schezwan Noodles",
    description: "Spicy stir-fried noodles with vegetables",
    price: 289,
    category: "chinese",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Spring Rolls",
    description: "Crispy vegetable spring rolls with dipping sauce",
    price: 229,
    category: "chinese",
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },

  // Italian Dishes
  {
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh basil & mozzarella",
    price: 429,
    category: "italian",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: true
  },
  {
    name: "Pepperoni Pizza",
    description: "Classic pizza with pepperoni and cheese",
    price: 479,
    category: "italian",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta with herbs",
    price: 329,
    category: "italian",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Chicken Lasagna",
    description: "Layered pasta with chicken and cheese",
    price: 489,
    category: "italian",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Spaghetti Carbonara",
    description: "Classic pasta with eggs, cheese and pancetta",
    price: 389,
    category: "italian",
    image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Chicken Parmigiana",
    description: "Breaded chicken with marinara and mozzarella",
    price: 439,
    category: "italian",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Vegetarian Pizza",
    description: "Fresh vegetables with mozzarella and herbs",
    price: 399,
    category: "italian",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Penne Arrabbiata",
    description: "Spicy tomato pasta with garlic and herbs",
    price: 309,
    category: "italian",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },

  // Desserts
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center",
    price: 269,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: true
  },
  {
    name: "Chocolate Brownie",
    description: "Rich brownie with vanilla ice cream",
    price: 219,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1586985289906-406988974504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Gulab Jamun",
    description: "Traditional Indian sweet in syrup",
    price: 169,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Tiramisu",
    description: "Classic Italian coffee-flavored dessert",
    price: 319,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Cheesecake",
    description: "Creamy New York style cheesecake",
    price: 299,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with chocolate sauce and nuts",
    price: 189,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Rasmalai",
    description: "Soft cottage cheese dumplings in sweet milk",
    price: 219,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1601050690532-da0c6f21b2c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  },
  {
    name: "Chocolate Mousse",
    description: "Light and airy chocolate dessert",
    price: 249,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: true,
    featured: false
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yashasvee-kitchen');

    console.log('Connected to MongoDB');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert new menu items
    const savedItems = await MenuItem.insertMany(menuItems);
    console.log(`Seeded ${savedItems.length} menu items`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();