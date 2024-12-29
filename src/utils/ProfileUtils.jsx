export const CreateNewProfile = ({id,role,gender,name,birth_day,avatarURI,passkey})=>{

    let formattedBirthDay = null;
  if (birth_day && birth_day.toDate) {
    // If it's a Firestore Timestamp, convert it to a Date string
    formattedBirthDay = birth_day.toDate().toISOString().split('T')[0];
  } else if (birth_day instanceof Date) {
    // If it's already a JavaScript Date object, convert it to a string
    formattedBirthDay = birth_day.toISOString().split('T')[0];
  }
    return {
        id:id,
        role:role,
        name:name,
        birth_day: formattedBirthDay,
        avatarURI:avatarURI,
        gender:gender,
        passkey:passkey
    }
}