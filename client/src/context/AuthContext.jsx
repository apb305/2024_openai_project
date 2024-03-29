import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  signInWithEmailLink,
  FacebookAuthProvider,
  EmailAuthProvider,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  sendSignInLinkToEmail,
  verifyBeforeUpdateEmail,
  deleteUser,
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
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  async function signUp(name, email, password) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      await sendEmailVerification(result.user);
      auth.signOut();
      toast.success(`A verification email has been sent to ${email}`, {position: "top-center"});
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

  //Magic link
  const sendMagicLink = (email, actionCodeSettings) => {
    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
  };

  const completeSignIn = (email, windowLocation) => {
    return signInWithEmailLink(auth, email, windowLocation);
  };

  const reauthenticateUser = async (currentPassword) => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      return true; // Re-authentication succeeded
    } catch (error) {
      console.error(error);
      toast.error(error.code)
      return false; // Re-authentication failed
    }
  };


  // const updateUserEmail = async (newEmail) => {
  //   try {
  //     const user = auth.currentUser;
  //     await verifyBeforeUpdateEmail(user, newEmail);
  //     await updateEmail(user, newEmail);
  //     toast.success("Email updated successfully.");
  //   } catch (error) {
  //     console.error("Error updating user email:", error);
  //   }
  // };

  const changeUserEmail = async (currentPassword, newEmail) => {
    const reauthenticated = await reauthenticateUser(currentPassword);

    if (reauthenticated) {
      await updateUserEmail(newEmail);
    } else {
      console.log("Failed to re-authenticate. Email not updated.");
    }
  };

  async function changePasswordInAccount(email, currentPassword, newPassword) {
    const user = auth.currentUser;
    const currentCredentials = EmailAuthProvider.credential(
      email,
      currentPassword
    );
    try {
      const reauthenticated = reauthenticateWithCredential(
        user,
        currentCredentials
      );
      const updatedPassword = updatePassword(
        (await reauthenticated).user,
        newPassword
      );
      if (updatedPassword) {
        toast.success("Your password has been updated");
      }
    } catch (error) {
      toast.error("Could not update password");
    }
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

  const facebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const firebaseToken = await auth.currentUser.getIdToken();
      const facebookOAuthToken = credential.accessToken;
      const photoUrl = `${result.user.photoURL}?height=500&access_token=${facebookOAuthToken}`;
      axios.post(
        "/api/users",
        {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
        },
        { headers: { Authorization: `Bearer ${firebaseToken}` } }
      );
      await updateProfile(auth.currentUser, {
        displayName: result.user.displayName,
        photoURL: auth.currentUser.photoURL ? auth.currentUser.photoURL : photoUrl,
      });
    } catch (error) {
      throw error;
    }
  };

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

  const deleteAccount = async (user, password) => { 
    try {
      const reauthenticated = await reauthenticateUser(password);
      if (reauthenticated) {
        const token = await user.getIdToken();
        await axios.delete("/api/chats/delete-all", {
          data: { uid: user.uid },
          headers: { Authorization: `Bearer ${token}` },
        });
        await axios.delete("/api/users", {
          data: { uid: user.uid },
          headers: { Authorization: `Bearer ${token}` },
        });
        await deleteUser(user);
        await auth.signOut();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.code);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setUserLoggedIn(true);
        setLoading(false);
      } 
      else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    googleSignIn,
    facebookSignIn,
    signUp,
    signIn,
    sendMagicLink,
    completeSignIn,
    userLoggedIn,
    deleteAccount,
    changeUserEmail,
    // linkAccount,
    resetPasswordByEmail,
    changePasswordInAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
