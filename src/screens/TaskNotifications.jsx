import * as Notifications from "expo-notifications";

export function getProfileById(user, profileId) {
 // Safety checks
 if (!user || !Array.isArray(user.profiles)) {
   return null;
 }

 // Find the matching profile
 const profile = user.profiles.find((p) => p.id === profileId);
 return profile || null;
}

// This function is called after the parent creates a new task for the child
export async function handleTaskAssignedLocally(newTask, user) {
    const assignedProfile = getProfileById(user, newTask.assignedTo);
    const childName = assignedProfile ? assignedProfile.name : "child";

  try {
    // 1. Create the newTask in your Redux / Firestore
    // 2. Then schedule a local notification so the "child profile" sees it
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Task Assigned!",
        body: `Hey ${childName}, you have a new task: ${newTask.title}`,
        sound: "default",
      },
      trigger: null, // send immediately
    });

    console.log("✅ Local notification scheduled for child!");
  } catch (error) {
    console.error("❌ Error scheduling local notification:", error);
  }
}

export async function handleOneHourBeforeDeadlineLocally(newTask) {
  try {
    // 1. Calculate the future time for the notification
    const endTime = new Date(newTask.endTime);  
    const oneHourBefore = new Date(endTime.getTime() - 60 * 60 * 1000);

    // 2. Only schedule if it's still in the future
    const now = new Date();
    if (oneHourBefore > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "1 Hour Left!",
          body: `Only 1 hour remains to complete ${newTask.title}`,
          sound: "default",
        },
        trigger: {
          date: oneHourBefore,
        },
      });
      console.log("✅ Scheduled 1-hour-left reminder");
    } else {
      console.log("❌ The end time is less than 1 hour from now—skipping");
    }
  } catch (error) {
    console.error("❌ Error scheduling 1-hour-left reminder:", error);
  }
}
