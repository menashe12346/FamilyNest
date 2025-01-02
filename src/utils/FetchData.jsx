import { firebase } from '../../firebase';
import { setUser , setReduxProfiles } from '../Redux/userSlice';

export const fetchUserData = async (uid, dispatch) => {
    try {
      const db = firebase.firestore();
      const usersRef = db.collection('users');
      const userDoc = await usersRef.doc(uid).get();
  
      if (userDoc.exists) {
        const userData = userDoc.data();
        dispatch(setUser(userData));  // Correct action here
        dispatch(setReduxProfiles(userData.profiles));  // Correct action here
        console.log('User data fetched:', userData);
        console.log('profiles', userData.profiles);
        return true;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return false;
    }
  };