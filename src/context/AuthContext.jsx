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
import { auth, googleProvider } from "../firebase/firebase.init"; // তোমার Firebase config import

// Context create
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Sign up with email + password + displayName
  const signUp = async (email, password, displayName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(res.user, { displayName });
    }
    return res.user;
  };

  // ✅ Sign in (email + password)
  const signIn = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  };

  // ✅ Sign in with Google
  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    return res.user;
  };

  // ✅ Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("token");
  };

  // ✅ Track user state (onAuthStateChanged)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Firebase থেকে JWT token আনা
        const token = await getIdToken(currentUser);
        localStorage.setItem("token", token);
        setUser(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Provide value to whole app
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

// ✅ Custom hook for consuming auth
export const useAuth = () => useContext(AuthContext);
