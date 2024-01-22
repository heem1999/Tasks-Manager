import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TaskContext } from "../context/TaskContext";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { userInfo, logout } = useContext(AuthContext);
  const { isLoading, errorMessage, tasks } = useContext(TaskContext);

  // const Item = ({ task }) => (
  //   <View style={styles.item}>
  //     <TouchableOpacity
  //       onPress={() => navigation.navigate("EditTask", { task })}
  //       className="py-3 bg-yellow-400 rounded-xl"
  //     >
  //       <Text style={styles.title}>{task.title}</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  const Items = ({ task }) => (
    <TouchableOpacity onPress={() => navigation.navigate("EditTask", { task })}>
      <View style={styles.item}>
        <View style={styles.marginLeft}>
          <View style={[styles.menu, { backgroundColor: "yellow" }]}></View>
          <View style={[styles.menu, { backgroundColor: "yellow" }]}></View>
          <View style={[styles.menu, { backgroundColor: "yellow" }]}></View>
        </View>

        <Text style={styles.text}>{task.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Button title="Logout" color="red" onPress={logout} />
          <Button
            title="Add New Task"
            color="green"
            onPress={() => navigation.navigate("AddTask")}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome: {userInfo.email}</Text>
          </View>
          <Spinner visible={isLoading} />
          <FlatList
            data={tasks}
            renderItem={({ item }) => <Items task={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    alignItems: "center",
  },
  marginLeft: {
    marginLeft: 5,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: "#111",
    margin: 2,
    borderRadius: 3,
  },
  text: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   welcome: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });
export default HomeScreen;
