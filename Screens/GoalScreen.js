//---------------------------------Imports---------------------------------------
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
  TouchableHighlight,
  Touchable,
  Animated,
} from "react-native";
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
  PanGestureHandler,
} from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { useState } from "react";
import { useContext } from "react";
import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";
import * as Reanimated from "react-native-reanimated";
import DraggableFlatList from "react-native-draggable-flatlist";

//importing the context
import GoalsContext from "../StoreAppData/GoalsData";
import DescriptionContext from "../StoreAppData/DescriptionData";
import userGoalDataContext from "../StoreAppData/userGoalInputData";
import userPriorityContext from "../StoreAppData/PriorityData";
import userTagContext from "../StoreAppData/TagData";
import DeletedUserGoalsContext from "../StoreAppData/DeletedGoalsData";
import CompletedUserGoalsContext from "../StoreAppData/CompletedGoalsData";

//------------------------------ Goal Screen - App ------------------------------
function GoalScreen({ navigation }) {
  //------------------------------ useContext -  --------------------------------
  {
    /*useContext - values shared across screens */
  }
  const { userGoals, setUserGoals } = useContext(GoalsContext);
  const { userDescription, setUserDescription } =
    useContext(DescriptionContext);
  const { userGoalData, setUserGoalData } = useContext(userGoalDataContext);
  const { userPriority, setUserPriority } = useContext(userPriorityContext);
  const { userTag, setUserTag } = useContext(userTagContext);
  const { deletedUserGoals, setDeletedUserGoals } = useContext(
    DeletedUserGoalsContext
  );
  const { completedUserGoals, setCompletedUserGoals } = useContext(
    CompletedUserGoalsContext
  );

  //------------------------------ useState -  ----------------------------------
  {
    /*useState - values that are local to the screen */
  }
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
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isEditTagModalVisible, setEditTagModalVisible] = useState(false);
  const [isUndoVisible, setIsUndoVisible] = useState(false);
  const [undoData, setUndoData] = useState(null);
  const [isAddGoalModal, setAddGoalModal] = useState(false);

  //------------------------------ Event Handlers - Modals ------------------------------
  function setEditGoalModalVisibleTrue() {
    setEditGoalModalVisible(true);
  }
  function setEditGoalModalVisibleFalse() {
    setEditGoalModalVisible(false);
  }
  function priorityEditModalIsVisible() {
    setEditPriorityModalVisible(true);
    console.log("Priority modal is visible");
  }
  function priorityEditModalIsNotVisible() {
    setEditPriorityModalVisible(false);
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
  // ------------------------------ Event Handlers - App ------------------------------
  function handleInputChangeGoal(test) {
    setEnteredGoal(test);
  }
  function handleInputChangeDescription(test) {
    setEnteredDescription(test);
  }
  function handleEdit(index) {
    setEditIndex(index);
    setEditGoalModalVisibleTrue();
    // setSelectedPriority(userGoalData[index][2]); // Set selected priority
    console.log(index);
  }
  function handleCancelEdit() {
    setEditIndex(null);
  }
  function handleSaveGoal(index) {
    setEditIndex(null);
    console.log("Goal saved");
  }
  //Function to add the deleted Goal, to the setDeletedUserGoals Array
  function addDeletedGoal(deletedGoal) {
    setDeletedUserGoals((prevData) => {
      return [...prevData, deletedGoal];
    });
  }
  function handleDismissContent() {
    setInputVisible(false);
    Keyboard.dismiss(); // Dismiss the keyboard
    console.log("Dismissed - This works");
    setInputVisible(false);
  }
  function removeText() {
    setEnteredGoal("");
    setEnteredDescription("");
  }
  function arraylength() {
    return userGoalData.length;
  }
  //Add goal function
  function addGoalHandler() {
    if (enteredGoal.trim() !== "") {
    }
    const newUserGoalData = [
      enteredGoal.trim(),
      enteredDescription.trim(),
      selectedPriority,
      selectedTag,
    ];
    setUserGoalData((prevData) => [...prevData, newUserGoalData]);
    removeText(); // Move this line outside the if blocks
    setSelectedPriority("");
    setSelectedTag("");
  }
  //------------------------------ Event Handlers - Goals ------------------------------
  function handleEditGoal(text, index) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData[index][0] = text;
      return newData;
    });
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

  //Function to add the deleted Goal, to the setDeletedUserGoals Array
  function addDeletedGoal(deletedGoal) {
    setDeletedUserGoals((prevData) => {
      return [...prevData, deletedGoal];
    });
  }

  function handleDeleteGoal(index) {
    // Store the deleted goal temporarily
    setUndoData(userGoalData[index]);

    // Show the undo button
    setIsUndoVisible(true);

    // Start a timer to hide the undo button after 10 seconds
    setTimeout(() => {
      setIsUndoVisible(false);
      setUndoData(null); // Clear undo data
    }, 10000);

    //Adding the deleted Goal to the DeletedGaol storage
    addDeletedGoal(userGoalData[index]);
    console.log(deletedUserGoals);

    //Removing the deleted goal.
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);

      //When the goal is deleted, we need to add the deleted gaol to
      //the new Async storage called "DeletedGoalsData"

      return newData;
    });
  }

  function addSavedGoals(savedGoals) {
    setCompletedUserGoals((prevData) => {
      return [...prevData, savedGoals];
    });
  }

  function handleSaveGoals(index) {
    // Store the deleted goal temporarily
    setUndoData(userGoalData[index]);

    // Show the undo button
    setIsUndoVisible(true);

    // Start a timer to hide the undo button after 10 seconds
    setTimeout(() => {
      setIsUndoVisible(false);
      setUndoData(null); // Clear undo data
    }, 10000);

    addSavedGoals(userGoalData[index]);
    console.log(completedUserGoals);

    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);

      //When the goal is deleted, we need to add the deleted gaol to
      //the new Async storage called "DeletedGoalsData"

      return newData;
    });
  }

  if (isUndoVisible) {
    return (
      <View style={styles.undoButtonContainer}>
        <Button title="Undo" onPress={handleUndo} />
      </View>
    );
  }
  function handleUndo() {
    if (undoData) {
      setUserGoalData((prevData) => [...prevData, undoData]);
    }

    // Hide the undo button and clear undo data
    setIsUndoVisible(false);
    setUndoData(null);
  }

  //------------------------------ Event Handlers - Description --------------------------
  function handleEditDescription(text, index) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData[index][1] = text;
      return newData;
    });
  }
  //------------------------------ Event Handlers - Priority ------------------------------
  function addPriority(priority) {
    setSelectedPriority(priority); // Store the selected priority
    console.log("Priority added" + priority);
  }
  function handleEditPriority(priority) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData[editIndex][2] = priority;
      console.log("Priority edited" + priority);

      return newData;
    });
  }
  function renderPriorityItem({ item }) {
    //item is the data of priority, which includes the id and value
    return (
      // Add an onPress event handler to add the priority value
      <TouchableOpacity onPress={() => addPriority(item.value)}>
        <Text>{item.value}</Text>
      </TouchableOpacity>
    );
  }
  function renderPriorityEditItem({ item }) {
    return (
      <TouchableOpacity onPress={() => handleEditPriority(item.value)}>
        <Text>{item.value}</Text>
      </TouchableOpacity>
    );
  }

  //------------------------------ Event Handlers - Tag ------------------------------
  function addTag(tag) {
    setSelectedTag(tag); // Store the selected priority
    console.log("Tag added " + tag);
    tagModalIsNotVisible();
  }
  function handleAddTag() {
    // Handle adding the context here
    console.log("Adding context");
    tagModalIsVisible();
    //setInputVisible(false); // Hide the input field and buttons when any button is clicked
  }
  function renderTagItem({ item }) {
    return (
      <TouchableOpacity onPress={() => addTag(item.tag)}>
        <Text>{item.tag}</Text>
      </TouchableOpacity>
    );
  }
  function tagEditModalIsVisible() {
    setEditTagModalVisible(true);
    console.log("Tag modal is visible");
  }

  function tagEditModalIsNotVisible() {
    setEditTagModalVisible(false);
  }
  function renderTagEditItem({ item }) {
    return (
      <TouchableOpacity onPress={() => handleEditTag(item.tag)}>
        <Text>{item.tag}</Text>
      </TouchableOpacity>
    );
  }
  function handleEditTag(tag) {
    setUserGoalData((prevData) => {
      const newData = [...prevData];
      newData[editIndex][3] = tag;
      console.log("Tag edited" + tag);

      return newData;
    });
  }
  //------------------------------ Render Functions ---------------------------------
  {
    /*These functions are used to render the UI */
  }
  const renderGoalData = ({ item, index }) => {
    const isEditing = editIndex === index;
    return (
      <View style={styles.userGoalsDataContainer}>
        {isEditing ? (
          <>
            <Modal visible={isEditGoalModalVisible} transparent={true}>
              <View style={styles.editGoalModal}>
                <TextInput
                  style={styles.editTextInput}
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

                <TouchableOpacity onPress={tagEditModalIsVisible}>
                  <Icon name="tag"></Icon>
                  <Text>Tag: {item[3]}</Text>
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
                    renderItem={renderPriorityEditItem}
                  ></FlatList>
                </View>
              </Modal>

              <Modal visible={isEditTagModalVisible} transparent={true}>
                <View style={styles.editPriorityModal}>
                  <Text>Tag</Text>
                  <Button title="Close" onPress={tagEditModalIsNotVisible} />
                  <FlatList
                    data={userTag}
                    renderItem={renderTagEditItem}
                  ></FlatList>
                </View>
              </Modal>
            </Modal>
          </>
        ) : (
          // <GestureHandlerRootView>
          //   {/* <Swipeable
          //     renderRightActions={renderRightActions}
          //     renderLeftActions={renderLeftActions}
          //     friction={2}
          //   > */}

          //   <PanGestureHandler onGestureEvent={PanGestureHandler}>
          //     <Animated.View style={[styles.goalItemContainer, animatedStyle]}>

          <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableOpen={() => handleDeleteGoal(index)}
          >
            <TouchableHighlight
              onPress={() => handleEdit(index)}
              underlayColor="transparent"
              // onLongPress={drag}
            >
              <View style={styles.goalItemContainer}>
                <View style={styles.goalTextContainer}>
                  {/*Adding checkbox */}
                  <CheckBox
                    checkedIcon={
                      <Icon
                        name="dot-circle-o"
                        type="font-awesome"
                        color="green"
                        size={40}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="circle-thin"
                        type="font-awesome"
                        color="grey"
                        size={40}
                      />

                      //onPress - calls a function when the checkbox is clicked
                      //Add an undo feature
                    }
                    onPress={() => handleSaveGoals(index)}
                  />
                  <Text>{item[0]}</Text>
                  <Text>{item[1]}</Text>
                  <Text>Priority: {item[2]}</Text>
                  <Text>Tag: item: {item[3]}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </Swipeable>
          //     </Animated.View>
          //   </PanGestureHandler>

          //   {/* </Swipeable> */}
          // </GestureHandlerRootView>
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

  //------------------------------------------------------------------------------------
  return (
    //Flatlist for the goals
    <View style={styles.container}>
      <View style={styles.goalsContainer}>
        <View style={styles.headerContainer}>
          <Text>Goal Added</Text>
          <Text> Number of goals: {arraylength()}</Text>
          <TouchableHighlight onPress={clearGoals}>
            <Icon name="trash-o" size="30" color="blue"></Icon>
          </TouchableHighlight>
        </View>

        <CheckBox value="Testing" />

        {/*Change back to dragable  */}
        <FlatList
          data={userGoalData}
          renderItem={renderGoalData}
          keyExtractor={(item, index) => index.toString()}
          // onDragEnd={({ data }) => setUserGoalData(data)}
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
            //<Modal visible={isInputVisible} transparent={true}>
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
            <View style={styles.addGoalButton}>
              <TouchableOpacity onPress={handleAddGoal}>
                <Icon name="plus-circle" size={50} color="red" />
              </TouchableOpacity>
            </View>

            // <Button title="Add Goal" onPress={handleAddGoal} />
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Priority Modal */}

      <Modal visible={isPriorityModalVisible} transparent={true}>
        <View style={styles.priorityModal}>
          <Text style={styles.PriorityView}> Priority View Text</Text>
          <View style={styles.priorityFlatlist}>
            <FlatList data={userPriority} renderItem={renderPriorityItem} />
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
    backgroundColor: "#F6F6F6", // Use a lighter background color
    alignItems: "center",
    justifyContent: "center",
  },
  goalsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    width: "100%",
  },
  editTextInput: {
    borderColor: "#333",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },

  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    paddingBottom: 20, // Adjust padding
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background overlay
    padding: 20,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },

  //check out in a bit
  editPriorityModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  addButton: {
    backgroundColor: "#007AFF", // Blue button background
    color: "#FFF", // White button text
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addGoalButton: {
    //backgroundColor: "#007AFF", // Blue button background
    color: "#FFF", // White button text
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    left: 140,
    top: -30,
  },
  editTagModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  editButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  undoButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: 10, // Adjust the position as needed
  },
  editAddGoalModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 20,
    width: "100%",
    position: "absolute",
    bottom: 100,
  },

  touchable: {
    zIndex: 100,
  },

  modal: {
    zIndex: 10,
  },
});

export default GoalScreen;
//
