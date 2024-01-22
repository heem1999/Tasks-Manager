import React, { useEffect, useCallback, useState, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { TaskContext } from "../context/TaskContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditFormScreen = ({ route }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(new Date(task.date));

  const [status, setStatus] = useState(task.status);
  const [showDate, setShowDate] = useState(false);

  const { isLoading, errorMessage, addTask, removeTask, editTask } =
    useContext(TaskContext);

  const navigation = useNavigation();
  const status_value = ["Not Active", "Active"];

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShowDate(false);
  };

  const oncancel = () => {
    setShowDate(false);
  };

  const handelForm = () => {
    if (title && description) {
      editTask(title, description, status, date, task._id);
    }
  };

  const handelDelete = () => {
    removeTask(task._id);
    navigation.goBack();
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Title</Text>
          <TextInput
            onChangeText={(text) => setTitle(text)}
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Title"
            value={title}
          />

          <Text className="text-gray-700 ml-4">Description</Text>
          <TextInput
            onChangeText={(text) => setDescription(text)}
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            placeholder="description"
            value={description}
          />

          <Text className="text-gray-700 ml-4">Task Status</Text>
          <TextInput
            editable={false}
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            value={status == "1" ? "Active" : "Not Active"}
          />
          <Text className="text-gray-700 ml-4">
            <SelectDropdown
              defaultButtonText="Change Task Status"
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              data={status_value}
              defaultValue={status}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                if (index == 0) {
                  setStatus("0");
                } else {
                  setStatus(index);
                }
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </Text>
          <Text className="text-gray-700 ml-4">Date</Text>
          <TextInput
            onFocus={() => setShowDate(true)}
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            placeholder="Date"
            value={date.toDateString()}
          />
          {showDate ? (
            <DateTimePicker
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
              oncancel={oncancel}
            />
          ) : null}
          <Text className="text-red-700 mb-5">{errorMessage.error}</Text>
          <TouchableOpacity
            onPress={() => {
              handelForm();
            }}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Edit Task
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handelDelete();
            }}
            className="py-3 bg-red-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              delete Task
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     // padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginBottom: 20, // Increased margin between boxes
//     width: "40%", // Shortened width
//   },
//   submitButton: {
//     padding: 50, // Increased button size
//   },
//   successText: {
//     color: "green",
//     marginTop: 10,
//     fontSize: 17,
//   },
// });

export default EditFormScreen;
