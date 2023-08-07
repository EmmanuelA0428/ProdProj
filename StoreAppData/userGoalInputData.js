//This is where i house the data of all the user inputs in an object

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userGoalDataContext = createContext();

export function UserGoalDataProvider({ children }) {
  const [userGoalData, setUserGoalData] = useState([]); // Use the context

  //Function to load the description
  async function loadUserGoalData() {
    try {
      const storedUserGoalData = await AsyncStorage.getItem("userData");
      if (storedUserGoalData) {
        setUserData(JSON.parse(storedUserGoalData));
      }
    } catch (error) {
      console.error("Error loading user description:", error);
    }
  }
  //Function to save the description
  async function saveUserGoalData() {
    try {
      const jsonUserData = JSON.stringify(userGoalData);
      await AsyncStorage.setItem("userDescription", jsonUserData);
    } catch (error) {
      console.error("Error saving user description:", error);
    }
  }
  useEffect(() => {
    loadUserGoalData(); // Load the data when the app starts
  }, []);
  useEffect(() => {
    saveUserGoalData(); // Save the data whenever userDescription changes
  }, [userGoalData]);

  return (
    <userGoalDataContext.Provider value={{ userGoalData, setUserGoalData }}>
      {children}
    </userGoalDataContext.Provider>
  );
}
export default userGoalDataContext;
