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

export const getProfileById = (user,id) => {
  return user.profiles.find(profile => profile.id === id);
};

export const getProfileAge = (birth_day) => {
  const today = new Date();
  const birthDate = new Date(birth_day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


export const isMomDadSonDaughter =({profile})=>{
  if(!profile) return 'Profile not found'
  console.log('Profile:',profile.role ,profile.gender)
  switch(profile.role){
    case 'parent':
      return profile.gender === 'male'? 'Father':'Mother'
    case 'child':
      return profile.gender === 'male'? 'Son':'Daughter'
    default:
      return 'Profile not found'
  }
}