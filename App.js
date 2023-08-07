import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

//Testing how branch works

//Needed for navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Importing the screens
import HomeScreen from "./Screens/HomeScreen";
import GoalsScreen from "./Screens/GoalScreen";
import OtherScreen from "./Screens/OtherScreen";

//creating the stack
const Stack = createNativeStackNavigator();

import { GoalsProvider } from "./StoreAppData/GoalsData";
import { DescriptionProvider } from "./StoreAppData/DescriptionData";
import { UserGoalDataProvider } from "./StoreAppData/userGoalInputData";
function CustomHeader({ navigation }) {
  return <Icon name="bars" size={100} color="black" style={styles.icon} />;
}

export default function App() {
  return (
    <UserGoalDataProvider>
      <GoalsProvider>
        <DescriptionProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Home Page", header: () => <CustomHeader /> }}
              />
              <Stack.Screen name="Goal" component={GoalsScreen} />
              <Stack.Screen name="Other" component={OtherScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </DescriptionProvider>
      </GoalsProvider>
    </UserGoalDataProvider>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  homeNavBar: {},
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});
