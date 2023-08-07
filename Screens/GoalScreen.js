import { useState } from "react";
import { useContext } from "react";
import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

//importing the context
import GoalsContext from "../StoreAppData/GoalsData";
import DescriptionContext from "../StoreAppData/DescriptionData";
import userGoalDataContext from "../StoreAppData/userGoalInputData";

//Function component
function GoalScreen({ navigation }) {
  //Context variables - These variables are used to store data that is shared between screens
  const { userGoals, setUserGoals } = useContext(GoalsContext);
  const { userDescription, setUserDescription } =
    useContext(DescriptionContext);
  const { userGoalData, setUserGoalData } = useContext(userGoalDataContext);

  //State variables - These variables are used to store data that changes over time
  const [enteredGoal, setEnteredGoal] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  //Event Handlers - These functions are called when the user interacts with the app
  const handleInputChangeGoal = (text) => {
    setEnteredGoal(text);
  };
  const handleInputChangeDescription = (text) => {
    setEnteredDescription(text);
  };

  //Render functions - These functions are used to render the UI
  const renderGoalData = ({ item, index }) => {
    const isEditing = editIndex === index;
    return (
      <View style={styles.userGoalsDataContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Edit Goal"
              value={item[0]}
              onChangeText={(text) => handleEditGoal(text, index)}
            />

            <TextInput
              placeholder="Edit Description"
              value={item[1]}
              onChangeText={(text) => handleEditDescription(text, index)}
            />
            {/* Add any other editable fields here */}
            <Button title="Save" onPress={() => handleSaveGoal(index)} />
            <Button title="Cancel" onPress={handleCancelEdit} />
            <Button title="Delete" onPress={() => handleDeleteGoal(index)} />
          </>
        ) : (
          <>
            <Text style={styles.goalsStyleContainer}>{item[0]}</Text>
            <Text style={styles.descriptionStyleContainer}>{item[1]}</Text>
            {/* Render any other non-editable fields here */}
            <Button title="Edit" onPress={() => handleEdit(index)} />
          </>
        )}
      </View>
    );
  };

  function handleEdit(index) {
    setEditIndex(index);
  }

  function handleCancelEdit() {
    setEditIndex(null);
  }

  function handleSaveGoal(index) {
    setEditIndex(null); // Exit edit mode
    // You can perform any additional save/update logic here if needed
  }

  function handleDeleteGoal(index) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  }

  function handleEditGoal(text, index) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData[index][0] = text;
      return newData;
    });
  }

  function handleEditDescription(text, index) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData[index][1] = text;
      return newData;
    });
  }

  //Functions
  function addGoalHandler() {
    if (enteredGoal.trim() !== "") {
    }
    const newUserGoalData = [enteredGoal.trim(), enteredDescription.trim()];
    setUserGoalData((prevData) => [...prevData, newUserGoalData]);
    removeText(); // Move this line outside the if blocks
  }

  //Quick add function
  function removeText() {
    setEnteredGoal("");
    setEnteredDescription("");
  }
  function arraylength() {
    return userGoalData.length;
  }
  function clearGoals() {
    setUserGoals([]);
    setUserDescription([]);
    setUserGoalData([]);
    console.log("Goals cleared");
  }

  //New code
  const [isInputVisible, setInputVisible] = useState(false);

  function handleAddGoal() {
    setInputVisible(true); // Show the input field and buttons when this button is clicked
  }

  function handleAddPriority() {
    // Handle adding the prop here
    console.log("Adding prop");
    //setInputVisible(false); // Hide the input field and buttons when any button is clicked
  }

  function handleAddTag() {
    // Handle adding the context here
    console.log("Adding context");
    //setInputVisible(false); // Hide the input field and buttons when any button is clicked
  }

  // Hide the input field and buttons when any touch occurs outside the TextInput
  function handleDismissContent() {
    setInputVisible(false);
    Keyboard.dismiss(); // Dismiss the keyboard
  }

  return (
    <View style={styles.container}>
      <View style={styles.goalsContainer}>
        <Text>Goal Added</Text>
        <Text> Number of goals: {arraylength()}</Text>
        <FlatList
          data={userGoalData}
          renderItem={renderGoalData}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Wrap the content with TouchableWithoutFeedback */}
      <TouchableWithoutFeedback onPress={handleDismissContent}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          {/* Show the input field and buttons when isInputVisible is true */}
          {isInputVisible ? (
            <View style={styles.showEverything}>
              <TextInput
                style={styles.textInput}
                placeholder="Add Goal"
                onSubmitEditing={handleAddGoal}
                autoFocus={true}
                value={enteredGoal}
                onChangeText={handleInputChangeGoal}
              />
              <TextInput
                placeholder="Description"
                value={enteredDescription}
                onChangeText={handleInputChangeDescription}
              />
              <Button title="Add Goal" onPress={addGoalHandler} />
              <View style={styles.extraButtons}>
                <Button title="Add Priority " onPress={handleAddPriority} />
                <Button title="Add Tag" onPress={handleAddTag} />
              </View>
            </View>
          ) : (
            // Show this button when isInputVisible is false
            <Button title="Add Goal" onPress={handleAddGoal} />
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <Button title="Clear goals" onPress={clearGoals} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  goalsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    width: "100%",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    paddingBottom: 100, // Add paddingBottom to prevent the Add Goal button from being covered by the keyboard
  },
  userGoalsDataContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 0,
    borderRadius: 10,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  goalsStyleContainer: {
    color: "red",
  },
  descriptionStyleContainer: {
    color: "blue",
  },
  extraButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  showEverything: {
    width: "100%",
    alignItems: "center",
    top: -100,
    backgroundColor: "grey",
  },
});

export default GoalScreen;
