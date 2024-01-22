import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TaskContext} from '../context/TaskContext';

const HomeScreen = () => {
  const navigation = useNavigation();

  const {userInfo, logout} = useContext(AuthContext);
  const {isLoading, errorMessage, tasks, getTasks} = useContext(TaskContext);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
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
  useEffect(() => {
    getTasks();
  }, []);

  const Items = ({task}) => (
    <TouchableOpacity onPress={() => navigation.navigate('EditTask', {task})}>
      <View style={styles.item}>
        <View style={styles.marginLeft}>
          <View style={[styles.menu, {backgroundColor: 'yellow'}]}></View>
          <View style={[styles.menu, {backgroundColor: 'yellow'}]}></View>
          <View style={[styles.menu, {backgroundColor: 'yellow'}]}></View>
        </View>

        <Text style={styles.text}>{task.title}</Text>
      </View>
    </TouchableOpacity>
  );

  function Section({task}) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View
        style={
          task.status == '1'
            ? [styles.sectionContainer, {backgroundColor: 'green'}]
            : [styles.sectionContainer, {backgroundColor: 'yellow'}]
        }>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditTask', {task})}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}>
            {task.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Button title="Logout" color="red" onPress={logout} />
          <Button
            title="Add New Task"
            color="blue"
            onPress={() => navigation.navigate('AddTask')}
          />
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome: {userInfo.email}</Text>
          </View>
          <Spinner visible={isLoading} />
          {tasks &&
            tasks.map(item => {
              return <Section key={item._id} task={item} />;
              //
            })}

          {/* <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     backgroundColor: 'orange',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   contentContainer: {
//     backgroundColor: 'white',
//   },
//   item: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: 'grey',
//     alignItems: 'center',
//   },
//   marginLeft: {
//     marginLeft: 5,
//   },
//   menu: {
//     width: 20,
//     height: 2,
//     backgroundColor: '#111',
//     margin: 2,
//     borderRadius: 3,
//   },
//   text: {
//     marginVertical: 30,
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
// });

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
