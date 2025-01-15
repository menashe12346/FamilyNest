import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addReduxTask } from "../Redux/userSlice";
import { uploadUserData } from "../utils/UploadData";
import {
  getProfileById,
} from "../utils/ProfileUtils";
import ProfileBar from "../components/ProfileBar";
import CreateTask from "../components/CreateTask";
import Task from "../components/Task";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const selectedUser = useSelector(
    (state) => state.selectedProfile.selectedProfileId
  );
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const profile = getProfileById(user, selectedUser);
  const parental = profile ? profile.role === "parent" : true;
  const [task, setNewTask] = useState();

  const tasks = useSelector((state) => state.user.user.tasks || []);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [filterType, setFilterType] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterChild, setFilterChild] = useState(null);

  const taskTypes = [...new Set(tasks.map((task) => task.type || "Uncategorized"))];
  const taskStatusOptions = ["Open", "Overdue"];
  const childrenNames = [...new Set(tasks.map((task) => task.assignedTo || "Unknown"))];
=======
  const [loading, setLoading] = useState(false); // To track if the upload is in progress
  const profile = getProfileById(user, selectedUser); // Always up-to-date
  const parental = profile ? profile.role === "parent" : true; // Always up-to-date
  const [task, setNewTask] = useState();

  const tasks = useSelector((state) => state.user.user.tasks || []);

  const [sortedTasks, setSortedTasks] = useState([]);

  console.log("task", task);
  console.log("tasks Available", tasks);
>>>>>>> a9679cc648e11e4d21a0227da8455280761c2130

  useEffect(() => {
    const uploadTask = async () => {
      if (task && !loading) {
        try {
<<<<<<< HEAD
          setLoading(true);
          await dispatch(addReduxTask(task));
          await uploadUserData(user.uid, { ...user, tasks: [...tasks, task] });
        } catch (error) {
          console.error("Error uploading task:", error);
        } finally {
          setLoading(false);
          setNewTask(null);
=======
          console.log("task to upload", task);
          setLoading(true); // Set loading to true while uploading
          await dispatch(addReduxTask(task)); // Dispatch task to Redux

          // After dispatching, no need to manually update `user.tasks` or call setTasks
          await uploadUserData(user.uid, { ...user, tasks: [...tasks, task] });
          console.log("Task uploaded successfully!");
        } catch (error) {
          console.error("Error uploading task:", error);
        } finally {
          setLoading(false); // Reset loading once the task is uploaded
          setNewTask(null); // Reset the task after the upload
>>>>>>> a9679cc648e11e4d21a0227da8455280761c2130
        }
      }
    };

<<<<<<< HEAD
=======

>>>>>>> a9679cc648e11e4d21a0227da8455280761c2130
    const sorted = [...tasks].sort((a, b) => {
      const now = new Date();
      const endTimeA = new Date(a.endTime);
      const endTimeB = new Date(b.endTime);
<<<<<<< HEAD

      if (endTimeA > now && endTimeB > now) return endTimeA - endTimeB;
      if (endTimeA > now) return -1;
      if (endTimeB > now) return 1;
      return endTimeA - endTimeB;
    });

    setSortedTasks(sorted);
    uploadTask();
  }, [task, dispatch, tasks, loading, user.uid]);

  useEffect(() => {
    let filtered = sortedTasks;

    if (filterType) {
      filtered = filtered.filter((task) => task.type === filterType);
    }

    if (filterStatus) {
      const now = new Date();
      if (filterStatus === "Open") {
        filtered = filtered.filter((task) => new Date(task.endTime) > now);
      } else if (filterStatus === "Overdue") {
        filtered = filtered.filter((task) => new Date(task.endTime) <= now);
      }
    }

    if (filterChild) {
      filtered = filtered.filter((task) => task.assignedTo === filterChild);
    }

    setFilteredTasks(filtered);
  }, [filterType, filterStatus, filterChild, sortedTasks]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => openTaskScreen({ taskID: item.id })}
        style={{ padding: 5 }}
      >
        <Task task={{ item }} />
      </TouchableOpacity>
    );
  };

  const openTaskScreen = ({ taskID }) => {
    navigation.navigate("TaskScreen", { taskID: taskID });
  };
=======

      if (endTimeA > now && endTimeB > now) return endTimeA - endTimeB; // Both tasks are in the future
      if (endTimeA > now) return -1; // Only 'a' is in the future
      if (endTimeB > now) return 1; // Only 'b' is in the future
      return endTimeA - endTimeB; // Both tasks are in the past
    });

    // Set the sorted tasks
    setSortedTasks(sorted);

    uploadTask();
  }, [task, dispatch, tasks, loading, user.uid]); // Monitor relevant dependencies

  const renderItem = ({ item }) => {
    console.log("task rendering", item);
    return (
      <TouchableOpacity
        onPress={() => openTaskScreen({ taskID: item.id })}
        style={{ padding: 5 }}
      >
        <Task task={{ item }} />
      </TouchableOpacity>
    );
  };

  const openTaskScreen = ({ taskID }) => {
    navigation.navigate("TaskScreen", { taskID: taskID });
  };

  console.log("use111r", tasks);
>>>>>>> a9679cc648e11e4d21a0227da8455280761c2130

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/backgrounds/pattern_2.png")}
      resizeMode="cover"
    >
      <View style={{ marginTop: "5%", width: "90%", height: "10%" }}>
        <ProfileBar profile={profile} />
      </View>
      {showModal && parental && (
        <CreateTask
          showModal={showModal}
          setShowModal={setShowModal}
          user={{ user }}
          profile={{ profile }}
          task={task}
          setNewTask={setNewTask}
        />
      )}
      {parental && (
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{ padding: 10 }}
        >
          <LinearGradient
            style={styles.createTaskButton}
            colors={["#76E2F4", "#615DEC", "#301781"]}
          >
            <Text
              style={{
                fontFamily: "Fredoka-Bold",
<<<<<<< HEAD
                fontSize: 20,
=======
                fontSize: calculateFontSize(20),
>>>>>>> a9679cc648e11e4d21a0227da8455280761c2130
                padding: 10,
                textAlign: "center",
              }}
            >
              Create new task
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
<<<<<<< HEAD

      {profile && (
        <View style={styles.filterBarContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filterType === null && styles.filterButtonActive]}
            onPress={() => setFilterType(null)}
          >
            <Text style={styles.filterButtonText}>All Types</Text>
          </TouchableOpacity>
          {taskTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.filterButton, filterType === type && styles.filterButtonActive]}
              onPress={() => setFilterType(type)}
            >
              <Text style={styles.filterButtonText}>{type}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.filterButton, filterStatus === null && styles.filterButtonActive]}
            onPress={() => setFilterStatus(null)}
          >
            <Text style={styles.filterButtonText}>All Status</Text>
          </TouchableOpacity>
          {taskStatusOptions.map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.filterButton, filterStatus === status && styles.filterButtonActive]}
              onPress={() => setFilterStatus(status)}
            >
              <Text style={styles.filterButtonText}>{status}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.filterButton, filterChild === null && styles.filterButtonActive]}
            onPress={() => setFilterChild(null)}
          >
            <Text style={styles.filterButtonText}>All Profiles</Text>
          </TouchableOpacity>
          {childrenNames.map((child) => (
            <TouchableOpacity
              key={child}
              style={[styles.filterButton, filterChild === child && styles.filterButtonActive]}
              onPress={() => setFilterChild(child)}
            >
              <Text style={styles.filterButtonText}>{child}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.tasksContainer}>
        <FlatList
          numColumns={2}
          data={filteredTasks.length > 0 ? filteredTasks : sortedTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
=======
      <View style={styles.tasksContainer}>
        <FlatList
          numColumns={2}
          data={sortedTasks} // List of profiles
          keyExtractor={(item) => item.id.toString()} // Ensure the id is converted to string
          renderItem={renderItem} // Render each item using ProfileBar
>>>>>>> a9679cc648e11e4d21a0227da8455280761c2130
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4F1F4",
    alignItems: "center",
    padding: "2",
<<<<<<< HEAD
=======
  },
  headerText: {
    fontSize: calculateFontSize(48),
    fontWeight: "bold",
    color: "#542F2F",
    marginBottom: "10%",
>>>>>>> a9679cc648e11e4d21a0227da8455280761c2130
  },
  filterBarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  filterButtonActive: {
    backgroundColor: "#615DEC",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#fff",
  },
  tasksContainer: {
    height: "80%",
    width: "90%",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  createTaskButton: {
    borderRadius: 10,
    width: "90%",
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
  },
  separator: {
<<<<<<< HEAD
    height: "2%",
    width: "90%",
=======
    height: "2%", // Adjust height for horizontal line
    width: "90%", // Adjust width as needed
>>>>>>> a9679cc648e11e4d21a0227da8455280761c2130
    backgroundColor: "#aaa",
    alignSelf: "center",
  },
});

export default Home;
