import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { type User, type InsertUser, users, type Appointment, type InsertAppointment } from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  getUpcomingAppointments(fromDate?: string): Promise<Appointment[]>;
}

export class MemStorage implements IStorage {
  private appointments: Map<string, Appointment> = new Map();
  private users: Map<string, User> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      ...insertUser,
    };
    this.users.set(user.id, user);
    return user;
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const appointment: Appointment = {
      id: crypto.randomUUID(),
      ...insertAppointment,
      status: "pending",
      createdAt: new Date(),
    };
    this.appointments.set(appointment.id, appointment);
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getUpcomingAppointments(fromDate?: string): Promise<Appointment[]> {
    const today = fromDate || new Date().toISOString().split('T')[0];
    return Array.from(this.appointments.values())
      .filter(apt => apt.appointmentDate >= today)
      .sort((a, b) => {
        const dateCompare = a.appointmentDate.localeCompare(b.appointmentDate);
        if (dateCompare !== 0) return dateCompare;
        return a.appointmentTime.localeCompare(b.appointmentTime);
      });
  }
}

export const storage = new MemStorage();
