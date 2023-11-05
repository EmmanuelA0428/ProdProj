import React from "react";
import { Text, View, Button } from "react-native";

import Animated from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";

function NotesScreen({ Navigation }) {
  return (
    <View>
      <Text>Notes</Text>
      <Button title="Add NoteBook" />

      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "violet",
        }}
      />

      <Button title="evbd" />
    </View>
  );
}

export default NotesScreen;
