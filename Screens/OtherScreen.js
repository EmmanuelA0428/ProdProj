import React, { createContext, useState, useEffect, useContext } from "react";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
//Importinh the context
import userPriorityContext from "../StoreAppData/PriorityData";
import userTagContext from "../StoreAppData/TagData";

function OtherScreen({ navigation }) {
  //useStates
  const [isPriorityModalVisible, setIsPriorityModalVisible] = useState(false);
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [enteredTag, setEnteredTag] = useState("");
  //useContext
  const { userPriority, setUserPriority } = useContext(userPriorityContext);
  const { userTag, setUserTag } = useContext(userTagContext);

  //Functions to handle the input
  function handleTagChange(text) {
    setEnteredTag(text);
  }

  //Functions to show and hide the modals
  function priorityModalIsVisible() {
    setIsPriorityModalVisible(true);
  }
  function priorityModalIsNotVisible() {
    setIsPriorityModalVisible(false);
  }
  function tagModalIsVisible() {
    setIsTagModalVisible(true);
  }
  function tagModalIsNotVisible() {
    setIsTagModalVisible(false);
  }

  //Functions to add and remove Priority / Tags
  function addNewPriority() {
    const newPriorityValue = `Priority ${userPriority.length + 1}`;
    const newId = Math.max(...userPriority.map((item) => item.id), 0) + 1;

    setUserPriority((prevPriority) => [
      ...prevPriority,
      { id: newId, value: newPriorityValue },
    ]);
    console.log(userPriority);
  }
  function removePriority() {
    if (userPriority.length === 0) {
      return; // Do nothing if there are no priorities to remove
    }

    const newPriorityList = userPriority.slice(0, -1); // Remove the last priority

    setUserPriority(newPriorityList);

    console.log(userPriority);
  }
  function addNewTag() {
    const newTag = enteredTag;
    const newId = Math.max(...userTag.map((item) => item.id), 0) + 1;
    if (newTag === "") {
      return;
    }
    setUserTag((prevTag) => [...prevTag, { id: newId, tag: newTag }]);
    console.log(userTag);

    setEnteredTag("");
  }
  function removeTag(id) {
    const newTagList = userTag.filter((item) => item.id !== id);
    setUserTag(newTagList);
  }

  //Rendering the screens
  function renderPriorityItem({ item }) {
    return (
      <View>
        <Text>{item.value}</Text>
      </View>
    );
  }
  function renderTagItem({ item }) {
    const renderRightActions = () => (
      <RectButton
        style={styles.swipeToDelete}
        onPress={() => removeTag(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </RectButton>
    );

    return (
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
          <View style={styles.tagItemContainer}>
            <Text>{item.tag}</Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }

  return (
    <View>
      <Text>Settings Screen</Text>
      <Button title="Account" />
      <Button title="General" />
      <Button title="Edit Priority" onPress={priorityModalIsVisible} />
      <Button title="Edit Tags" onPress={tagModalIsVisible} />

      <Modal visible={isPriorityModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Priority</Text>
            <Button title="Add more priority" onPress={addNewPriority} />
            <Button title="Remove priority" onPress={removePriority} />
            <Button title="Close" onPress={priorityModalIsNotVisible} />
            <FlatList
              data={userPriority}
              renderItem={renderPriorityItem}
            ></FlatList>
          </View>
        </View>
      </Modal>

      {/* Modal for  tags */}
      <Modal visible={isTagModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Tags</Text>
            <TextInput
              placeholder="Add new tag"
              onChangeText={handleTagChange}
              value={enteredTag}
            />
            <Button title="Add tag" onPress={addNewTag} />
            <Button title="Close" onPress={tagModalIsNotVisible} />
            <View style={styles.tagFlatList}>
              <FlatList data={userTag} renderItem={renderTagItem}></FlatList>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%", // Adjust the width as needed
    minHeight: 500, // Adjust the height as needed
    justifyContent: "center",
    alignItems: "center",
  },
  tagItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  tagFlatList: {
    height: 300,
  },
});

export default OtherScreen;
