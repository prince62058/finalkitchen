import { db } from "./db";
import { menuItems, type InsertMenuItem } from "@shared/schema";
import { menuData } from "@shared/menuData";

// Convert menuData to InsertMenuItem format (remove id field)
const sampleMenuItems: InsertMenuItem[] = menuData.map(item => ({
  name: item.name,
  description: item.description,
  price: item.price,
  category: item.category,
  image: item.image,
  isAvailable: item.isAvailable
}));

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
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => {
    console.log("Database seeding complete!");
    process.exit(0);
  }).catch((error) => {
    console.error("Database seeding failed:", error);
    process.exit(1);
  });
}