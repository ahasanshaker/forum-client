import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getIdToken,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.init"; // Firebase config

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email, password, displayName
  const signUp = async (email, password, displayName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(res.user, { displayName });
    }
    return res.user;
  };

  // Sign in with email & password
  const signIn = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    return res.user;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("token");
  };

  // Listen for user auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await getIdToken(currentUser);
        localStorage.setItem("token", token); // optional: for backend JWT later
        setUser(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
