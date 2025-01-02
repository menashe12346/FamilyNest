export const CreateNewProfile = ({id,role,gender,name,birth_day,avatarURI,passkey,imageID})=>{

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
        imageID:imageID,
        avatarURI:avatarURI,
        gender:gender,
        passkey:passkey
    }
}

export const getNewProfileID = ({profiles})=>{
  console.log('profiles ID',profiles)
  let maxID = -1
  for (const profile of profiles){
      maxID=Math.max(profile.id , maxID)
  }
  return maxID+1
}