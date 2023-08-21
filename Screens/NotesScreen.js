import React from "react";
import { Text, View, Button } from "react-native";

function NotesScreen({ Navigation }) {
  return (
    <View>
      <Text>Notes</Text>
      <Button title="Add NoteBook" />
    </View>
  );
}

export default NotesScreen;
