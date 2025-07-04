
import express, { type Request, type Response } from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { menuData } from "@shared/menuData";
import { storage } from "./storage";
import { insertOrderSchema, type OrderStatus } from "@shared/schema";
import Stripe from "stripe";

// Stripe is optional for development
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });
  console.log('Stripe configured for payments');
} else {
  console.log('Stripe not configured - payment features will be disabled for development');
}

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

// Order Management Routes

// Create a new order
router.post("/orders", async (req: Request, res: Response) => {
  try {
    const orderData = insertOrderSchema.parse(req.body);
    const newOrder = await storage.createOrder(orderData);
    
    // Broadcast the new order to all connected WebSocket clients
    broadcastOrderUpdate(newOrder);
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: 'Failed to create order' });
  }
});

// Get order by ID
router.get("/orders/:id", async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await storage.getOrder(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
router.patch("/orders/:id/status", async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;
    
    const updatedOrder = await storage.updateOrderStatus(orderId, status);
    
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Broadcast the order status update to all connected WebSocket clients
    broadcastOrderUpdate(updatedOrder);
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Get orders by phone number
router.get("/orders/phone/:phone", async (req: Request, res: Response) => {
  try {
    const phone = req.params.phone;
    const orders = await storage.getOrdersByPhone(phone);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by phone:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Cancel order
router.patch("/orders/:id/cancel", async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    
    // Get current order
    const currentOrder = await storage.getOrder(orderId);
    if (!currentOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if order can be cancelled
    const cancellableStatuses = ['placed', 'confirmed', 'preparing'];
    if (!cancellableStatuses.includes(currentOrder.status)) {
      return res.status(400).json({ 
        error: 'Order cannot be cancelled at this stage',
        currentStatus: currentOrder.status 
      });
    }
    
    // Update order status to cancelled
    const updatedOrder = await storage.updateOrderStatus(orderId, 'cancelled' as any);
    
    if (updatedOrder) {
      // Broadcast the order update
      broadcastOrderUpdate(updatedOrder);
      console.log(`Order ${orderId} cancelled successfully`);
      res.json({ 
        message: 'Order cancelled successfully', 
        order: updatedOrder 
      });
    } else {
      res.status(500).json({ error: 'Failed to cancel order' });
    }
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

// Get all orders (for admin)
router.get("/admin/orders", async (req: Request, res: Response) => {
  try {
    const orders = await storage.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Stripe payment route for one-time payments
router.post("/create-payment-intent", async (req: Request, res: Response) => {
  try {
    const { amount, customerName, items } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Valid amount is required" });
    }

    // If Stripe is not configured, return a mock response for development
    if (!stripe) {
      console.log('Stripe not configured, returning mock payment intent');
      res.json({ 
        clientSecret: "mock_client_secret_for_development",
        paymentIntentId: "mock_payment_intent_id"
      });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(amount) * 100), // Convert to paisa (cents)
      currency: "inr", // Indian Rupees
      metadata: {
        customerName: customerName || "Guest",
        items: JSON.stringify(items || [])
      }
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ 
      message: "Error creating payment intent: " + error.message 
    });
  }
});

// WebSocket broadcasting function
const clients = new Set<WebSocket>();

function broadcastOrderUpdate(order: any) {
  const message = JSON.stringify({
    type: 'orderUpdate',
    data: order
  });
  
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

export function registerRoutes(app: any) {
  app.use('/api', router);
  const server = createServer(app);
  
  // Add WebSocket server for real-time order updates
  const wss = new WebSocketServer({ server, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection established');
    clients.add(ws);
    
    ws.on('close', () => {
      console.log('WebSocket connection closed');
      clients.delete(ws);
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });
  });
  
  return server;
}

export default router;
