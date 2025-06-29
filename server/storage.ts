import { users, menuItems, type User, type InsertUser, type MenuItem, type InsertMenuItem } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getFeaturedItems(): Promise<MenuItem[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private menuItems: Map<number, MenuItem>;
  private currentUserId: number;
  private currentMenuId: number;

  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    this.currentUserId = 1;
    this.currentMenuId = 1;
    
    // Initialize with sample menu data
    this.initializeMenuData();
  }

  private initializeMenuData() {
    const sampleMenuItems: MenuItem[] = [
      // Indian Dishes
      {
        id: this.currentMenuId++,
        name: "Traditional Thali",
        description: "Complete Indian meal with curries, dal, rice & bread",
        price: "249.00",
        category: "indian",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry",
        price: "299.00",
        category: "indian",
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chicken Biryani",
        description: "Aromatic basmati rice with spiced chicken",
        price: "299.00",
        category: "indian",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Paneer Makhani",
        description: "Cottage cheese in rich tomato gravy",
        price: "189.00",
        category: "indian",
        image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Dal Makhani",
        description: "Creamy black lentils slow-cooked to perfection",
        price: "179.00",
        category: "indian",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Tandoori Chicken",
        description: "Clay oven roasted chicken with Indian spices",
        price: "299.00",
        category: "indian",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chole Bhature",
        description: "Spicy chickpeas with fluffy fried bread",
        price: "189.00",
        category: "indian",
        image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Samosa Chaat",
        description: "Crispy samosas with tangy chutneys and yogurt",
        price: "99.00",
        category: "indian",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Mutton Curry",
        description: "Tender mutton in aromatic spice gravy",
        price: "299.00",
        category: "indian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },

      // Chinese Dishes
      {
        id: this.currentMenuId++,
        name: "Veg Fried Rice",
        description: "Wok-tossed rice with fresh vegetables & sauces",
        price: "149.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chicken Fried Rice",
        description: "Wok-tossed rice with tender chicken pieces",
        price: "199.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Veg Manchurian",
        description: "Crispy vegetable balls in tangy sauce",
        price: "179.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chicken Chowmein",
        description: "Stir-fried noodles with chicken and vegetables",
        price: "199.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Double Egg Roll",
        description: "Crispy rolls filled with eggs and vegetables",
        price: "129.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chicken Roll",
        description: "Tender chicken wrapped in crispy roll",
        price: "179.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chicken Chilli",
        description: "Spicy chicken pieces tossed in chilli sauce",
        price: "239.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chicken Lollipop",
        description: "Tender chicken drumettes in spicy coating",
        price: "199.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1638096809226-5e2be4e47e20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Schezwan Noodles",
        description: "Spicy stir-fried noodles with vegetables",
        price: "189.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Spring Rolls",
        description: "Crispy vegetable spring rolls with dipping sauce",
        price: "129.00",
        category: "chinese",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },

      // Italian Dishes
      {
        id: this.currentMenuId++,
        name: "Margherita Pizza",
        description: "Classic Italian pizza with fresh basil & mozzarella",
        price: "299.00",
        category: "italian",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Pepperoni Pizza",
        description: "Classic pizza with pepperoni and cheese",
        price: "299.00",
        category: "italian",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Pasta Alfredo",
        description: "Creamy white sauce pasta with herbs",
        price: "229.00",
        category: "italian",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chicken Lasagna",
        description: "Layered pasta with chicken and cheese",
        price: "299.00",
        category: "italian",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Spaghetti Carbonara",
        description: "Classic pasta with eggs, cheese and pancetta",
        price: "289.00",
        category: "italian",
        image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chicken Parmigiana",
        description: "Breaded chicken with marinara and mozzarella",
        price: "289.00",
        category: "italian",
        image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Vegetarian Pizza",
        description: "Fresh vegetables with mozzarella and herbs",
        price: "269.00",
        category: "italian",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Penne Arrabbiata",
        description: "Spicy tomato pasta with garlic and herbs",
        price: "209.00",
        category: "italian",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },

      // Desserts
      {
        id: this.currentMenuId++,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center",
        price: "169.00",
        category: "desserts",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chocolate Brownie",
        description: "Rich brownie with vanilla ice cream",
        price: "119.00",
        category: "desserts",
        image: "https://images.unsplash.com/photo-1586985289906-406988974504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Gulab Jamun",
        description: "Traditional Indian sweet in syrup",
        price: "89.00",
        category: "desserts",
        image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Tiramisu",
        description: "Classic Italian coffee-flavored dessert",
        price: "219.00",
        category: "desserts",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Cheesecake",
        description: "Creamy New York style cheesecake",
        price: "199.00",
        category: "desserts",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Ice Cream Sundae",
        description: "Vanilla ice cream with chocolate sauce and nuts",
        price: "89.00",
        category: "desserts",
        image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Rasmalai",
        description: "Soft cottage cheese dumplings in sweet milk",
        price: "119.00",
        category: "desserts",
        image: "https://images.unsplash.com/photo-1601050690532-da0c6f21b2c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Chocolate Mousse",
        description: "Light and airy chocolate dessert",
        price: "149.00",
        category: "desserts",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },

      // South Indian Dishes
      {
        id: this.currentMenuId++,
        name: "Masala Dosa",
        description: "Crispy crepe with spiced potato filling",
        price: "149.00",
        category: "south-indian",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Idli Sambar",
        description: "Steamed rice cakes with lentil curry",
        price: "89.00",
        category: "south-indian",
        image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Rava Upma",
        description: "Semolina cooked with vegetables and spices",
        price: "79.00",
        category: "south-indian",
        image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Mysore Pak",
        description: "Traditional South Indian sweet made with gram flour",
        price: "129.00",
        category: "south-indian",
        image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Uttapam",
        description: "Thick pancake with onions and tomatoes",
        price: "119.00",
        category: "south-indian",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Vada Sambar",
        description: "Fried lentil donuts served with sambar",
        price: "99.00",
        category: "south-indian",
        image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Pongal",
        description: "Rice and lentil dish cooked with black pepper",
        price: "109.00",
        category: "south-indian",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      },
      {
        id: this.currentMenuId++,
        name: "Filter Coffee",
        description: "Authentic South Indian filter coffee",
        price: "59.00",
        category: "south-indian",
        image: "https://images.unsplash.com/photo-1559847844-d98a0601900a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isAvailable: "true"
      }
    ];

    sampleMenuItems.forEach(item => {
      this.menuItems.set(item.id, item);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      item => item.category === category
    );
  }

  async getFeaturedItems(): Promise<MenuItem[]> {
    // Return one item from each category as featured
    const categories = ['indian', 'chinese', 'italian', 'desserts', 'south-indian'];
    const featured: MenuItem[] = [];
    
    categories.forEach(category => {
      const categoryItems = Array.from(this.menuItems.values()).filter(
        item => item.category === category
      );
      if (categoryItems.length > 0) {
        featured.push(categoryItems[0]);
      }
    });
    
    return featured;
  }
}

export class DatabaseStorage implements IStorage {
  private isSeeded = false;

  async ensureSeeded() {
    if (this.isSeeded) return;
    
    try {
      console.log('Checking database connection...');
      const count = await db.select().from(menuItems).then(items => items.length);
      console.log(`Found ${count} menu items in database`);
      
      if (count === 0) {
        console.log('Database empty, seeding...');
        const { seedDatabase } = await import('./seed');
        await seedDatabase();
        console.log('Database seeding completed');
      }
      this.isSeeded = true;
    } catch (error) {
      console.error('Database connection or seeding failed:', error);
      throw error; // Propagate error instead of silently failing
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getMenuItems(): Promise<MenuItem[]> {
    try {
      await this.ensureSeeded();
      return await db.select().from(menuItems);
    } catch (error) {
      console.error('Database failed, using fallback data:', error);
      // Fallback to in-memory storage if database fails
      const memStorage = new MemStorage();
      return await memStorage.getMenuItems();
    }
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    try {
      await this.ensureSeeded();
      return await db.select().from(menuItems).where(eq(menuItems.category, category));
    } catch (error) {
      console.error('Database failed, using fallback data:', error);
      const memStorage = new MemStorage();
      return await memStorage.getMenuItemsByCategory(category);
    }
  }

  async getFeaturedItems(): Promise<MenuItem[]> {
    try {
      await this.ensureSeeded();
      // Return a featured item from each category
      const categories = ['indian', 'chinese', 'italian', 'desserts', 'south-indian'];
      const featured: MenuItem[] = [];
      
      for (const category of categories) {
        const [item] = await db.select().from(menuItems)
          .where(eq(menuItems.category, category))
          .limit(1);
        if (item) {
          featured.push(item);
        }
      }
      
      return featured;
    } catch (error) {
      console.error('Database failed, using fallback data:', error);
      const memStorage = new MemStorage();
      return await memStorage.getFeaturedItems();
    }
  }
}

import { VercelStorage } from './vercel-storage';

// Use production-ready storage based on environment
export const storage = process.env.NODE_ENV === 'production' 
  ? new VercelStorage()
  : new DatabaseStorage();
