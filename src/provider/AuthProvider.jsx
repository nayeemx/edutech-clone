// src/providers/AuthProvider.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../firebase/firebase.config';
import { Spin } from 'antd';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setError(null);
    });
    return () => unsubscribe();
  }, []);

  const createUser = (email, password, name, accountType, institutionName, phone) => { // Updated parameters
    setLoading(true);
    setError(null);
    return auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        // WRITE USER DATA TO DATABASE (MATCHING YOUR STRUCTURE):
        return db.ref(`users/${user.uid}`).set({
          name: name,  // Use 'name', not 'displayName'
          email: email,
          accountType: accountType, // Use 'accountType', not 'role'
          institutionName: institutionName, // Include other fields
          phone: phone,
          // photoURL: user.photoURL || null, // You don't have this yet.  Add later if needed.
        }).then(() => {
            setUser(user); // <-  Update the user state *after* successful database write.
            return user;
        });
      })
      .catch((error) => {
        setError(error);
        throw error; // Re-throw for consistent handling
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = (email, password) => {
    setLoading(true);
    setError(null);
    return auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential;
      })
      .catch((error) => {
        setError(error);
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signOut = () => {
    setLoading(true);
    setError(null);
    return auth.signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setError(error);
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const authInfo = {
    user,
    loading,
    error,
    createUser,
    signIn,
    signOut,
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;