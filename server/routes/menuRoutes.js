import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Get all menu items
router.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find({ isAvailable: true }).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Get menu items by category
router.get('/menu/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const items = await MenuItem.find({ 
      category: category, 
      isAvailable: true 
    }).sort({ name: 1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    res.status(500).json({ error: 'Failed to fetch menu items by category' });
  }
});

// Get featured items
router.get('/featured', async (req, res) => {
  try {
    const items = await MenuItem.find({ 
      featured: true, 
      isAvailable: true 
    }).sort({ category: 1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching featured items:', error);
    res.status(500).json({ error: 'Failed to fetch featured items' });
  }
});

// Create a new menu item (admin use)
router.post('/menu', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(400).json({ error: 'Failed to create menu item' });
  }
});

export default router;