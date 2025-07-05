import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../library/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
  
     getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
        setIsLoggedIn(false); 
        setUser(null); 
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []);



  return <GlobalContext.Provider   
  value={{
    isLoading,
    isLoggedIn,
    user,
    setIsLoading,
    setUser,
    setIsLoggedIn
  }}>
  {children}
  </GlobalContext.Provider>;
};

export default GlobalProvider;




/*

import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser, signIn, createUser } from "../library/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          const userObject = JSON.parse(userSession);
          setIsLoggedIn(true);
          setUser(userObject);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const logIn = async (email, password) => {
    try {
      const session = await signIn(email, password);
      if (session) {
        // Save session details to AsyncStorage
        await AsyncStorage.setItem('userSession', JSON.stringify(session));
        setIsLoggedIn(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        setIsLoading,
        setUser,
        setIsLoggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

 */