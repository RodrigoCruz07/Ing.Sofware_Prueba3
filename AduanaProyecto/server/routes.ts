import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  rut: z.string().min(8, "RUT must be at least 8 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password, rememberMe } = loginSchema.parse(req.body);
      
      // For demonstration purposes, we'll accept a demo account
      // In a real application, this would validate against a database
      const validCredentials = [
        { email: "admin@aduana.com", password: "admin123" },
        { email: "usuario@empresa.com", password: "password123" },
      ];
      
      const isValidUser = validCredentials.some(
        (cred) => cred.email === email && cred.password === password
      );
      
      if (!isValidUser) {
        return res.status(401).json({ 
          message: "Credenciales incorrectas",
          error: "INVALID_CREDENTIALS" 
        });
      }
      
      // Determine user role based on email domain
      const emailDomain = email.split("@")[1];
      const userRole = emailDomain === "aduana.com" ? "admin" : "client";
      const userName = emailDomain === "aduana.com" ? "Administrador" : "Cliente";
      
      // Simulate successful login
      res.json({
        success: true,
        message: "Login successful",
        user: {
          email,
          name: userName,
          role: userRole,
          domain: emailDomain,
        },
        rememberMe,
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Datos de entrada inválidos",
          errors: error.errors,
        });
      }
      
      console.error("Login error:", error);
      res.status(500).json({ 
        message: "Error interno del servidor" 
      });
    }
  });
  
  // Register endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, rut, password } = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingCredentials = [
        { email: "admin@aduana.com", password: "admin123" },
        { email: "usuario@empresa.com", password: "password123" },
      ];
      
      const userExists = existingCredentials.some(cred => cred.email === email);
      if (userExists) {
        return res.status(400).json({
          message: "El usuario ya existe",
          error: "USER_EXISTS"
        });
      }
      
      // Simulate user registration
      const newUser = {
        firstName,
        lastName,
        email,
        phone,
        rut,
        password, // In real app, this would be hashed
        createdAt: new Date().toISOString(),
      };
      
      res.json({
        success: true,
        message: "Usuario registrado exitosamente",
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          rut: newUser.rut,
        }
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Datos de entrada inválidos",
          errors: error.errors,
        });
      }
      
      console.error("Registration error:", error);
      res.status(500).json({ 
        message: "Error interno del servidor" 
      });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", async (req, res) => {
    try {
      // In a real application, you would invalidate the session/token here
      res.json({
        success: true,
        message: "Logout successful"
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ 
        message: "Error al cerrar sesión" 
      });
    }
  });

  // Minor documentation endpoint
  app.post("/api/procedures/minor-documentation", async (req, res) => {
    try {
      res.json({
        success: true,
        message: "Solicitud de documentación para menor enviada exitosamente",
        referenceNumber: "MIN-" + Date.now(),
        estimatedProcessingTime: "5-7 días hábiles"
      });
    } catch (error) {
      console.error("Minor documentation error:", error);
      res.status(500).json({ 
        message: "Error al procesar solicitud" 
      });
    }
  });

  // Inventory form endpoint
  app.post("/api/procedures/inventory-form", async (req, res) => {
    try {
      res.json({
        success: true,
        message: "Formulario de inventario enviado exitosamente",
        referenceNumber: "INV-" + Date.now(),
        estimatedProcessingTime: "3-5 días hábiles"
      });
    } catch (error) {
      console.error("Inventory form error:", error);
      res.status(500).json({ 
        message: "Error al procesar formulario" 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
