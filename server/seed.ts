import { db } from "./db";
import { menuItems, type InsertMenuItem } from "@shared/schema";

const sampleMenuItems: InsertMenuItem[] = [
  // Indian Dishes
  {
    name: "Traditional Thali",
    description: "Complete Indian meal with curries, dal, rice & bread",
    price: "249.00",
    category: "indian",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Butter Chicken",
    description: "Creamy tomato-based chicken curry",
    price: "299.00",
    category: "indian",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Paneer Makhani",
    description: "Rich cottage cheese curry in tomato gravy",
    price: "269.00",
    category: "indian",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Biryani",
    description: "Aromatic basmati rice with chicken and spices",
    price: "279.00",
    category: "indian",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Dal Tadka",
    description: "Yellow lentils tempered with spices",
    price: "149.00",
    category: "indian",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Palak Paneer",
    description: "Cottage cheese in spinach gravy",
    price: "229.00",
    category: "indian",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Chicken Tikka Masala",
    description: "Grilled chicken in spiced tomato sauce",
    price: "289.00",
    category: "indian",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Rajma Chawal",
    description: "Kidney beans curry with steamed rice",
    price: "179.00",
    category: "indian",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Chole Bhature",
    description: "Spiced chickpeas with deep-fried bread",
    price: "169.00",
    category: "indian",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },

  // Chinese Dishes
  {
    name: "Schezwan Noodles",
    description: "Spicy stir-fried noodles with vegetables",
    price: "199.00",
    category: "chinese",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Manchurian",
    description: "Deep-fried balls in tangy sauce",
    price: "179.00",
    category: "chinese",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Fried Rice",
    description: "Wok-tossed rice with vegetables and egg",
    price: "169.00",
    category: "chinese",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Double Egg Roll",
    description: "Crispy roll with double egg filling",
    price: "149.00",
    category: "chinese",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Chicken Roll",
    description: "Spiced chicken wrapped in soft bread",
    price: "189.00",
    category: "chinese",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Chicken Chilli",
    description: "Spicy chicken stir-fried with peppers",
    price: "229.00",
    category: "chinese",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Chicken Lollipop",
    description: "Juicy chicken drumettes in spicy coating",
    price: "249.00",
    category: "chinese",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Hakka Noodles",
    description: "Stir-fried noodles with fresh vegetables",
    price: "189.00",
    category: "chinese",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },

  // Italian Dishes
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    price: "299.00",
    category: "italian",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta with herbs",
    price: "249.00",
    category: "italian",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc6d2c5f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Lasagna",
    description: "Layered pasta with meat sauce and cheese",
    price: "329.00",
    category: "italian",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Garlic Bread",
    description: "Toasted bread with garlic butter and herbs",
    price: "129.00",
    category: "italian",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Risotto",
    description: "Creamy Italian rice with mushrooms",
    price: "279.00",
    category: "italian",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Penne Arrabbiata",
    description: "Spicy tomato pasta with red peppers",
    price: "229.00",
    category: "italian",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc6d2c5f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Bruschetta",
    description: "Toasted bread topped with tomatoes and basil",
    price: "149.00",
    category: "italian",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Gnocchi",
    description: "Soft potato dumplings in tomato sauce",
    price: "259.00",
    category: "italian",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },

  // Desserts
  {
    name: "Gulab Jamun",
    description: "Traditional Indian sweet in syrup",
    price: "89.00",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Tiramisu",
    description: "Classic Italian coffee-flavored dessert",
    price: "219.00",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Cheesecake",
    description: "Creamy New York style cheesecake",
    price: "199.00",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with chocolate sauce and nuts",
    price: "89.00",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Rasmalai",
    description: "Soft cottage cheese dumplings in sweet milk",
    price: "119.00",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1601050690532-da0c6f21b2c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Chocolate Mousse",
    description: "Light and airy chocolate dessert",
    price: "149.00",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },

  // South Indian Dishes
  {
    name: "Masala Dosa",
    description: "Crispy crepe with spiced potato filling",
    price: "149.00",
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Idli Sambar",
    description: "Steamed rice cakes with lentil curry",
    price: "89.00",
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Rava Upma",
    description: "Semolina cooked with vegetables and spices",
    price: "79.00",
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Mysore Pak",
    description: "Traditional South Indian sweet made with gram flour",
    price: "129.00",
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Uttapam",
    description: "Thick pancake with onions and tomatoes",
    price: "119.00",
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Vada Sambar",
    description: "Fried lentil donuts served with sambar",
    price: "99.00",
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Pongal",
    description: "Rice and lentil dish cooked with black pepper",
    price: "109.00",
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  },
  {
    name: "Filter Coffee",
    description: "Authentic South Indian filter coffee",
    price: "59.00",
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1559847844-d98a0601900a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isAvailable: "true"
  }
];

export async function seedDatabase() {
  console.log("Seeding database with menu items...");
  
  try {
    // Clear existing menu items
    await db.delete(menuItems);
    
    // Insert all menu items
    await db.insert(menuItems).values(sampleMenuItems);
    
    console.log(`Successfully seeded ${sampleMenuItems.length} menu items!`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run if called directly
seedDatabase().then(() => {
  console.log("Database seeding complete!");
  process.exit(0);
}).catch((error) => {
  console.error("Database seeding failed:", error);
  process.exit(1);
});

export { seedDatabase };