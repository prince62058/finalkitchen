
import express, { type Request, type Response } from "express";
import { createServer } from "http";
import { menuData } from "@shared/menuData";

const router = express.Router();

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isAvailable: string;
}

// Get all menu items
router.get("/menu", async (req: Request, res: Response) => {
  try {
    const items = menuData.filter(item => item.isAvailable === "true");
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Get menu items by category
router.get("/menu/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const items = menuData.filter(item => 
      item.category === category && item.isAvailable === "true"
    );
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    res.status(500).json({ error: 'Failed to fetch menu items by category' });
  }
});

// Get featured items (one from each category)
router.get("/featured", async (req: Request, res: Response) => {
  try {
    const categories = ['indian', 'chinese', 'italian', 'desserts', 'south-indian'];
    const featured: MenuItem[] = [];
    
    categories.forEach(category => {
      const categoryItems = menuData.filter(item => 
        item.category === category && item.isAvailable === "true"
      );
      if (categoryItems.length > 0) {
        featured.push(categoryItems[0]);
      }
    });
    
    res.json(featured);
  } catch (error) {
    console.error('Error fetching featured items:', error);
    res.status(500).json({ error: 'Failed to fetch featured items' });
  }
});

export function registerRoutes(app: any) {
  app.use('/api', router);
  return createServer(app);
}

export default router;
