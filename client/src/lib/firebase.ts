import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const DOCTOR_AUTH_URL =
  "https://foveal-yuriko-uratic.ngrok-free.dev/dental-clinic-project-a8512/us-central1/addDoctorAuthentication";

export interface DoctorSignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface DoctorLoginData {
  username: string;
  password: string;
}

export interface AppointmentData {
  patient: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    preferredChannel: string;
    preferredContactTime: string;
  };
  appointment: {
    appointmentDate: string;
    appointmentTime: string;
    treatmentType: string;
    bookingMethod: string;
  };
}

export const saveDoctorSignup = async (data: DoctorSignupData) => {
  try {
    const response = await fetch(DOCTOR_AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Authentication failed" }));
      console.error("Doctor authentication error:", errorData);
      return {
        success: false,
        error:
          errorData.message ||
          `Authentication failed with status ${response.status}`,
      };
    }

    const result = await response.json();
    console.log("Doctor authenticated successfully:", result);

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error during doctor signup authentication: ", error);
    return { success: false, error: error.message || "Network error occurred" };
  }
};

export const saveDoctorLogin = async (data: DoctorLoginData) => {
  try {
    const docRef = await addDoc(collection(db, "doctorLogins"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Doctor login saved with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving doctor login: ", error);
    return { success: false, error };
  }
};

export const saveAppointment = async (data: AppointmentData) => {
  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Appointment saved with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving appointment: ", error);
    return { success: false, error };
  }
};
