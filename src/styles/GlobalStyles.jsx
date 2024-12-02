import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container:{
        backgroundColor: "#E4F1F4",
        flex: 1
    },inputContainer:{
        backgroundColor:"#FFFFFF",
        flexDirection:"row",
        borderRadius:20,
        marginHorizontal:40,
        elevation:10,
        marginVertical:10,
    },buttonStyle:{
        elevation:10,
        height:45,
        width:90,
        borderRadius:70,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:10,
    },
})

export default globalStyles;