import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  updateEmail,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  // signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebase";
import axios from "../config/axiosConfig";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signUp(name, email, password) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      const token = await auth.currentUser.getIdToken();
      await axios.post(
        "/api/users",
        {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      throw error;
    }
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPasswordByEmail(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function changePasswordInAccount(password) {
    return currentUser.updatePassword(password);
  }

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(
        auth,
        provider.setCustomParameters({
          prompt: "select_account",
        })
      );
      const token = await auth.currentUser.getIdToken();
      await updateProfile(auth.currentUser, {
        displayName: result.user.displayName,
      });
      await axios.post(
        "/api/users",
        {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      throw error;
    }
  };

  // const facebookSignIn = async () => { 
  //   try {
  //     const provider = new FacebookAuthProvider();
  //     const result = await signInWithPopup(auth, provider);
  //     const credential = FacebookAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // const photoUrl = `${result.user.photoURL}?height=500&access_token=${token}`;
  //     // axios.post("/signup", {
  //     //   _id: result.user.uid,
  //     //   name: result.user.displayName,
  //     //   email: result.user.email,
  //     // });
  //     await updateProfile(auth.currentUser, {
  //       displayName: result.user.displayName,
  //       photoURL: result.user.photoURL,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  //Account linking
  // async function linkAccount(providerName) {
  //   if (!currentUser) {
  //     console.error("No current user to link to.");
  //     return;
  //   }

  //   try {
  //     let provider;
  //     if (providerName === 'google') {
  //       provider = new GoogleAuthProvider();
  //     } else if (providerName === 'facebook') {
  //       provider = new FacebookAuthProvider();
  //     } else {
  //       throw new Error("Unsupported provider");
  //     }

  //     const result = await linkWithPopup(currentUser, provider);
  //     // Optionally, update the user's profile or handle the linked account information
  //     console.log(`Account linked with ${providerName}`, result);
  //   } catch (error) {
  //     console.error(`Error linking ${providerName} account:`, error);
  //     throw error;
  //   }
  // }


  const signOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    googleSignIn,
    // facebookSignIn,
    signUp,
    signOut,
    signIn,
    // linkAccount,
    resetPasswordByEmail,
    changePasswordInAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
