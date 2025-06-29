import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all menu items
  app.get("/api/menu", async (req, res) => {
    try {
      const items = await storage.getMenuItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  // Get menu items by category
  app.get("/api/menu/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getMenuItemsByCategory(category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu items by category" });
    }
  });

  // Get featured items
  app.get("/api/featured", async (req, res) => {
    try {
      const items = await storage.getFeaturedItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured items" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
