import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAppointmentSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      const user = await storage.createUser({
        username: validatedData.username,
        password: hashedPassword,
      });

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed after registration" });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({ user: userWithoutPassword });
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed" });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      req.session.destroy((destroyErr) => {
        if (destroyErr) {
          return res.status(500).json({ message: "Session destruction failed" });
        }
        res.clearCookie("connect.sid", {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
        res.json({ message: "Logged out successfully" });
      });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      const { password: _, ...userWithoutPassword } = req.user as any;
      res.json({ user: userWithoutPassword });
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      
      const appointment = await storage.createAppointment(validatedData);
      console.log("✅ Appointment created:", {
        id: appointment.id,
        patient: `${appointment.firstName} ${appointment.lastName}`,
        email: appointment.email,
        date: appointment.appointmentDate,
        time: appointment.appointmentTime,
        treatment: appointment.treatmentType,
      });

      const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
      if (makeWebhookUrl) {
        try {
          const webhookPayload = {
            appointmentId: appointment.id,
            firstName: appointment.firstName,
            lastName: appointment.lastName,
            email: appointment.email,
            phone: appointment.phone,
            preferredChannel: appointment.preferredChannel,
            preferredContactTime: appointment.preferredContactTime,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            treatmentType: appointment.treatmentType,
            bookingMethod: appointment.bookingMethod,
            status: appointment.status,
            createdAt: appointment.createdAt?.toISOString(),
          };

          const response = await fetch(makeWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookPayload),
          });

          if (response.ok) {
            console.log("🚀 Appointment data sent to Make.com webhook successfully");
            console.log("📧 SendGrid email will be sent to:", appointment.email);
          } else {
            console.error("❌ Make.com webhook error:", response.status, response.statusText);
          }
        } catch (webhookError: any) {
          console.error("❌ Failed to send to Make.com webhook:", webhookError.message);
        }
      } else {
        console.warn("⚠️  MAKE_WEBHOOK_URL not configured - skipping webhook call");
      }

      res.status(201).json({
        success: true,
        message: "Appointment booked successfully",
        data: {
          id: appointment.id,
          firstName: appointment.firstName,
          lastName: appointment.lastName,
          email: appointment.email,
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentTime,
          treatmentType: appointment.treatmentType,
        },
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message,
        });
      }
      console.error("❌ Appointment booking error:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to book appointment. Please try again.",
      });
    }
  });

  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json({ appointments });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/appointments/upcoming", async (req, res) => {
    try {
      const fromDate = req.query.from as string | undefined;
      const appointments = await storage.getUpcomingAppointments(fromDate);
      
      console.log(`📅 Fetched ${appointments.length} upcoming appointments`);
      
      res.json({
        success: true,
        count: appointments.length,
        appointments: appointments.map(apt => ({
          id: apt.id,
          firstName: apt.firstName,
          lastName: apt.lastName,
          email: apt.email,
          phone: apt.phone,
          appointmentDate: apt.appointmentDate,
          appointmentTime: apt.appointmentTime,
          treatmentType: apt.treatmentType,
          status: apt.status,
          preferredChannel: apt.preferredChannel,
        })),
      });
    } catch (error: any) {
      console.error("❌ Error fetching upcoming appointments:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch upcoming appointments",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
