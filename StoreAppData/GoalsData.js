// Purpose: To store the user's description data

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoalsContext = createContext();

export function GoalsProvider({ children }) {
  const [userGoals, setUserGoals] = useState([]); // Use the context

  //Function to load the goals
  async function loadUserGoals() {
    try {
      const storedGoals = await AsyncStorage.getItem("userGoals");
      if (storedGoals) {
        setUserGoals(JSON.parse(storedGoals));
      }
    } catch (error) {
      console.error("Error loading user goals:", error);
    }
  }

  //Function to save the Goals
  async function saveUserGoals() {
    try {
      const jsonGoals = JSON.stringify(userGoals);
      await AsyncStorage.setItem("userGoals", jsonGoals);
    } catch (error) {
      console.error("Error saving user goals:", error);
    }
  }

  useEffect(() => {
    loadUserGoals(); // Load the data when the app starts
  }, []);

  useEffect(() => {
    saveUserGoals(); // Save the data whenever userGoals changes
  }, [userGoals]);

  return (
    <GoalsContext.Provider value={{ userGoals, setUserGoals }}>
      {children}
    </GoalsContext.Provider>
  );
}

export default GoalsContext;
