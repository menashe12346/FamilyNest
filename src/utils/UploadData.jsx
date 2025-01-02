import { firebase } from '../../firebase';

export const uploadUserData = async (uid, userData) => {
  try {
    const db = firebase.firestore();
    const usersRef = db.collection('users');
    
    // Reference to the user's document
    const userDocRef = usersRef.doc(uid);

    // Upload or update the user data
    await userDocRef.set(userData, { merge: true }); // 'merge: true' ensures it doesn't overwrite the document but updates the fields
    console.log('User data uploaded successfully:', userData);
    return true;
  } catch (error) {
    console.error('Error uploading user data:', error);
    return false;
  }
};