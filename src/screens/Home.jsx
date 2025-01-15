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

  useEffect(() => {
    const uploadTask = async () => {
      if (task && !loading) {
        try {
          setLoading(true);
          await dispatch(addReduxTask(task));
          await uploadUserData(user.uid, { ...user, tasks: [...tasks, task] });
        } catch (error) {
          console.error("Error uploading task:", error);
        } finally {
          setLoading(false);
          setNewTask(null);
        }
      }
    };

    const sorted = [...tasks].sort((a, b) => {
      const now = new Date();
      const endTimeA = new Date(a.endTime);
      const endTimeB = new Date(b.endTime);

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
                fontSize: 20,
                padding: 10,
                textAlign: "center",
              }}
            >
              Create new task
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

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
    height: "2%",
    width: "90%",
    backgroundColor: "#aaa",
    alignSelf: "center",
  },
});

export default Home;
