import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";

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
export const auth = getAuth(app);

export const BOOKING_APPOINTMENT_URL =
  "https://foveal-yuriko-uratic.ngrok-free.dev/dental-clinic-project-a8512/us-central1/bookingAppointment";

export const GOOGLE_CLIENT_ID =
  "847789978053-p6k8o0g3t825o1p2359c9mu770ei4t57.apps.googleusercontent.com";

export interface DoctorSignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface DoctorLoginData {
  email: string;
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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const doctorData = {
      id: userCredential.user.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: "doctor",
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "doctors", userCredential.user.uid), doctorData);

    console.log("Doctor authenticated successfully:", doctorData);

    return { success: true, data: { uid: userCredential.user.uid, ...doctorData } };
  } catch (error: any) {
    console.error("Error during doctor signup authentication: ", error);
    
    let errorMessage = "Network error occurred";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "This email is already registered. Please login instead.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password should be at least 6 characters.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Please enter a valid email address.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

export const saveDoctorLogin = async (data: DoctorLoginData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    console.log("Doctor logged in successfully:", {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    });

    return { 
      success: true, 
      data: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }
    };
  } catch (error: any) {
    console.error("Error during doctor login: ", error);
    
    let errorMessage = "Network error occurred";
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      errorMessage = "Invalid email or password. Please try again.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Please enter a valid email address.";
    } else if (error.code === "auth/user-disabled") {
      errorMessage = "This account has been disabled.";
    } else if (error.code === "auth/invalid-credential") {
      errorMessage = "Invalid email or password. Please try again.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

export const saveAppointment = async (data: AppointmentData) => {
  try {
    const response = await fetch(BOOKING_APPOINTMENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Booking failed" }));
      console.error("Appointment booking error:", errorData);
      return {
        success: false,
        error: errorData.message || `Booking failed with status ${response.status}`,
      };
    }

    const result = await response.json();
    console.log("Appointment booked successfully:", result);

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error saving appointment: ", error);
    return { success: false, error: error.message || "Network error occurred" };
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    const displayNameParts = user.displayName?.split(" ") || ["", ""];
    const firstName = displayNameParts[0] || "";
    const lastName = displayNameParts.slice(1).join(" ") || "";

    const doctorData = {
      id: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: user.email || "",
      role: "doctor",
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "doctors", user.uid), doctorData, { merge: true });

    console.log("Google authentication successful:", doctorData);

    return { 
      success: true, 
      data: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }
    };
  } catch (error: any) {
    console.error("Error during Google authentication: ", error);
    
    let errorMessage = "Google authentication failed";
    if (error.code === "auth/popup-closed-by-user") {
      errorMessage = "Sign-in popup was closed. Please try again.";
    } else if (error.code === "auth/cancelled-popup-request") {
      errorMessage = "Only one popup request is allowed at a time.";
    } else if (error.code === "auth/popup-blocked") {
      errorMessage = "Popup was blocked. Please allow popups for this site.";
    } else if (error.code === "auth/account-exists-with-different-credential") {
      errorMessage = "An account already exists with this email using a different sign-in method.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

export const continueWithGoogle = signInWithGoogle;

export const logoutDoctor = async () => {
  try {
    await signOut(auth);
    console.log("Doctor logged out successfully");
    return { success: true };
  } catch (error: any) {
    console.error("Error during logout: ", error);
    return { success: false, error: error.message || "Logout failed" };
  }
};

export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
