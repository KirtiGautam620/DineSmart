// server.js
const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  res.status(200).json({ success: true });
});

// Add favorite
app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const fav = await prisma.favorites.upsert({
      where: {
        userId_recipeId: { 
          userId: parseInt(userId), 
          recipeId: parseInt(recipeId) 
        }
      },
      update: {}, // Do nothing if favorite already exists
      create: { 
        userId: parseInt(userId), 
        recipeId: parseInt(recipeId), 
        title, 
        image, 
        cookTime, 
        servings 
      }
    });

    res.status(201).json({ success: true, fav });

  } catch (err) {
    console.error("POST /api/favorites error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get favorites by userId
app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log("Fetching favorites for userId:", userId);

    const favorites = await prisma.favorites.findMany({
      where: { userId }
    });

    console.log(`Found ${favorites.length} favorites`);
    res.status(200).json({ favorites });

  } catch (err) {
    console.error("GET /api/favorites/:userId error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete favorite by userId and recipeId
app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const recipeId = parseInt(req.params.recipeId);

    const del = await prisma.favorites.deleteMany({
      where: { userId, recipeId }
    });

    if (del.count === 0) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.status(200).json({ success: true, deleted: del.count });

  } catch (err) {
    console.error("DELETE /api/favorites/:userId/:recipeId error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
