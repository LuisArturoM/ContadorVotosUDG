import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: "10%",
      paddingBottom: "10%",
    /*borderColor: "red",
      borderWidth: 5,*/
    },
    container2:{
      flex: 1,
      backgroundColor: '#d6eaf8',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: "10%",
      paddingBottom: "10%",
      paddingLeft:"2%",
      paddingRight:"2%",
      width: "80%",
      borderRadius:50,
      borderColor: "#5fa5e8",
      borderWidth: 1,
      
    },
    title: {
      fontSize: 60,
      fontWeight: 'bold',
      paddingTop: "5%",
      paddingBottom: "5%",
      color:'#004080'
    },
    subtitle:{
      fontSize: 30,
      paddingTop: "10%",
      paddingBottom: "10%",
      color:'#0F76D9',
    },
    touchableButton:{
      backgroundColor: '#3498db',
      borderRadius: 25,
      paddingVertical: 15,
      paddingHorizontal: 30,
      paddingBottom:1,
      paddingTop:1,
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      width:'100%',
      height:'15%',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonText:{
      fontWeight:'bold',
      fontSize:20,color:'white',
      paddingTop: "5%",
      paddingBottom: "5%",
    },
    circle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#3498db', 
      justifyContent: 'center',
      alignItems: 'center',
    },
  });