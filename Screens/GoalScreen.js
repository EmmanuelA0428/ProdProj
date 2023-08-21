import { useState } from "react";
import { useContext } from "react";
import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from "react-native-gesture-handler"; // Import GestureHandlerRootView

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
import userPriorityContext from "../StoreAppData/PriorityData";
import userTagContext from "../StoreAppData/TagData";

//Function component
function GoalScreen({ navigation }) {
  //useContext - These variables are used to store data that is shared between screens
  const { userGoals, setUserGoals } = useContext(GoalsContext);
  const { userDescription, setUserDescription } =
    useContext(DescriptionContext);
  const { userGoalData, setUserGoalData } = useContext(userGoalDataContext);
  const { userPriority, setUserPriority } = useContext(userPriorityContext);
  const { userTag, setUserTag } = useContext(userTagContext);

  //useState - These variables are used to store data that changes over time
  const [enteredGoal, setEnteredGoal] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isInputVisible, setInputVisible] = useState(false);
  const [isPriorityInputVisible, setPriorityInputVisible] = useState(false);
  const [isPriorityModalVisible, setPriorityModalVisible] = useState(false);
  const [isTagModalVisible, setTagModalVisible] = useState(false);
  const [isEditGoalModalVisible, setEditGoalModalVisible] = useState(false);
  const [isEditPriorityModalVisible, setEditPriorityModalVisible] =
    useState(false);

  //Event Handlers - These functions are called when the user interacts with the app
  function handleInputChangeGoal(test) {
    setEnteredGoal(test);
  }
  function handleInputChangeDescription(test) {
    setEnteredDescription(test);
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditGoalModalVisibleTrue();
  }
  function handleCancelEdit() {
    setEditIndex(null);
  }
  function handleSaveGoal(index) {
    setEditIndex(null);
    console.log("Goal saved");
  }
  //More complex event handlers
  function handleDeleteGoal(index) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  }

  function setEditGoalModalVisibleTrue() {
    setEditGoalModalVisible(true);
  }
  function setEditGoalModalVisibleFalse() {
    setEditGoalModalVisible(false);
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

  function priorityEditModalIsVisible() {
    setEditPriorityModalVisible(true);
    console.log("Priority modal is visible");
  }
  function priorityEditModalIsNotVisible() {
    setEditPriorityModalVisible(false);
  }

  //Functions
  function addGoalHandler() {
    if (enteredGoal.trim() !== "") {
    }
    const newUserGoalData = [
      enteredGoal.trim(),
      enteredDescription.trim(),
      selectedPriority,
    ];
    setUserGoalData((prevData) => [...prevData, newUserGoalData]);
    removeText(); // Move this line outside the if blocks
    setSelectedPriority("");
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
  function handleAddGoal() {
    setInputVisible(true); // Show the input field and buttons when this button is clicked
  }

  function priorityModalIsVisible() {
    setPriorityModalVisible(true);
  }
  function priorityModalIsNotVisible() {
    setPriorityModalVisible(false);
    console.log("Priority modal is not visible");
  }

  function tagModalIsVisible() {
    setTagModalVisible(true);
  }
  function tagModalIsNotVisible() {
    setTagModalVisible(false);
  }

  function handleAddTag() {
    // Handle adding the context here
    console.log("Adding context");
    tagModalIsVisible();
    //setInputVisible(false); // Hide the input field and buttons when any button is clicked
  }

  // Hide the input field and buttons when any touch occurs outside the TextInput
  function handleDismissContent() {
    setInputVisible(false);
    Keyboard.dismiss(); // Dismiss the keyboard
  }

  //Render functions - These functions are used to render the UI
  const renderGoalData = ({ item, index }) => {
    const isEditing = editIndex === index;
    return (
      <View style={styles.userGoalsDataContainer}>
        {isEditing ? (
          <>
            <Modal visible={isEditGoalModalVisible} transparent={true}>
              <View style={styles.editGoalModal}>
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

                <TouchableOpacity onPress={priorityEditModalIsVisible}>
                  <Icon name="exclamation"></Icon>
                  <Text>Priority: {item[2]}</Text>
                </TouchableOpacity>
                {/* Add any other editable fields here */}
                <Button title="Save" onPress={() => handleSaveGoal(index)} />
                <Button title="Cancel" onPress={handleCancelEdit} />
                <Button
                  title="Delete"
                  onPress={() => handleDeleteGoal(index)}
                />
              </View>

              <Modal visible={isEditPriorityModalVisible} transparent={true}>
                <View style={styles.editPriorityModal}>
                  <Text>Priority</Text>
                  <Button
                    title="Close"
                    onPress={priorityEditModalIsNotVisible}
                  />
                  <FlatList
                    data={userPriority}
                    renderItem={renderPriorityItem}
                  ></FlatList>
                </View>
              </Modal>
            </Modal>
          </>
        ) : (
          <TouchableOpacity onPress={() => handleEdit(index)}>
            <GestureHandlerRootView>
              <Swipeable
                renderRightActions={renderRightActions}
                renderLeftActions={renderLeftActions}
              >
                <View style={styles.goalItemContainer}>
                  <View style={styles.goalTextContainer}>
                    <Text>{item[0]}</Text>
                    <Text style={styles.descriptionStyleContainer}>
                      {item[1]}
                    </Text>
                    <Text>Priority: {item[2]}</Text>
                  </View>

                  {/* <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(index)}
            >  
              <Icon name="edit" size={20} color="gray" />
            </TouchableOpacity> */}
                </View>
              </Swipeable>
            </GestureHandlerRootView>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  function renderRightActions() {
    return (
      <RectButton
        style={styles.swipeToDelete}
        onPress={() => handleDeleteGoal(index)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </RectButton>
    );
  }

  function renderLeftActions() {
    return (
      <RectButton style={styles.swipeToDelete}>
        <Text style={styles.deleteButtonText}>SubTask</Text>
      </RectButton>
    );
  }

  const [selectedPriority, setSelectedPriority] = useState("");

  function renderPriorityItem({ item }) {
    return (
      <View>
        <Text onPress={() => addPriority(item.value)}>{item.value}</Text>
      </View>
    );
  }
  //Add priority function
  function addPriority(priority) {
    setSelectedPriority(priority); // Store the selected priority
    setPriorityInputVisible(true);
    priorityModalIsNotVisible();
  }

  function renderTagItem({ item }) {
    return (
      <View>
        <Text>{item.tag}</Text>
      </View>
    );
  }

  return (
    //Flatlist for the goals
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
                <Button
                  title="Add Priority "
                  onPress={priorityModalIsVisible}
                />

                <Button title="Add Tag" onPress={tagModalIsVisible} />
              </View>
            </View>
          ) : (
            // Show this button when isInputVisible is false
            <Button title="Add Goal" onPress={handleAddGoal} />
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <Button title="Clear goals" onPress={clearGoals} />
      {/* Priority Modal */}
      <Modal visible={isPriorityModalVisible} transparent={true}>
        <View style={styles.priorityModal}>
          <Text style={styles.PriorityView}> Priority View Text</Text>
          <View style={styles.priorityFlatlist}>
            <FlatList
              data={userPriority}
              renderItem={renderPriorityItem}
            ></FlatList>
            <Button title="Close" onPress={priorityModalIsNotVisible} />
          </View>
        </View>
      </Modal>

      {/* Tag Modal */}
      <Modal visible={isTagModalVisible} transparent={true}>
        <View style={styles.priorityModal}>
          <Text style={styles.PriorityView}> Tag View Text</Text>
          <View style={styles.priorityFlatlist}>
            <FlatList data={userTag} renderItem={renderTagItem}></FlatList>
            <Button title="Close" onPress={tagModalIsNotVisible} />
          </View>
        </View>
      </Modal>

      {/* Add the Flatlist for the priority */}
    </View>
  );
}

//Stylesheet
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
    borderBottomColor: "#eaeaea",
    padding: 10,
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
  priorityModal: {
    // position: "absolute",
    top: "40%", // Adjust as needed to position the modal above the button
    left: "10%", // Center the modal horizontally
    transform: [{ translateX: -50 }], // Center the modal horizontally
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1, // Add a z-index to the modal
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  },
  PriorityView: {
    width: "100%",
    height: "20%",
    // backgroundColor: "red",
    borderWidth: 1,
    borderColor: "black",
  },
  priorityFlatlist: {
    // width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "black",
  },
  goalItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 2,
  },
  goalTextContainer: {
    flex: 1,
  },
  editButton: {
    padding: 5,
    borderRadius: 5,
  },
  swipeToDelete: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FF0000", // Change to your desired delete button color
    padding: 10,
    marginLeft: 15, // Adjust the left margin as needed
    marginRight: -15, // Adjust the right margin as needed
  },
  editGoalModal: {
    flex: 1,
    justifyContent: "flex-start", // Align content at the top
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 100,
    width: "100%",
    position: "absolute",
    bottom: 300, // Position the modal at the bottom
  },
  editPriorityModal: {
    flex: 1,
    justifyContent: "flex-start", // Align content at the top
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 100,
    width: "100%",
    position: "absolute",
    bottom: 300, // Position the modal at the bottom
  },
});

export default GoalScreen;
