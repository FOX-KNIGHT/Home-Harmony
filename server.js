import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { neon } from "@neondatabase/serverless";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
const port = 5001;

// Initialize Neon Database
const sql = neon(process.env.DATABASE_URL);

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Test route to check server is running
app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

// Test database connection
app.get("/test", async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.json({
      message: "Database connected successfully!",
      version: version
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      error: "Database connection failed",
      details: error.message
    });
  }
});

// Setup database table (run this once)
app.get("/setup", async (req, res) => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    res.json({
      message: "Users table created successfully!"
    });
  } catch (error) {
    console.error("Table creation error:", error);
    res.status(500).json({
      error: "Failed to create table",
      details: error.message
    });
  }
});

// Get all users (for testing)
app.get("/api/users", async (req, res) => {
  try {
    const users = await sql`SELECT id, name, email, created_at FROM users ORDER BY created_at DESC`;
    res.json({
      users: users,
      count: users.length
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      error: "Failed to fetch users",
      details: error.message
    });
  }
});

// Regular login route
app.post("/api/login", async (req, res) => {
  const { name, email } = req.body;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required."
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Please provide a valid email address."
    });
  }

  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res.status(200).json({
        message: `Welcome back, ${name}!`,
        user: {
          id: existingUser[0].id,
          name: existingUser[0].name,
          email: existingUser[0].email
        },
        isExisting: true
      });
    }

    // Insert new user
    const newUser = await sql`
      INSERT INTO users(name, email) 
      VALUES(${name}, ${email}) 
      RETURNING id, name, email, created_at
    `;

    res.status(201).json({
      message: `Welcome, ${name}! Account created successfully.`,
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email
      },
      isExisting: false
    });

  } catch (error) {
    console.error("Login error:", error);

    if (error.message.includes('duplicate key')) {
      res.status(409).json({
        error: "User with this email already exists."
      });
    } else {
      res.status(500).json({
        error: "Error processing login request.",
        details: error.message
      });
    }
  }
});

// Google OAuth login route
app.post("/api/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: "Google token is required"
      });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture, sub } = payload;

    if (!name || !email) {
      return res.status(400).json({
        error: "Unable to get user information from Google"
      });
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res.status(200).json({
        message: `Welcome back, ${name}!`,
        user: {
          id: existingUser[0].id,
          name: existingUser[0].name,
          email: existingUser[0].email,
          picture: picture
        },
        isExisting: true
      });
    }

    // Insert new user
    const newUser = await sql`
      INSERT INTO users(name, email) 
      VALUES(${name}, ${email}) 
      RETURNING id, name, email, created_at
    `;

    res.status(201).json({
      message: `Welcome, ${name}! Google login successful.`,
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        picture: picture
      },
      isExisting: false
    });

  } catch (error) {
    console.error("Google login error:", error);

    if (error.message.includes('Token used too late')) {
      res.status(400).json({
        error: "Google token has expired. Please try signing in again."
      });
    } else if (error.message.includes('Invalid token')) {
      res.status(400).json({
        error: "Invalid Google token. Please try again."
      });
    } else if (error.message.includes('duplicate key')) {
      res.status(409).json({
        error: "User with this email already exists."
      });
    } else {
      res.status(500).json({
        error: "Google login failed. Please try again.",
        details: error.message
      });
    }
  }
});

// --- Solar Energy Manager Routes ---

// Get available slots (Mocking availability for now, ideally fetch from DB)
app.get("/api/solar/slots", async (req, res) => {
  // In a real app, query a 'bookings' table to see what's taken.
  // For now, return static available slots.
  const mockSlots = [
    { id: 1, dateTime: 'Oct 15, 2025 9:00 AM', available: true },
    { id: 2, dateTime: 'Oct 16, 2025 1:00 PM', available: true },
    { id: 3, dateTime: 'Oct 17, 2025 4:00 PM', available: true }
  ];
  res.json(mockSlots);
});

// Book a slot
app.post("/api/solar/book", async (req, res) => {
  const { slotId, address, phone, userId } = req.body;

  // Validate
  if (!slotId || !address || !phone) {
    return res.status(400).json({ error: "Missing required booking details." });
  }

  try {
    // Create bookings table if not exists (Lazy setup for demo)
    await sql`
            CREATE TABLE IF NOT EXISTS solar_bookings (
                id SERIAL PRIMARY KEY,
                user_id INT,
                slot_id VARCHAR(50),
                address TEXT,
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

    const newBooking = await sql`
            INSERT INTO solar_bookings(user_id, slot_id, address, phone)
            VALUES(${userId || null}, ${slotId}, ${address}, ${phone})
            RETURNING id, created_at
        `;

    res.status(201).json({
      message: "Appointment confirmed successfully!",
      bookingId: newBooking[0].id
    });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to book appointment." });
  }
});

// Save ROI Calculation
app.post("/api/solar/roi", async (req, res) => {
  const { inputs, results, userId } = req.body;

  try {
    await sql`
            CREATE TABLE IF NOT EXISTS solar_roi_saves (
                id SERIAL PRIMARY KEY,
                user_id INT,
                avg_bill NUMERIC,
                system_size NUMERIC,
                annual_savings NUMERIC,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

    await sql`
            INSERT INTO solar_roi_saves(user_id, avg_bill, system_size, annual_savings)
            VALUES(${userId || null}, ${inputs.avgBill}, ${inputs.systemSize}, ${results.annualSavings})
        `;

    res.status(201).json({ message: "Calculation saved to your profile." });

  } catch (error) {
    console.error("ROI Save error:", error);
    res.status(500).json({ error: "Failed to save calculation." });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    port: port
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    availableRoutes: [
      "GET /",
      "GET /test",
      "GET /setup",
      "GET /api/users",
      "POST /api/login",
      "POST /api/google-login",
      "GET /health"
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🔧 Database test: http://localhost:${port}/test`);
  console.log(`⚙️  Setup database: http://localhost:${port}/setup`);
});