import { users, menuItems, type User, type InsertUser, type MenuItem } from "@shared/schema";
import { IStorage } from "./storage";

// Production-ready storage for Vercel deployment
export class VercelStorage implements IStorage {
  private menuData: MenuItem[] = [
    // Indian Dishes
    {
      id: 1,
      name: "Traditional Thali",
      description: "Complete Indian meal with curries, dal, rice & bread",
      price: "249.00",
      category: "indian",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 2,
      name: "Butter Chicken",
      description: "Creamy tomato-based chicken curry",
      price: "299.00",
      category: "indian",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 3,
      name: "Paneer Makhani",
      description: "Rich cottage cheese curry in tomato gravy",
      price: "269.00",
      category: "indian",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 4,
      name: "Biryani",
      description: "Aromatic basmati rice with chicken and spices",
      price: "279.00",
      category: "indian",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 5,
      name: "Dal Tadka",
      description: "Yellow lentils tempered with spices",
      price: "149.00",
      category: "indian",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 6,
      name: "Palak Paneer",
      description: "Cottage cheese in spinach gravy",
      price: "229.00",
      category: "indian",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 7,
      name: "Chicken Tikka Masala",
      description: "Grilled chicken in spiced tomato sauce",
      price: "289.00",
      category: "indian",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 8,
      name: "Rajma Chawal",
      description: "Kidney beans curry with steamed rice",
      price: "179.00",
      category: "indian",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 9,
      name: "Chole Bhature",
      description: "Spiced chickpeas with deep-fried bread",
      price: "169.00",
      category: "indian",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },

    // Chinese Dishes
    {
      id: 10,
      name: "Schezwan Noodles",
      description: "Spicy stir-fried noodles with vegetables",
      price: "199.00",
      category: "chinese",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 11,
      name: "Manchurian",
      description: "Deep-fried balls in tangy sauce",
      price: "179.00",
      category: "chinese",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 12,
      name: "Fried Rice",
      description: "Wok-tossed rice with vegetables and egg",
      price: "169.00",
      category: "chinese",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 13,
      name: "Double Egg Roll",
      description: "Crispy roll with double egg filling",
      price: "149.00",
      category: "chinese",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 14,
      name: "Chicken Roll",
      description: "Spiced chicken wrapped in soft bread",
      price: "189.00",
      category: "chinese",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 15,
      name: "Chicken Chilli",
      description: "Spicy chicken stir-fried with peppers",
      price: "229.00",
      category: "chinese",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 16,
      name: "Chicken Lollipop",
      description: "Juicy chicken drumettes in spicy coating",
      price: "249.00",
      category: "chinese",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 17,
      name: "Hakka Noodles",
      description: "Stir-fried noodles with fresh vegetables",
      price: "189.00",
      category: "chinese",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },

    // Italian Dishes
    {
      id: 18,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato, mozzarella, and basil",
      price: "299.00",
      category: "italian",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 19,
      name: "Pasta Alfredo",
      description: "Creamy white sauce pasta with herbs",
      price: "249.00",
      category: "italian",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc6d2c5f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 20,
      name: "Lasagna",
      description: "Layered pasta with meat sauce and cheese",
      price: "329.00",
      category: "italian",
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 21,
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs",
      price: "129.00",
      category: "italian",
      image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 22,
      name: "Risotto",
      description: "Creamy Italian rice with mushrooms",
      price: "279.00",
      category: "italian",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 23,
      name: "Penne Arrabbiata",
      description: "Spicy tomato pasta with red peppers",
      price: "229.00",
      category: "italian",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc6d2c5f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 24,
      name: "Bruschetta",
      description: "Toasted bread topped with tomatoes and basil",
      price: "149.00",
      category: "italian",
      image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 25,
      name: "Gnocchi",
      description: "Soft potato dumplings in tomato sauce",
      price: "259.00",
      category: "italian",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },

    // Desserts
    {
      id: 26,
      name: "Gulab Jamun",
      description: "Traditional Indian sweet in syrup",
      price: "89.00",
      category: "desserts",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 27,
      name: "Tiramisu",
      description: "Classic Italian coffee-flavored dessert",
      price: "219.00",
      category: "desserts",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 28,
      name: "Cheesecake",
      description: "Creamy New York style cheesecake",
      price: "199.00",
      category: "desserts",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 29,
      name: "Ice Cream Sundae",
      description: "Vanilla ice cream with chocolate sauce and nuts",
      price: "89.00",
      category: "desserts",
      image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 30,
      name: "Rasmalai",
      description: "Soft cottage cheese dumplings in sweet milk",
      price: "119.00",
      category: "desserts",
      image: "https://images.unsplash.com/photo-1601050690532-da0c6f21b2c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 31,
      name: "Chocolate Mousse",
      description: "Light and airy chocolate dessert",
      price: "149.00",
      category: "desserts",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },

    // South Indian Dishes
    {
      id: 32,
      name: "Masala Dosa",
      description: "Crispy crepe with spiced potato filling",
      price: "149.00",
      category: "south-indian",
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 33,
      name: "Idli Sambar",
      description: "Steamed rice cakes with lentil curry",
      price: "89.00",
      category: "south-indian",
      image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 34,
      name: "Rava Upma",
      description: "Semolina cooked with vegetables and spices",
      price: "79.00",
      category: "south-indian",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 35,
      name: "Mysore Pak",
      description: "Traditional South Indian sweet made with gram flour",
      price: "129.00",
      category: "south-indian",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 36,
      name: "Uttapam",
      description: "Thick pancake with onions and tomatoes",
      price: "119.00",
      category: "south-indian",
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 37,
      name: "Vada Sambar",
      description: "Fried lentil donuts served with sambar",
      price: "99.00",
      category: "south-indian",
      image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 38,
      name: "Pongal",
      description: "Rice and lentil dish cooked with black pepper",
      price: "109.00",
      category: "south-indian",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    },
    {
      id: 39,
      name: "Filter Coffee",
      description: "Authentic South Indian filter coffee",
      price: "59.00",
      category: "south-indian",
      image: "https://images.unsplash.com/photo-1559847844-d98a0601900a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      isAvailable: "true"
    }
  ];

  async getUser(id: number): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = { ...insertUser, id: 1 };
    return user;
  }

  async getMenuItems(): Promise<MenuItem[]> {
    console.log('VercelStorage: Returning', this.menuData.length, 'menu items');
    return this.menuData;
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    const items = this.menuData.filter(item => item.category === category);
    console.log(`VercelStorage: Returning ${items.length} items for category ${category}`);
    return items;
  }

  async getFeaturedItems(): Promise<MenuItem[]> {
    const categories = ['indian', 'chinese', 'italian', 'desserts', 'south-indian'];
    const featured: MenuItem[] = [];
    
    categories.forEach(category => {
      const categoryItems = this.menuData.filter(item => item.category === category);
      if (categoryItems.length > 0) {
        featured.push(categoryItems[0]);
      }
    });
    
    console.log('VercelStorage: Returning', featured.length, 'featured items');
    return featured;
  }
}