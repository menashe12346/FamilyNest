
export const CreateNewProfile = ({id,role,gender,name,birth_day,avatarURI})=>{
    return {
        id:id,
        role:role,
        name:name,
        birth_day:birth_day,
        avatarURI:avatarURI,
        gender:gender
    }
}