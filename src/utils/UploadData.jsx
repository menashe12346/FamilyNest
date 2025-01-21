import { firebase } from "../../firebase";

export const uploadUserData = async (uid, userData) => {
  try {
    const db = firebase.firestore();
    const usersRef = db.collection("users");

    // Reference to the user's document
    const userDocRef = usersRef.doc(uid);

    // Upload or update the user data
    await userDocRef.set(userData, { merge: true }); // 'merge: true' ensures it doesn't overwrite the document but updates the fields
    console.log("User data uploaded successfully:", userData);
    return true;
  } catch (error) {
    console.error("Error uploading user data:", error);
    return false;
  }
};

export const updateProfileAndRewards = async (uid, profile, reward) => {
  try {
    const userDocRef = firebase.firestore().collection("users").doc(uid);
    const doc = await userDocRef.get();

    if (doc.exists) {
      const data = doc.data();
      const profiles = data.profiles;
      const rewards = data.rewards;

      const rewardIndex = rewards.findIndex(
        (r) => r.reward_id === reward.reward_id
      );
      const profileIndex = profiles.findIndex((p) => p.id === profile.id);

      if (rewardIndex !== -1 && profileIndex !== -1) {
        profiles[profileIndex] = { ...profiles[profileIndex], ...profile };
        rewards[rewardIndex] = { ...rewards[rewardIndex], ...reward };

        console.log("Profiles before update:", profiles);
console.log("Rewards before update:", rewards);




        await userDocRef.update({ rewards: rewards, profiles: profiles });
        console.log("Updated Profile and Reward Successfully.");

        return { profiles, rewards }; // Return updated data for local state management
      } else {
        console.error("Profile or Reward not found.");
      }
    } else {
      console.error("User document not found.");
    }
  } catch (error) {
    console.error("Error updating profile and rewards:", error);
    throw error;
  }
};
