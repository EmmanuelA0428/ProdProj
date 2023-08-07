import { useState } from "react";
import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

function HomeScreen({ navigation }) {
  //navigation is a prop passed into every screen component
  return (
    <View>
      <Button title="Home Page" onPress={() => navigation.navigate("Home")} />
      <Button title="Goals Page" onPress={() => navigation.navigate("Goal")} />
      <Button title="Other Page" onPress={() => navigation.navigate("Other")} />
    </View>
  );
}

export default HomeScreen;
